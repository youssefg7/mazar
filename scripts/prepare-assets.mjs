import { copyFile, mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "source-assets");
const publicRoot = path.join(root, "public");

const exteriorSourceDir = path.join(sourceRoot, "exterior renders");
const interiorSourceDir = path.join(sourceRoot, "interior renders");
const panoramaSourceDir = path.join(sourceRoot, "panoramic");

const exteriorImages = [
  ["1_1 - Sunny day.png", "ext-01-waterfront-arrival.webp"],
  ["1_2 - Cloudy day.png", "ext-02-cloudy-roofline.webp"],
  ["1_3 - Morning on Vacation.png", "ext-03-morning-promenade.webp"],
  ["1_4 - Sunset.png", "ext-04-sunset-plaza.webp"],
  ["1_5 - Photo.png", "ext-05-planetarium-massing.webp"],
  ["1_6 - Photo.png", "ext-06-water-channel.webp"],
  ["1_7 - Photo.png", "ext-07-golden-canopy.webp"],
  ["1_8 - Photo.png", "ext-08-evening-arrival.webp"],
  ["1_9 - Photo.png", "ext-09-public-garden.webp"],
  ["1_10 - Photo.png", "ext-10-coastal-perspective.webp"]
];

async function ensureOutputDirs() {
  await Promise.all([
    mkdir(path.join(publicRoot, "images/brand"), { recursive: true }),
    mkdir(path.join(publicRoot, "images/hero"), { recursive: true }),
    mkdir(path.join(publicRoot, "images/exterior/thumbnails"), { recursive: true }),
    mkdir(path.join(publicRoot, "images/interior/thumbnails"), { recursive: true }),
    mkdir(path.join(publicRoot, "images/panorama"), { recursive: true }),
    mkdir(path.join(publicRoot, "panos"), { recursive: true }),
    mkdir(path.join(publicRoot, "downloads"), { recursive: true }),
    mkdir(path.join(publicRoot, "vendor/pannellum"), { recursive: true })
  ]);
}

async function toWebp(input, output, width, quality = 82) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(output);
}

async function toJpeg(input, output, width, quality = 84) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(output);
}

async function extractLogoArtwork(input, output, options = {}) {
  const {
    color = { r: 215, g: 164, b: 95 },
    width = 640,
    paddingRatio = 0.08,
    format = "webp",
    minComponentArea = 90
  } = options;
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const keepMask = new Uint8Array(info.width * info.height);
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;
  const outputPixels = Buffer.alloc(data.length);

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      const redDominance = r - Math.max(g, b);
      const isLogoStroke = a > 0 && r > 28 && g < 64 && b < 64 && redDominance > 24;

      if (isLogoStroke) {
        keepMask[y * info.width + x] = Math.min(255, Math.max(150, redDominance * 6));
      }
    }
  }

  const visited = new Uint8Array(keepMask.length);
  const component = [];
  const stack = [];

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const startIndex = y * info.width + x;
      if (!keepMask[startIndex] || visited[startIndex]) {
        continue;
      }

      let componentMinX = x;
      let componentMinY = y;
      let componentMaxX = x;
      let componentMaxY = y;
      component.length = 0;
      stack.length = 0;
      stack.push(startIndex);
      visited[startIndex] = 1;

      while (stack.length > 0) {
        const pixelIndex = stack.pop();
        component.push(pixelIndex);
        const px = pixelIndex % info.width;
        const py = Math.floor(pixelIndex / info.width);
        componentMinX = Math.min(componentMinX, px);
        componentMinY = Math.min(componentMinY, py);
        componentMaxX = Math.max(componentMaxX, px);
        componentMaxY = Math.max(componentMaxY, py);

        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            if (ox === 0 && oy === 0) {
              continue;
            }
            const nx = px + ox;
            const ny = py + oy;
            if (nx < 0 || ny < 0 || nx >= info.width || ny >= info.height) {
              continue;
            }
            const neighborIndex = ny * info.width + nx;
            if (keepMask[neighborIndex] && !visited[neighborIndex]) {
              visited[neighborIndex] = 1;
              stack.push(neighborIndex);
            }
          }
        }
      }

      const componentWidth = componentMaxX - componentMinX + 1;
      const componentHeight = componentMaxY - componentMinY + 1;
      const skinnyVerticalNoise = componentWidth <= 4 && componentHeight >= 12;

      if (component.length < minComponentArea || skinnyVerticalNoise) {
        continue;
      }

      for (const pixelIndex of component) {
        const i = pixelIndex * 4;
        const px = pixelIndex % info.width;
        const py = Math.floor(pixelIndex / info.width);
        outputPixels[i] = color.r;
        outputPixels[i + 1] = color.g;
        outputPixels[i + 2] = color.b;
        outputPixels[i + 3] = keepMask[pixelIndex];
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    throw new Error(`Unable to extract logo artwork from ${input}`);
  }

  const artworkWidth = maxX - minX + 1;
  const artworkHeight = maxY - minY + 1;
  const padding = Math.round(Math.max(artworkWidth, artworkHeight) * paddingRatio);
  const left = Math.max(0, minX - padding);
  const top = Math.max(0, minY - padding);
  const extractWidth = Math.min(info.width - left, artworkWidth + padding * 2);
  const extractHeight = Math.min(info.height - top, artworkHeight + padding * 2);
  let pipeline = sharp(outputPixels, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .extract({ left, top, width: extractWidth, height: extractHeight })
    .resize({ width, withoutEnlargement: true });

  pipeline =
    format === "png" ? pipeline.png({ compressionLevel: 9 }) : pipeline.webp({ quality: 88, effort: 4 });

  await pipeline.toFile(output);
}

async function prepareHero() {
  const input = path.join(exteriorSourceDir, "first.png");
  await Promise.all([
    toWebp(input, path.join(publicRoot, "images/hero/hero-desktop.webp"), 2400, 84),
    toWebp(input, path.join(publicRoot, "images/hero/hero-mobile.webp"), 1200, 82),
    sharp(input)
      .resize({ width: 1200, height: 630, fit: "cover", position: "center" })
      .webp({ quality: 82, effort: 4 })
      .toFile(path.join(publicRoot, "images/hero/og-image.webp"))
  ]);
}

async function prepareBrand() {
  const wordmarkInput = path.join(publicRoot, "mazar logo.png");
  const emblemInput = path.join(publicRoot, "mazar logo 2.png");
  const cleanEmblem = path.join(publicRoot, "images/brand/mazar-emblem.png");

  await Promise.all([
    extractLogoArtwork(wordmarkInput, path.join(publicRoot, "images/brand/mazar-wordmark.webp"), {
      color: { r: 122, g: 31, b: 31 },
      width: 820
    }),
    extractLogoArtwork(emblemInput, path.join(publicRoot, "images/brand/mazar-emblem.webp"), {
      width: 520
    }),
    extractLogoArtwork(emblemInput, cleanEmblem, {
      width: 512,
      format: "png"
    })
  ]);

  await Promise.all([
    sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 11, g: 13, b: 14, alpha: 1 }
      }
    })
      .composite([{ input: cleanEmblem, gravity: "center" }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicRoot, "images/brand/mazar-favicon.png")),
    sharp({
      create: {
        width: 180,
        height: 180,
        channels: 4,
        background: { r: 11, g: 13, b: 14, alpha: 1 }
      }
    })
      .composite([
        {
          input: await sharp(cleanEmblem).resize({ width: 132, height: 132, fit: "contain" }).png().toBuffer(),
          gravity: "center"
        }
      ])
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicRoot, "images/brand/mazar-touch-icon.png"))
  ]);
  await unlink(cleanEmblem);
}

async function prepareExterior() {
  await Promise.all(
    exteriorImages.flatMap(([sourceName, outputName]) => {
      const input = path.join(exteriorSourceDir, sourceName);
      const output = path.join(publicRoot, "images/exterior", outputName);
      const thumb = path.join(publicRoot, "images/exterior/thumbnails", outputName);
      return [toWebp(input, output, 2400, 82), toWebp(input, thumb, 460, 72)];
    })
  );
}

async function prepareInteriorAndPanorama() {
  const interiorInput = path.join(interiorSourceDir, "ChatGPT Image Jun 18, 2026, 09_17_42 PM.png");
  const panoramaInput = path.join(panoramaSourceDir, "ChatGPT Image Jun 18, 2026, 09_17_42 PM.png");

  await Promise.all([
    toWebp(interiorInput, path.join(publicRoot, "images/interior/int-01-main-hall.webp"), 1800, 84),
    toWebp(interiorInput, path.join(publicRoot, "images/interior/thumbnails/int-01-main-hall.webp"), 460, 74),
    toWebp(panoramaInput, path.join(publicRoot, "images/panorama/panorama-map.webp"), 1800, 82),
    toJpeg(panoramaInput, path.join(publicRoot, "panos/pano-main-hall.jpg"), 2048, 84)
  ]);
}

async function preparePannellumVendor() {
  await Promise.all([
    copyFile(
      path.join(root, "node_modules/pannellum/build/pannellum.js"),
      path.join(publicRoot, "vendor/pannellum/pannellum.js")
    ),
    copyFile(
      path.join(root, "node_modules/pannellum/build/pannellum.css"),
      path.join(publicRoot, "vendor/pannellum/pannellum.css")
    )
  ]);
}

await ensureOutputDirs();
await prepareBrand();
await prepareHero();
await prepareExterior();
await prepareInteriorAndPanorama();
await preparePannellumVendor();

console.log("Prepared optimized web assets in public/.");

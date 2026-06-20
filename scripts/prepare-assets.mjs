import { copyFile, mkdir } from "node:fs/promises";
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
await prepareHero();
await prepareExterior();
await prepareInteriorAndPanorama();
await preparePannellumVendor();

console.log("Prepared optimized web assets in public/.");

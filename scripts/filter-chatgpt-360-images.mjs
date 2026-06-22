import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_RATIO = 2;
const DEFAULT_TOLERANCE = 0.025;

function usage() {
  console.log(`Usage:
  node scripts/filter-chatgpt-360-images.mjs <chatgpt-images.html> [--out output/chatgpt-360]
  node scripts/filter-chatgpt-360-images.mjs <chatgpt-images.html> --ratio 2 --tolerance 0.025

Filters a saved ChatGPT Images page for likely equirectangular / 360 images.
The default keeps cards with width / height within 0.025 of 2:1.`);
}

function argValue(args, name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function redactSignedUrl(url) {
  return url.replace(/([?&]sig=)[^&]+/g, "$1<redacted>");
}

function slugify(value, index) {
  const slug = value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, "-")
    .slice(0, 80);
  return `${String(index).padStart(3, "0")}-${slug || "chatgpt-image"}`;
}

function extractImageCards(html) {
  const cards = [];
  const cardPattern =
    /aria-label="Open image: ([^"]*)"[\s\S]*?<img[^>]*alt="([^"]*)"[^>]*width="(\d+)"[^>]*height="(\d+)"[^>]*src="([^"]+)"/g;

  let match;
  while ((match = cardPattern.exec(html))) {
    const index = cards.length + 1;
    const label = decodeHtml(match[1]);
    const alt = decodeHtml(match[2]);
    const width = Number(match[3]);
    const height = Number(match[4]);
    const thumbnailUrl = decodeHtml(match[5]);

    cards.push({
      index,
      label,
      alt,
      width,
      height,
      ratio: Number((width / height).toFixed(6)),
      fileId: thumbnailUrl.match(/file_[^%&#]+/)?.[0] ?? null,
      thumbnailUrl,
      redactedThumbnailUrl: redactSignedUrl(thumbnailUrl),
      suggestedName: slugify(label || alt, index),
    });
  }

  return cards;
}

function toMarkdown(candidates, source, ratio, tolerance) {
  const lines = [
    "# ChatGPT 360 Image Candidates",
    "",
    `Source: \`${source}\``,
    `Filter: width / height within ${tolerance} of ${ratio}:1`,
    `Candidates: ${candidates.length}`,
    "",
    "| # | Size | Ratio | Label | File ID |",
    "|---:|---:|---:|---|---|",
  ];

  for (const item of candidates) {
    lines.push(
      `| ${item.index} | ${item.width}x${item.height} | ${item.ratio.toFixed(4)} | ${item.label.replaceAll("|", "\\|")} | ${item.fileId ?? ""} |`,
    );
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    usage();
    return;
  }

  const source = args[0];
  const outDir = argValue(args, "--out", "output/chatgpt-360");
  const ratio = Number(argValue(args, "--ratio", String(DEFAULT_RATIO)));
  const tolerance = Number(argValue(args, "--tolerance", String(DEFAULT_TOLERANCE)));

  if (!Number.isFinite(ratio) || !Number.isFinite(tolerance)) {
    throw new Error("--ratio and --tolerance must be numbers");
  }

  const html = await readFile(source, "utf8");
  const cards = extractImageCards(html);
  const candidates = cards.filter((card) => Math.abs(card.ratio - ratio) <= tolerance);

  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "all-images.json"), `${JSON.stringify(cards, null, 2)}\n`);
  await writeFile(path.join(outDir, "candidates.json"), `${JSON.stringify(candidates, null, 2)}\n`);
  await writeFile(path.join(outDir, "candidates.md"), toMarkdown(candidates, source, ratio, tolerance));

  console.log(`Scanned ${cards.length} ChatGPT image cards`);
  console.log(`Found ${candidates.length} likely 360 / equirectangular candidates`);
  console.log(`Wrote ${path.join(outDir, "candidates.md")}`);
  console.log(`Wrote ${path.join(outDir, "candidates.json")}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

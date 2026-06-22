import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/styles/global.css"), "utf8");

function getRuleBody(selector: string): string {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escapedSelector}\\s*{(?<body>[^}]+)}`));

  if (!match?.groups?.body) {
    throw new Error(`Missing CSS rule for ${selector}`);
  }

  return match.groups.body;
}

function getPxProperty(body: string, property: string): number {
  const match = body.match(new RegExp(`${property}:\\s*(\\d+)px;`));

  if (!match) {
    throw new Error(`Missing ${property} pixel value`);
  }

  return Number(match[1]);
}

describe("section spacing", () => {
  it("keeps navbar anchor landings close to each section title", () => {
    const sectionBody = getRuleBody(".section");
    const padding = sectionBody.match(/padding:\s*clamp\((\d+)px,\s*[\d.]+vw,\s*(\d+)px\)\s+0;/);

    expect(padding).not.toBeNull();
    expect(Number(padding?.[1])).toBeLessThanOrEqual(48);
    expect(Number(padding?.[2])).toBeLessThanOrEqual(72);
    expect(getPxProperty(sectionBody, "scroll-margin-top")).toBeLessThanOrEqual(76);
  });
});

describe("panorama map", () => {
  it("does not crop the final coordinate map", () => {
    const mapImageBody = getRuleBody(".panorama-map > img");

    expect(mapImageBody).toContain("display: block;");
    expect(mapImageBody).not.toContain("aspect-ratio");
    expect(mapImageBody).not.toContain("object-fit: cover");
  });
});

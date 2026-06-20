import { describe, expect, it } from "vitest";
import { resolvePublicPath } from "./assets";

describe("resolvePublicPath", () => {
  it("prefixes public paths with the Vite base path", () => {
    expect(resolvePublicPath("images/exterior/ext-01.webp", "/mazar/")).toBe(
      "/mazar/images/exterior/ext-01.webp"
    );
  });

  it("keeps external and protocol links unchanged", () => {
    expect(resolvePublicPath("https://example.com/banner.pdf", "/mazar/")).toBe(
      "https://example.com/banner.pdf"
    );
    expect(resolvePublicPath("mailto:larasameeh249@gmail.com", "/mazar/")).toBe(
      "mailto:larasameeh249@gmail.com"
    );
  });

  it("normalizes repeated slashes without removing the base trailing slash", () => {
    expect(resolvePublicPath("/downloads/cv.pdf", "/mazar/")).toBe("/mazar/downloads/cv.pdf");
  });
});

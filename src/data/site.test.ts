import { describe, expect, it } from "vitest";
import { panoramaHotspots, panoramaMapImage } from "./site";

describe("panorama content", () => {
  it("uses the final 360 map and six processed panorama scenes", () => {
    expect(panoramaMapImage).toMatch(/\/images\/360\/base\.webp$/);
    expect(
      panoramaHotspots.map(({ id, x, y, panorama }) => ({
        id,
        x,
        y,
        panorama
      }))
    ).toEqual([
      {
        id: "underwaters",
        x: 8.5526,
        y: 55.4729,
        panorama: expect.stringMatching(/\/images\/360\/underwaters\.png$/)
      },
      {
        id: "circle",
        x: 17.9426,
        y: 71.7322,
        panorama: expect.stringMatching(/\/images\/360\/circle\.png$/)
      },
      {
        id: "hologram",
        x: 31.6986,
        y: 56.3231,
        panorama: expect.stringMatching(/\/images\/360\/hologram\.png$/)
      },
      {
        id: "statue",
        x: 41.866,
        y: 49.9469,
        panorama: expect.stringMatching(/\/images\/360\/statue\.png$/)
      },
      {
        id: "tree",
        x: 48.445,
        y: 42.508,
        panorama: expect.stringMatching(/\/images\/360\/tree\.png$/)
      },
      {
        id: "movies",
        x: 59.8086,
        y: 47.8215,
        panorama: expect.stringMatching(/\/images\/360\/movies\.png$/)
      }
    ]);
  });
});

import { describe, expect, it } from "vitest";
import { getNextIndex, getPreviousIndex, getSwipeIntent } from "./gallery";

describe("gallery index helpers", () => {
  it("wraps to the first slide after the final slide", () => {
    expect(getNextIndex(2, 3)).toBe(0);
  });

  it("wraps to the final slide before the first slide", () => {
    expect(getPreviousIndex(0, 3)).toBe(2);
  });

  it("ignores tiny swipe movement and detects horizontal direction", () => {
    expect(getSwipeIntent(0, 12)).toBe("none");
    expect(getSwipeIntent(0, 80)).toBe("previous");
    expect(getSwipeIntent(80, 0)).toBe("next");
  });
});

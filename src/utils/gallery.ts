export type SwipeIntent = "next" | "previous" | "none";

const SWIPE_THRESHOLD = 40;

export function getNextIndex(currentIndex: number, itemCount: number): number {
  if (itemCount <= 0) {
    return 0;
  }

  return (currentIndex + 1) % itemCount;
}

export function getPreviousIndex(currentIndex: number, itemCount: number): number {
  if (itemCount <= 0) {
    return 0;
  }

  return (currentIndex - 1 + itemCount) % itemCount;
}

export function getSwipeIntent(startX: number, endX: number): SwipeIntent {
  const delta = endX - startX;

  if (Math.abs(delta) < SWIPE_THRESHOLD) {
    return "none";
  }

  return delta < 0 ? "next" : "previous";
}

(() => {
  const targetRatio = 2;
  const tolerance = 0.025;
  const cards = [...document.querySelectorAll('button[aria-label^="Open image:"]')]
    .map((button, index) => {
      const container = button.closest(".group\\/imagegen-image") || button.parentElement;
      const image = container?.querySelector("img[width][height]");
      const width = Number(image?.getAttribute("width"));
      const height = Number(image?.getAttribute("height"));
      const label = button.getAttribute("aria-label")?.replace(/^Open image:\s*/, "") || image?.alt || "";
      const ratio = width && height ? width / height : 0;
      const isCandidate = Math.abs(ratio - targetRatio) <= tolerance;
      return { index: index + 1, button, container, image, width, height, ratio, label, isCandidate };
    });

  for (const card of cards) {
    if (!card.container) continue;
    card.container.style.outline = "";
    card.container.style.display = card.isCandidate ? "" : "none";

    if (card.isCandidate) {
      card.container.style.outline = "4px solid #22c55e";
      card.container.style.outlineOffset = "-4px";
      card.container.title = `#${card.index} ${card.width}x${card.height} ${card.label}`;
    }
  }

  const candidates = cards.filter((card) => card.isCandidate);
  console.table(
    candidates.map(({ index, width, height, ratio, label }) => ({
      index,
      size: `${width}x${height}`,
      ratio: ratio.toFixed(4),
      label,
    })),
  );
  console.log(`Showing ${candidates.length} likely 360 images out of ${cards.length}. Click a visible card, then use ChatGPT's download button.`);
})();

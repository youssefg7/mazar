import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GallerySection } from "./GallerySection";

const galleryImages = [
  {
    id: "slide-1",
    src: "/images/exterior/ext-01.webp",
    thumb: "/images/exterior/thumbnails/ext-01.webp",
    alt: "Exterior render one",
    caption: "Exterior one"
  },
  {
    id: "slide-2",
    src: "/images/exterior/ext-02.webp",
    thumb: "/images/exterior/thumbnails/ext-02.webp",
    alt: "Exterior render two",
    caption: "Exterior two"
  },
  {
    id: "slide-3",
    src: "/images/exterior/ext-03.webp",
    thumb: "/images/exterior/thumbnails/ext-03.webp",
    alt: "Exterior render three",
    caption: "Exterior three"
  }
];

function renderGallery() {
  render(
    <GallerySection
      id="exterior"
      eyebrow="Exterior Gallery"
      title="Exterior renders"
      description="Waterfront architectural views."
      images={galleryImages}
    />
  );
}

function getTrack() {
  const track = document.querySelector<HTMLElement>(".gallery__track");

  expect(track).not.toBeNull();

  return track as HTMLElement;
}

describe("GallerySection", () => {
  it("renders images in a translated slide track", () => {
    renderGallery();

    expect(screen.getByRole("img", { name: "Exterior render one" })).toBeTruthy();
    expect(screen.getByRole("img", { name: "Exterior render two" })).toBeTruthy();
    expect(screen.getByRole("img", { name: "Exterior render three" })).toBeTruthy();
    expect(getTrack().style.transform).toBe("translate3d(calc(-0% + 0px), 0, 0)");
  });

  it("slides the track when using arrow navigation", () => {
    renderGallery();

    fireEvent.click(screen.getByRole("button", { name: "Next image" }));

    expect(getTrack().style.transform).toBe("translate3d(calc(-100% + 0px), 0, 0)");
    expect(screen.getByText("02 / 03")).toBeTruthy();
  });

  it("keeps overlay arrow presses out of the drag gesture", () => {
    renderGallery();

    const nextButton = screen.getByRole("button", { name: "Next image" });

    fireEvent.pointerDown(nextButton, { clientX: 220 });

    expect(getTrack().classList.contains("gallery__track--dragging")).toBe(false);

    fireEvent.click(nextButton);

    expect(getTrack().style.transform).toBe("translate3d(calc(-100% + 0px), 0, 0)");
  });

  it("moves the track with the pointer before settling after swipe release", () => {
    renderGallery();

    const stage = document.querySelector<HTMLElement>(".gallery__stage");
    expect(stage).not.toBeNull();

    fireEvent.pointerDown(stage as HTMLElement, { clientX: 140 });
    fireEvent.pointerMove(stage as HTMLElement, { clientX: 68 });

    expect(getTrack().classList.contains("gallery__track--dragging")).toBe(true);
    expect(getTrack().style.transform).toBe("translate3d(calc(-0% + -72px), 0, 0)");

    fireEvent.pointerUp(stage as HTMLElement, { clientX: 20 });

    expect(getTrack().classList.contains("gallery__track--dragging")).toBe(false);
    expect(getTrack().style.transform).toBe("translate3d(calc(-100% + 0px), 0, 0)");

    fireEvent.pointerDown(stage as HTMLElement, { clientX: 20 });
    fireEvent.pointerMove(stage as HTMLElement, { clientX: 90 });

    expect(getTrack().style.transform).toBe("translate3d(calc(-100% + 70px), 0, 0)");

    fireEvent.pointerUp(stage as HTMLElement, { clientX: 140 });

    expect(getTrack().style.transform).toBe("translate3d(calc(-0% + 0px), 0, 0)");
  });
});

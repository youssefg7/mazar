import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { GalleryImage } from "../types";
import { getNextIndex, getPreviousIndex, getSwipeIntent } from "../utils/gallery";
import { Lightbox } from "./Lightbox";

type GallerySectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  images: GalleryImage[];
};

function isControlPress(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest("button") !== null;
}

export function GallerySection({ id, eyebrow, title, description, images }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const hasImages = images.length > 0;

  const countLabel = useMemo(() => {
    if (!hasImages) {
      return "00 / 00";
    }

    return `${String(activeIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
  }, [activeIndex, hasImages, images.length]);

  function goNext() {
    setActiveIndex((index) => getNextIndex(index, images.length));
  }

  function goPrevious() {
    setActiveIndex((index) => getPreviousIndex(index, images.length));
  }

  function handlePointerDown(clientX: number) {
    pointerStart.current = clientX;
    setDragOffset(0);
    setIsDragging(true);
  }

  function handlePointerMove(clientX: number) {
    if (pointerStart.current === null) {
      return;
    }

    setDragOffset(clientX - pointerStart.current);
  }

  function handlePointerUp(clientX: number) {
    if (pointerStart.current === null) {
      return;
    }

    const intent = getSwipeIntent(pointerStart.current, clientX);
    pointerStart.current = null;
    setDragOffset(0);
    setIsDragging(false);

    if (intent === "next") {
      goNext();
    }

    if (intent === "previous") {
      goPrevious();
    }
  }

  function handlePointerCancel() {
    pointerStart.current = null;
    setDragOffset(0);
    setIsDragging(false);
  }

  return (
    <section className="section gallery-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="section__header">
        <p className="section__eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>

      {!hasImages ? (
        <div className="empty-state">Gallery images will be added soon.</div>
      ) : (
        <div className="gallery">
          <div
            className="gallery__stage"
            onPointerDown={(event) => {
              if (isControlPress(event.target)) {
                return;
              }

              event.currentTarget.setPointerCapture?.(event.pointerId);
              handlePointerDown(event.clientX);
            }}
            onPointerMove={(event) => {
              handlePointerMove(event.clientX);
            }}
            onPointerUp={(event) => handlePointerUp(event.clientX)}
            onPointerCancel={handlePointerCancel}
          >
            <div
              className={isDragging ? "gallery__track gallery__track--dragging" : "gallery__track"}
              style={{ transform: `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)` }}
            >
              {images.map((image, index) => (
                <div className="gallery__slide" key={image.id}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    draggable="false"
                    loading={id === "exterior" && index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
            <button className="gallery__arrow gallery__arrow--previous" type="button" onClick={goPrevious} aria-label="Previous image">
              <ChevronLeft size={21} aria-hidden="true" />
            </button>
            <button className="gallery__arrow gallery__arrow--next" type="button" onClick={goNext} aria-label="Next image">
              <ChevronRight size={21} aria-hidden="true" />
            </button>
            <button
              className="gallery__fullscreen"
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Open fullscreen image"
            >
              <Maximize2 size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="gallery__meta">
            <span>{countLabel}</span>
          </div>

          <div className="gallery__thumbs" aria-label={`${eyebrow} thumbnails`}>
            {images.map((image, index) => (
              <button
                className={index === activeIndex ? "gallery__thumb gallery__thumb--active" : "gallery__thumb"}
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${image.caption}`}
              >
                <img src={image.thumb} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}

      {lightboxOpen && hasImages ? (
        <Lightbox
          images={images}
          activeIndex={activeIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={goNext}
          onPrevious={goPrevious}
        />
      ) : null}
    </section>
  );
}

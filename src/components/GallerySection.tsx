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

export function GallerySection({ id, eyebrow, title, description, images }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const activeImage = images[activeIndex];
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

  function handlePointerUp(clientX: number) {
    if (pointerStart.current === null) {
      return;
    }

    const intent = getSwipeIntent(pointerStart.current, clientX);
    pointerStart.current = null;

    if (intent === "next") {
      goNext();
    }

    if (intent === "previous") {
      goPrevious();
    }
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
              pointerStart.current = event.clientX;
            }}
            onPointerUp={(event) => handlePointerUp(event.clientX)}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
          >
            <img src={activeImage.src} alt={activeImage.alt} loading={id === "exterior" ? "eager" : "lazy"} />
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

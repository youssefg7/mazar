import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GalleryImage } from "../types";

type LightboxProps = {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function Lightbox({ images, activeIndex, onClose, onNext, onPrevious }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeImage = images[activeIndex];

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-is-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-is-open");
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Fullscreen image viewer">
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close fullscreen image" ref={closeButtonRef}>
        <X size={20} aria-hidden="true" />
      </button>
      <button className="lightbox__arrow lightbox__arrow--previous" type="button" onClick={onPrevious} aria-label="Previous image">
        <ChevronLeft size={26} aria-hidden="true" />
      </button>
      <figure>
        <img src={activeImage.src} alt={activeImage.alt} />
        <figcaption>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
          {activeImage.caption}
        </figcaption>
      </figure>
      <button className="lightbox__arrow lightbox__arrow--next" type="button" onClick={onNext} aria-label="Next image">
        <ChevronRight size={26} aria-hidden="true" />
      </button>
    </div>
  );
}

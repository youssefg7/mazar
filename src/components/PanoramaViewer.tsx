import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PanoramaHotspot } from "../types";
import { publicAsset } from "../utils/assets";

type PannellumViewer = {
  on: (eventName: "load" | "error", callback: (message?: string) => void) => PannellumViewer;
  destroy: () => void;
};

type PannellumApi = {
  viewer: (
    container: HTMLElement,
    config: {
      type: "equirectangular";
      panorama: string;
      title: string;
      autoLoad: boolean;
      showControls: boolean;
      showFullscreenCtrl: boolean;
      compass: boolean;
      hfov: number;
      minHfov: number;
      maxHfov: number;
      yaw?: number;
      pitch?: number;
      backgroundColor: [number, number, number];
    }
  ) => PannellumViewer;
};

declare global {
  interface Window {
    pannellum?: PannellumApi;
  }
}

let pannellumLoadPromise: Promise<PannellumApi> | null = null;

function loadPannellum(): Promise<PannellumApi> {
  if (window.pannellum) {
    return Promise.resolve(window.pannellum);
  }

  if (pannellumLoadPromise) {
    return pannellumLoadPromise;
  }

  pannellumLoadPromise = new Promise((resolve, reject) => {
    const existingStylesheet = document.querySelector<HTMLLinkElement>("link[data-pannellum-styles]");
    if (!existingStylesheet) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = publicAsset("vendor/pannellum/pannellum.css");
      stylesheet.dataset.pannellumStyles = "true";
      document.head.appendChild(stylesheet);
    }

    const existingScript = document.querySelector<HTMLScriptElement>("script[data-pannellum-script]");
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.pannellum) {
          resolve(window.pannellum);
        } else {
          reject(new Error("Pannellum loaded without exposing window.pannellum."));
        }
      });
      existingScript.addEventListener("error", () => reject(new Error("Unable to load panorama viewer.")));
      return;
    }

    const script = document.createElement("script");
    script.src = publicAsset("vendor/pannellum/pannellum.js");
    script.async = true;
    script.dataset.pannellumScript = "true";
    script.addEventListener("load", () => {
      if (window.pannellum) {
        resolve(window.pannellum);
      } else {
        reject(new Error("Pannellum loaded without exposing window.pannellum."));
      }
    });
    script.addEventListener("error", () => reject(new Error("Unable to load panorama viewer.")));
    document.body.appendChild(script);
  });

  return pannellumLoadPromise;
}

type PanoramaViewerProps = {
  hotspot: PanoramaHotspot;
  onClose: () => void;
};

export function PanoramaViewer({ hotspot, onClose }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    let viewer: PannellumViewer | null = null;

    closeButtonRef.current?.focus();
    document.body.classList.add("modal-is-open");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    loadPannellum()
      .then((api) => {
        if (cancelled || !containerRef.current) {
          return;
        }

        viewer = api.viewer(containerRef.current, {
          type: "equirectangular",
          panorama: hotspot.panorama,
          title: hotspot.label,
          autoLoad: true,
          showControls: true,
          showFullscreenCtrl: false,
          compass: false,
          hfov: 105,
          minHfov: 55,
          maxHfov: 120,
          yaw: hotspot.yaw,
          pitch: hotspot.pitch,
          backgroundColor: [11, 13, 14]
        });

        viewer
          .on("load", () => {
            if (!cancelled) {
              setLoading(false);
            }
          })
          .on("error", () => {
            if (!cancelled) {
              setLoading(false);
              setError("Unable to load panorama. Please try again later.");
            }
          });
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
          setError("Unable to load panorama. Please try again later.");
        }
      });

    return () => {
      cancelled = true;
      viewer?.destroy();
      document.body.classList.remove("modal-is-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [hotspot, onClose]);

  return (
    <div className="panorama-viewer" role="dialog" aria-modal="true" aria-labelledby="panorama-viewer-title">
      <div className="panorama-viewer__topbar">
        <div>
          <p>360 Experience</p>
          <h3 id="panorama-viewer-title">{hotspot.label}</h3>
        </div>
        <button className="modal-close modal-close--inline" type="button" onClick={onClose} aria-label="Close panorama" ref={closeButtonRef}>
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="panorama-viewer__canvas" ref={containerRef}>
        {loading ? <div className="viewer-status">Loading panorama...</div> : null}
        {error ? (
          <div className="viewer-status viewer-status--error">
            <p>{error}</p>
            <button className="button button--secondary" type="button" onClick={onClose}>
              Return to map
            </button>
          </div>
        ) : null}
      </div>
      <p className="panorama-viewer__description">{hotspot.description}</p>
    </div>
  );
}

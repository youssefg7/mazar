import { Smartphone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PanoramaHotspot } from "../types";
import { publicAsset } from "../utils/assets";

type PannellumViewer = {
  on: (eventName: "load" | "error", callback: (message?: string) => void) => PannellumViewer;
  destroy: () => void;
};

type PannellumViewerConfig = {
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
  orientationOnByDefault?: boolean;
  draggable?: boolean;
  mouseZoom?: boolean;
  showZoomCtrl?: boolean;
  backgroundColor: [number, number, number];
};

type PannellumApi = {
  viewer: (container: HTMLElement, config: PannellumViewerConfig) => PannellumViewer;
};

declare global {
  interface Window {
    pannellum?: PannellumApi;
  }
}

let pannellumLoadPromise: Promise<PannellumApi> | null = null;
const PANORAMA_BACKGROUND_MUSIC = publicAsset("360-background-music.m4a");
const MOBILE_USER_AGENT_PATTERN = /Android|iPhone|iPad|iPod|Mobile/i;

type DeviceOrientationEventWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<PermissionState>;
};

function waitForPannellumStyles(stylesheet: HTMLLinkElement): Promise<void> {
  if (stylesheet.dataset.pannellumStylesLoaded === "true" || stylesheet.sheet) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    stylesheet.addEventListener(
      "load",
      () => {
        stylesheet.dataset.pannellumStylesLoaded = "true";
        resolve();
      },
      { once: true }
    );
    stylesheet.addEventListener("error", () => reject(new Error("Unable to load panorama styles.")), { once: true });
  });
}

function loadPannellumStyles(): Promise<void> {
  const existingStylesheet = document.querySelector<HTMLLinkElement>("link[data-pannellum-styles]");
  if (existingStylesheet) {
    return waitForPannellumStyles(existingStylesheet);
  }

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = publicAsset("vendor/pannellum/pannellum.css");
  stylesheet.dataset.pannellumStyles = "true";
  document.head.appendChild(stylesheet);

  return waitForPannellumStyles(stylesheet);
}

function waitForPannellumScript(script: HTMLScriptElement): Promise<PannellumApi> {
  if (script.dataset.pannellumScriptLoaded === "true" && window.pannellum) {
    return Promise.resolve(window.pannellum);
  }

  return new Promise((resolve, reject) => {
    script.addEventListener(
      "load",
      () => {
        script.dataset.pannellumScriptLoaded = "true";
        if (window.pannellum) {
          resolve(window.pannellum);
        } else {
          reject(new Error("Pannellum loaded without exposing window.pannellum."));
        }
      },
      { once: true }
    );
    script.addEventListener("error", () => reject(new Error("Unable to load panorama viewer.")), { once: true });
  });
}

function loadPannellumScript(): Promise<PannellumApi> {
  if (window.pannellum) {
    return Promise.resolve(window.pannellum);
  }

  const existingScript = document.querySelector<HTMLScriptElement>("script[data-pannellum-script]");
  if (existingScript) {
    return waitForPannellumScript(existingScript);
  }

  const script = document.createElement("script");
  script.src = publicAsset("vendor/pannellum/pannellum.js");
  script.async = true;
  script.dataset.pannellumScript = "true";
  document.body.appendChild(script);

  return waitForPannellumScript(script);
}

function loadPannellum(): Promise<PannellumApi> {
  if (window.pannellum) {
    return Promise.resolve(window.pannellum);
  }

  if (pannellumLoadPromise) {
    return pannellumLoadPromise;
  }

  pannellumLoadPromise = Promise.all([loadPannellumStyles(), loadPannellumScript()]).then(([, api]) => api);

  return pannellumLoadPromise;
}

function isMobileDevice() {
  return MOBILE_USER_AGENT_PATTERN.test(navigator.userAgent) && navigator.maxTouchPoints > 0;
}

async function requestMotionPermission() {
  const deviceOrientationEvent = window.DeviceOrientationEvent as DeviceOrientationEventWithPermission | undefined;

  if (typeof deviceOrientationEvent?.requestPermission === "function") {
    const permission = await deviceOrientationEvent.requestPermission();
    if (permission !== "granted") {
      throw new Error("Motion permission was not granted.");
    }
  }
}

async function requestLandscapeFullscreen() {
  await document.documentElement.requestFullscreen?.().catch(() => undefined);
  await window.screen.orientation?.lock?.("landscape").catch(() => undefined);
}

function getHotspotAngles(hotspot: PanoramaHotspot): Pick<PannellumViewerConfig, "yaw" | "pitch"> {
  return {
    ...(typeof hotspot.yaw === "number" ? { yaw: hotspot.yaw } : {}),
    ...(typeof hotspot.pitch === "number" ? { pitch: hotspot.pitch } : {})
  };
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
  const [vrMode, setVrMode] = useState<"closed" | "unsupported" | "ready" | "active">("closed");
  const [vrError, setVrError] = useState("");

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
          ...getHotspotAngles(hotspot),
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

  useEffect(() => {
    const backgroundMusic = new Audio(PANORAMA_BACKGROUND_MUSIC);
    backgroundMusic.loop = true;
    backgroundMusic.preload = "auto";

    void backgroundMusic.play().catch(() => {
      // Some browsers may still block playback; the panorama should remain usable.
    });

    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, []);

  return (
    <div className="panorama-viewer" role="dialog" aria-modal="true" aria-labelledby="panorama-viewer-title">
      <div className="panorama-viewer__topbar">
        <div>
          <p>360 Experience</p>
          <h3 id="panorama-viewer-title">{hotspot.label}</h3>
        </div>
        <div className="panorama-viewer__actions">
          <button
            className="button button--secondary panorama-viewer__vr-button"
            type="button"
            aria-label="Open VR Box mode"
            onClick={() => {
              setVrError("");
              setVrMode(isMobileDevice() ? "ready" : "unsupported");
            }}
          >
            <Smartphone size={18} aria-hidden="true" />
            VR Box
          </button>
          <button className="modal-close modal-close--inline" type="button" onClick={onClose} aria-label="Close panorama" ref={closeButtonRef}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
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
      {vrMode === "unsupported" ? (
        <div className="vr-box-message" role="status" aria-live="polite">
          <p>VR Box mode requires a mobile phone.</p>
          <button className="button button--secondary" type="button" onClick={() => setVrMode("closed")}>
            Back to 360 view
          </button>
        </div>
      ) : null}
      {vrMode === "ready" || vrMode === "active" ? (
        <VRBoxViewer
          hotspot={hotspot}
          active={vrMode === "active"}
          error={vrError}
          onClose={() => {
            setVrMode("closed");
            setVrError("");
          }}
          onStart={async () => {
            setVrError("");
            try {
              await requestLandscapeFullscreen();
              await requestMotionPermission();
              setVrMode("active");
            } catch {
              setVrError("Motion access is needed for VR Box mode. Please allow motion permission, then try again.");
            }
          }}
        />
      ) : null}
    </div>
  );
}

type VRBoxViewerProps = {
  hotspot: PanoramaHotspot;
  active: boolean;
  error: string;
  onClose: () => void;
  onStart: () => Promise<void>;
};

function VRBoxViewer({ hotspot, active, error, onClose, onStart }: VRBoxViewerProps) {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      return;
    }

    let cancelled = false;
    const viewers: PannellumViewer[] = [];

    loadPannellum()
      .then((api) => {
        if (cancelled || !leftEyeRef.current || !rightEyeRef.current) {
          return;
        }

        const baseConfig = {
          type: "equirectangular" as const,
          panorama: hotspot.panorama,
          title: hotspot.label,
          autoLoad: true,
          showControls: false,
          showFullscreenCtrl: false,
          showZoomCtrl: false,
          compass: false,
          hfov: 95,
          minHfov: 70,
          maxHfov: 105,
          ...getHotspotAngles(hotspot),
          orientationOnByDefault: true,
          draggable: false,
          mouseZoom: false,
          backgroundColor: [11, 13, 14] as [number, number, number]
        };

        viewers.push(api.viewer(leftEyeRef.current, baseConfig), api.viewer(rightEyeRef.current, baseConfig));
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      viewers.forEach((viewer) => viewer.destroy());
    };
  }, [active, hotspot]);

  return (
    <div className="vr-box-viewer" role="dialog" aria-modal="true" aria-label="VR Box mode">
      <button className="modal-close" type="button" onClick={onClose} aria-label="Close VR Box mode">
        <X size={20} aria-hidden="true" />
      </button>
      <div className="vr-box-viewer__eyes" aria-hidden={!active}>
        <div className="vr-box-viewer__eye" ref={leftEyeRef} />
        <div className="vr-box-viewer__eye" ref={rightEyeRef} />
      </div>
      {!active ? (
        <div className="vr-box-viewer__prompt">
          <p>Rotate your phone</p>
          <span>Landscape works best before placing it in the VR box.</span>
          <button className="button button--primary" type="button" onClick={() => void onStart()}>
            Start VR Box
          </button>
          {error ? <span className="vr-box-viewer__error">{error}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

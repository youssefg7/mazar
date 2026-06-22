import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PanoramaHotspot } from "../types";
import { PanoramaViewer } from "./PanoramaViewer";

const hotspot: PanoramaHotspot = {
  id: "main-hall",
  label: "Main Hall",
  x: 30,
  y: 58,
  panorama: "/mazar/panos/pano-main-hall.jpg",
  description: "Explore the central museum hall."
};

const playMock = vi.fn();
const pauseMock = vi.fn();
const audioInstances: Array<{
  currentTime: number;
  loop: boolean;
  pause: typeof pauseMock;
  play: typeof playMock;
  preload: string;
  src: string;
}> = [];

class MockAudio {
  currentTime = 0;
  loop = false;
  pause = pauseMock;
  play = playMock;
  preload = "";
  src: string;

  constructor(src = "") {
    this.src = src;
    audioInstances.push(this);
  }
}

describe("PanoramaViewer", () => {
  beforeEach(() => {
    playMock.mockClear();
    playMock.mockResolvedValue(undefined);
    pauseMock.mockClear();
    audioInstances.length = 0;

    vi.stubGlobal("Audio", MockAudio);
    window.pannellum = {
      viewer: vi.fn(() => ({
        destroy: vi.fn(),
        on: vi.fn().mockReturnThis()
      }))
    };
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.classList.remove("modal-is-open");
    delete window.pannellum;
  });

  it("starts looping background music while the panorama is open and stops it when closed", async () => {
    const { unmount } = render(<PanoramaViewer hotspot={hotspot} onClose={vi.fn()} />);

    await waitFor(() => expect(playMock).toHaveBeenCalledTimes(1));

    expect(audioInstances).toHaveLength(1);
    expect(audioInstances[0].src).toContain("360-background-music.m4a");
    expect(audioInstances[0].loop).toBe(true);
    expect(audioInstances[0].preload).toBe("auto");

    unmount();

    expect(pauseMock).toHaveBeenCalledTimes(1);
    expect(audioInstances[0].currentTime).toBe(0);
  });

  it("shows a friendly mobile requirement message when VR Box is opened on desktop", () => {
    render(<PanoramaViewer hotspot={hotspot} onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /open vr box mode/i }));

    expect(screen.getByRole("status").textContent).toContain("VR Box mode requires a mobile phone");
  });

  it("omits optional yaw and pitch when the hotspot does not define them", async () => {
    render(<PanoramaViewer hotspot={hotspot} onClose={vi.fn()} />);

    await waitFor(() => expect(window.pannellum?.viewer).toHaveBeenCalledTimes(1));

    expect(vi.mocked(window.pannellum?.viewer).mock.calls[0]?.[1]).not.toHaveProperty("yaw");
    expect(vi.mocked(window.pannellum?.viewer).mock.calls[0]?.[1]).not.toHaveProperty("pitch");
  });

  it("passes optional yaw and pitch when the hotspot defines them", async () => {
    render(<PanoramaViewer hotspot={{ ...hotspot, yaw: -35, pitch: 8 }} onClose={vi.fn()} />);

    await waitFor(() => expect(window.pannellum?.viewer).toHaveBeenCalledTimes(1));

    expect(vi.mocked(window.pannellum?.viewer).mock.calls[0]?.[1]).toMatchObject({ yaw: -35, pitch: 8 });
  });

  it("shows the rotate-phone overlay and requests motion permission before starting VR Box mode on mobile", async () => {
    const requestPermission = vi.fn().mockResolvedValue("granted");
    const requestFullscreen = vi.fn().mockResolvedValue(undefined);
    const lock = vi.fn().mockResolvedValue(undefined);

    vi.stubGlobal("DeviceOrientationEvent", { requestPermission });
    Object.defineProperty(document.documentElement, "requestFullscreen", {
      configurable: true,
      value: requestFullscreen
    });
    Object.defineProperty(window.screen, "orientation", {
      configurable: true,
      value: { lock }
    });
    vi.stubGlobal("navigator", {
      ...navigator,
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1",
      maxTouchPoints: 5
    });

    render(<PanoramaViewer hotspot={hotspot} onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /open vr box mode/i }));

    expect(screen.getByText("Rotate your phone")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /start vr box/i }));

    await waitFor(() => expect(requestPermission).toHaveBeenCalledTimes(1));
    expect(requestFullscreen).toHaveBeenCalledTimes(1);
    expect(lock).toHaveBeenCalledWith("landscape");
    await waitFor(() => expect(window.pannellum?.viewer).toHaveBeenCalledTimes(3));
  });

  it("waits for Pannellum styles before creating the viewer on first load", async () => {
    const viewerMock = vi.fn(() => ({
      destroy: vi.fn(),
      on: vi.fn().mockReturnThis()
    }));

    delete window.pannellum;
    render(<PanoramaViewer hotspot={hotspot} onClose={vi.fn()} />);

    const stylesheet = document.querySelector<HTMLLinkElement>("link[data-pannellum-styles]");
    const script = document.querySelector<HTMLScriptElement>("script[data-pannellum-script]");

    expect(stylesheet).toBeTruthy();
    expect(script).toBeTruthy();

    window.pannellum = { viewer: viewerMock };
    script?.dispatchEvent(new Event("load"));

    await Promise.resolve();
    expect(viewerMock).not.toHaveBeenCalled();

    stylesheet?.dispatchEvent(new Event("load"));

    await waitFor(() => expect(viewerMock).toHaveBeenCalledTimes(1));
  });
});

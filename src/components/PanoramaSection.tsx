import { useState } from "react";
import type { PanoramaHotspot } from "../types";
import { PanoramaViewer } from "./PanoramaViewer";

type PanoramaSectionProps = {
  mapImage: string;
  hotspots: PanoramaHotspot[];
};

export function PanoramaSection({ mapImage, hotspots }: PanoramaSectionProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<PanoramaHotspot | null>(null);

  return (
    <section className="section panorama-section" id="panorama" aria-labelledby="panorama-title">
      <div className="section__header section__header--wide">
        <p className="section__eyebrow">360 Experience</p>
        <h2 id="panorama-title">Enter the exhibition hall through fixed points</h2>
        <p>
          Click a cyan point on the museum image to open the fullscreen panorama. The tour loads only when requested.
        </p>
      </div>

      <div className="panorama-map">
        <img src={mapImage} alt="Interactive preview map of MAZAR Maritime Museum interior" loading="lazy" />
        {hotspots.map((hotspot) => (
          <button
            className="hotspot"
            key={hotspot.id}
            type="button"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            onClick={() => setSelectedHotspot(hotspot)}
            aria-label={`Open 360 panorama: ${hotspot.label}`}
          >
            <span className="hotspot__dot" aria-hidden="true" />
            <span className="hotspot__label">{hotspot.label}</span>
          </button>
        ))}
      </div>

      {selectedHotspot ? <PanoramaViewer hotspot={selectedHotspot} onClose={() => setSelectedHotspot(null)} /> : null}
    </section>
  );
}

import { Download, ExternalLink } from "lucide-react";
import type { BannerConfig } from "../types";

type BannerSectionProps = {
  config: BannerConfig;
};

export function BannerSection({ config }: BannerSectionProps) {
  const hasPreview = Boolean(config.previewImage);
  const hasPdf = Boolean(config.pdf);
  const hasJpg = Boolean(config.jpg);
  const hasExternal = Boolean(config.externalLink);

  return (
    <section className="section banner-section" id="banner" aria-labelledby="banner-title">
      <div className="banner-panel">
        <div className="banner-preview">
          {hasPreview ? (
            <img src={config.previewImage} alt="Preview of MAZAR graduation banner" loading="lazy" />
          ) : (
            <div className="banner-preview__placeholder" aria-label="Banner preview pending">
              <span>MAZAR</span>
              <strong>Presentation board</strong>
            </div>
          )}
        </div>

        <div className="banner-content">
          <p className="section__eyebrow">Graduation Banner</p>
          <h2 id="banner-title">Presentation board</h2>
          <p>
            A compressed preview and print-ready downloads can be linked here without slowing down the main page.
          </p>
          <div className="banner-actions">
            {hasPreview ? (
              <a className="button button--secondary" href={config.previewImage} target="_blank" rel="noreferrer">
                Preview Banner
                <ExternalLink size={17} aria-hidden="true" />
              </a>
            ) : null}
            {hasPdf ? (
              <a className="button button--primary" href={config.pdf} download>
                Download PDF
                <Download size={17} aria-hidden="true" />
              </a>
            ) : null}
            {hasJpg ? (
              <a className="button button--secondary" href={config.jpg} download>
                Download JPG
                <Download size={17} aria-hidden="true" />
              </a>
            ) : null}
            {hasExternal ? (
              <a className="button button--secondary" href={config.externalLink} target="_blank" rel="noreferrer">
                External Link
                <ExternalLink size={17} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

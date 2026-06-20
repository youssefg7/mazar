import { ArrowDown, Compass } from "lucide-react";
import type { NavItem } from "../types";

type HeroProps = {
  config: {
    projectName: string;
    projectSubtitle: string;
    projectType: string;
    year: string;
    owner: string;
    university: string;
    description: string;
    heroDesktop: string;
    heroMobile: string;
    logoEmblem: string;
    logoWordmark: string;
  };
  navItems: NavItem[];
};

export function Hero({ config, navItems }: HeroProps) {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <picture className="hero__image">
        <source srcSet={config.heroMobile} media="(max-width: 640px)" />
        <img src={config.heroDesktop} alt="MAZAR Maritime Museum exterior at sunset" fetchPriority="high" />
      </picture>
      <div className="hero__shade" />

      <div className="hero__content">
        <div className="hero__brand-row">
          <img className="hero__seal" src={config.logoEmblem} alt="" aria-hidden="true" />
          <img className="hero__wordmark" src={config.logoWordmark} alt="MAZAR Arabic logo" />
        </div>
        <p className="hero__kicker">
          {config.projectType} · {config.year} · {config.university}
        </p>
        <h1 id="hero-title">
          <span>{config.projectName}</span>
          <strong>{config.projectSubtitle}</strong>
        </h1>
        <p className="hero__statement">{config.description}</p>
        <div className="hero__actions">
          <a className="button button--primary" href="#exterior">
            Explore Project
            <ArrowDown size={17} aria-hidden="true" />
          </a>
          <a className="button button--secondary" href="#panorama">
            Open 360 Experience
            <Compass size={17} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="hero__feature-nav" aria-label="Project sections">
        {navItems.map((item) => (
          <a href={`#${item.id}`} key={item.id}>
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}

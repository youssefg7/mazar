import { useEffect, useState } from "react";
import { BannerSection } from "./components/BannerSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PanoramaSection } from "./components/PanoramaSection";
import {
  bannerConfig,
  contactConfig,
  exteriorImages,
  interiorImages,
  navItems,
  panoramaHotspots,
  panoramaMapImage,
  siteConfig
} from "./data/site";
import { applyTheme, getInitialTheme, getNextTheme, persistTheme, type ThemeMode } from "./utils/theme";

const observedSections = ["hero", ...navItems.map((item) => item.id)];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.16, 0.32, 0.5]
      }
    );

    observedSections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  return (
    <>
      <Header
        activeSection={activeSection}
        logoEmblem={siteConfig.logoEmblem}
        navItems={navItems}
        onThemeToggle={() => setTheme((currentTheme) => getNextTheme(currentTheme))}
        projectName={siteConfig.projectName}
        theme={theme}
      />
      <main>
        <Hero config={siteConfig} />
        <GallerySection
          id="exterior"
          eyebrow="Exterior Renders"
          title="The museum as a coastal threshold"
          description="Arrival views, roof studies, public edges, and waterfront moments."
          images={exteriorImages}
        />
        <GallerySection
          id="interior"
          eyebrow="Interior Renders"
          title="A route through maritime memory"
          description="The main hall sequence, ready to expand as more interior renders are added."
          images={interiorImages}
        />
        <PanoramaSection mapImage={panoramaMapImage} hotspots={panoramaHotspots} />
        <BannerSection config={bannerConfig} />
        <ContactSection contact={contactConfig} />
      </main>
      <Footer />
    </>
  );
}

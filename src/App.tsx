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

const observedSections = ["hero", ...navItems.map((item) => item.id)];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

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

  return (
    <>
      <Header activeSection={activeSection} navItems={navItems} projectName={siteConfig.projectName} />
      <main>
        <Hero config={siteConfig} navItems={navItems} />
        <GallerySection
          id="exterior"
          eyebrow="Exterior Renders"
          title="The museum as a coastal threshold"
          description="A horizontal sequence of arrival views, roof studies, public edges, and waterfront moments."
          images={exteriorImages}
        />
        <GallerySection
          id="interior"
          eyebrow="Interior Renders"
          title="A route through maritime memory"
          description="The interior gallery begins with the main hall and can expand as more rendered scenes are added."
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

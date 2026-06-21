import { useEffect, useState } from "react";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { contactConfig, siteConfig } from "./data/site";
import { applyTheme, getInitialTheme, getNextTheme, persistTheme, type ThemeMode } from "./utils/theme";

const temporaryNavItems = [{ id: "contact", label: "Contact" }];
const observedSections = ["hero", "wait", "contact"];

function WaitSection() {
  return (
    <section className="section wait-section" id="wait" aria-labelledby="wait-title">
      <div className="wait-panel">
        <p className="section__eyebrow">Temporary hold</p>
        <h2 id="wait-title">Wait for it</h2>
        <p>
          Coming soon on Jury day!
        </p>
        <div className="wait-line" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}

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
        navItems={temporaryNavItems}
        onThemeToggle={() => setTheme((currentTheme) => getNextTheme(currentTheme))}
        projectName={siteConfig.projectName}
        theme={theme}
      />
      <main>
        <Hero config={siteConfig} />
        <WaitSection />
        <ContactSection contact={contactConfig} />
      </main>
      <Footer />
    </>
  );
}

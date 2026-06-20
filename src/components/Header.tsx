import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavItem } from "../types";
import type { ThemeMode } from "../utils/theme";

type HeaderProps = {
  activeSection: string;
  logoEmblem: string;
  navItems: NavItem[];
  onThemeToggle: () => void;
  projectName: string;
  theme: ThemeMode;
};

export function Header({ activeSection, logoEmblem, navItems, onThemeToggle, projectName, theme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a className="site-mark" href="#hero" onClick={() => setMenuOpen(false)}>
        <span className="site-mark__symbol">
          <img src={logoEmblem} alt="" aria-hidden="true" />
        </span>
        <span>{projectName}</span>
      </a>

      <div className="site-header__actions">
        <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              className={activeSection === item.id ? "site-nav__link site-nav__link--active" : "site-nav__link"}
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${nextTheme} mode`}
          aria-pressed={theme === "light"}
          onClick={onThemeToggle}
        >
          {theme === "dark" ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          <span>{nextTheme}</span>
        </button>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

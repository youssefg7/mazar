import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavItem } from "../types";

type HeaderProps = {
  activeSection: string;
  navItems: NavItem[];
  projectName: string;
};

export function Header({ activeSection, navItems, projectName }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  return (
    <header className="site-header">
      <a className="site-mark" href="#hero" onClick={() => setMenuOpen(false)}>
        <span className="site-mark__symbol">M</span>
        <span>{projectName}</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
      </button>

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
    </header>
  );
}

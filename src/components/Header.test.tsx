import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./Header";

const navItems = [
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "panorama", label: "360 Experience" },
  { id: "banner", label: "Banner" },
  { id: "contact", label: "Contact" }
];

describe("Header", () => {
  it("renders a theme switch that announces the next mode", () => {
    const onThemeToggle = vi.fn();

    render(
      <Header
        activeSection="contact"
        logoEmblem="/images/brand/mazar-emblem.webp"
        navItems={navItems}
        onThemeToggle={onThemeToggle}
        projectName="MAZAR"
        theme="dark"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));

    expect(onThemeToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("link", { name: "Contact" }).className).toContain("site-nav__link--active");
  });
});

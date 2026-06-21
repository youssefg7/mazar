import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
}

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the temporary wait page with only the hero, wait message, and contact details", () => {
    render(<App />);

    const nav = screen.getByRole("navigation", { name: "Primary navigation" });
    const navLinks = within(nav).getAllByRole("link");
    const hero = screen.getByRole("region", { name: /mazar/i });
    const wait = screen.getByRole("region", { name: "Wait for it" });
    const contact = screen.getByRole("region", { name: "Lara Sameeh" });

    expect(navLinks.map((link) => link.textContent)).toEqual(["Contact"]);
    expect(hero.compareDocumentPosition(wait) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    expect(wait.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
    expect(screen.queryByRole("region", { name: "Museum Walkthrough" })).toBeNull();
    expect(screen.queryByRole("region", { name: "Enter the exhibition hall in 360 immersive experience" })).toBeNull();
    expect(screen.queryByRole("region", { name: "The museum as a coastal threshold" })).toBeNull();
    expect(screen.queryByRole("region", { name: "A route through maritime memory" })).toBeNull();
    expect(screen.queryByRole("region", { name: "Presentation board" })).toBeNull();
  });
});

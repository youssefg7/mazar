import { describe, expect, it, vi } from "vitest";
import { applyTheme, getInitialTheme, getNextTheme, persistTheme, THEME_STORAGE_KEY } from "./theme";

describe("theme helpers", () => {
  it("uses a saved valid theme or falls back to dark", () => {
    const storage = new Map<string, string>();

    expect(getInitialTheme({ getItem: (key) => storage.get(key) ?? null })).toBe("dark");

    storage.set(THEME_STORAGE_KEY, "light");
    expect(getInitialTheme({ getItem: (key) => storage.get(key) ?? null })).toBe("light");

    storage.set(THEME_STORAGE_KEY, "bright");
    expect(getInitialTheme({ getItem: (key) => storage.get(key) ?? null })).toBe("dark");
  });

  it("toggles between dark and light", () => {
    expect(getNextTheme("dark")).toBe("light");
    expect(getNextTheme("light")).toBe("dark");
  });

  it("applies and stores the selected theme", () => {
    const root = document.createElement("html");
    const storage = {
      setItem: vi.fn()
    };

    applyTheme("light", root);
    persistTheme("light", storage);

    expect(root.dataset.theme).toBe("light");
    expect(root.style.colorScheme).toBe("light");
    expect(storage.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, "light");
  });
});

export type ThemeMode = "dark" | "light";

export const THEME_STORAGE_KEY = "mazar-theme";

type ThemeStorageReader = Pick<Storage, "getItem">;
type ThemeStorageWriter = Pick<Storage, "setItem">;

function isThemeMode(value: string | null): value is ThemeMode {
  return value === "dark" || value === "light";
}

function getBrowserStorage(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function getInitialTheme(storage: ThemeStorageReader | null = getBrowserStorage()): ThemeMode {
  const storedTheme = storage?.getItem(THEME_STORAGE_KEY) ?? null;
  return isThemeMode(storedTheme) ? storedTheme : "dark";
}

export function getNextTheme(theme: ThemeMode): ThemeMode {
  return theme === "dark" ? "light" : "dark";
}

export function applyTheme(theme: ThemeMode, root: HTMLElement = document.documentElement) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

export function persistTheme(theme: ThemeMode, storage: ThemeStorageWriter | null = getBrowserStorage()) {
  storage?.setItem(THEME_STORAGE_KEY, theme);
}

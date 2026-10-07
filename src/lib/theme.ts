export type ThemePreference = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export function parsePreference(value: string | null): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}

export function isDark(preference: ThemePreference, prefersDark: boolean): boolean {
  return preference === "dark" || (preference === "system" && prefersDark);
}

export function readPreference(): ThemePreference {
  try {
    return parsePreference(localStorage.getItem(THEME_STORAGE_KEY));
  } catch {
    // Storage can be blocked (private mode, site data disabled); the system theme still works.
    return "system";
  }
}

export function writePreference(preference: ThemePreference): void {
  try {
    if (preference === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Same as readPreference: the choice applies for this page view only.
  }
}

export function applyPreference(preference: ThemePreference): void {
  const dark = isDark(preference, matchMedia(DARK_QUERY).matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

/** Inlined in <head> so the right theme is set before the first paint. Must stay in step with isDark. */
export const THEME_SCRIPT = `(function(){var t=null;try{t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})}catch(e){}var d=t==="dark"||(t!=="light"&&matchMedia(${JSON.stringify(DARK_QUERY)}).matches);var r=document.documentElement;r.classList.toggle("dark",d);r.style.colorScheme=d?"dark":"light"})()`;

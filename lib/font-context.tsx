"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export const FONT_OPTIONS = [
  { id: "default", label: "Default", family: "var(--font-geist-sans), system-ui, sans-serif" },
  { id: "inter", label: "Inter", family: "var(--font-inter), system-ui, sans-serif" },
  { id: "roboto", label: "Roboto", family: "var(--font-roboto), system-ui, sans-serif" },
  { id: "open-sans", label: "Open Sans", family: "var(--font-open-sans), system-ui, sans-serif" },
  { id: "neuton", label: "Neuton", family: "var(--font-neuton), Georgia, serif" },
] as const;

export type FontOption = (typeof FONT_OPTIONS)[number];

interface FontContextValue {
  fontId: string;
  setFont: (id: string) => void;
}

const FontContext = createContext<FontContextValue>({
  fontId: "default",
  setFont: () => {},
});

export function FontProvider({ children }: { children: ReactNode }) {
  const [fontId, setFontId] = useState("default");

  useEffect(() => {
    const font = FONT_OPTIONS.find((f) => f.id === fontId);
    if (font) {
      document.documentElement.style.setProperty("--app-font", font.family);
    }
    return () => {
      document.documentElement.style.removeProperty("--app-font");
    };
  }, [fontId]);

  return (
    <FontContext.Provider value={{ fontId, setFont: setFontId }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  return useContext(FontContext);
}

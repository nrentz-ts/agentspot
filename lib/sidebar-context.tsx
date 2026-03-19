"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextValue {
  open: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  open: false,
  toggle: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ open, toggle: () => setOpen((v) => !v) }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}

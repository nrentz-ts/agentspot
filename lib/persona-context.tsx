"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { PERSONAS, Persona } from "./personas";

interface PersonaContextValue {
  persona: Persona;
  setPersona: (id: string) => void;
}

const PersonaContext = createContext<PersonaContextValue>({
  persona: PERSONAS[0],
  setPersona: () => {},
});

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>(PERSONAS[0]);

  function setPersona(id: string) {
    const found = PERSONAS.find((p) => p.id === id);
    if (found) setPersonaState(found);
  }

  return (
    <PersonaContext.Provider value={{ persona, setPersona }}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  return useContext(PersonaContext);
}

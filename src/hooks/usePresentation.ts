import { createContext, useContext } from 'react';

export interface PresentationContextValue {
  isOpen: boolean;
  open: (startIndex?: number) => void;
  close: () => void;
}

export const PresentationContext = createContext<PresentationContextValue | null>(null);

export function usePresentation(): PresentationContextValue {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error('usePresentation must be used inside <PresentationProvider>');
  return ctx;
}

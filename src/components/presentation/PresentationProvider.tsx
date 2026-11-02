import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useCallback, useMemo, useState, type ReactNode } from 'react';
import { PresentationContext } from '../../hooks/usePresentation';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { Spinner } from '../ui/Spinner';

const PresentationMode = lazy(() => import('./PresentationMode'));

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; start: number }>({ open: false, start: 0 });

  const open = useCallback((startIndex = 0) => setState({ open: true, start: startIndex }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ isOpen: state.open, open, close }), [state.open, open, close]);

  return (
    <PresentationContext.Provider value={value}>
      {children}
      <ErrorBoundary label="Не удалось открыть режим презентации.">
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[100] grid place-items-center bg-ink-950">
              <Spinner label="Подготовка презентации" />
            </div>
          }
        >
          <AnimatePresence>{state.open && <PresentationMode key="presentation" startIndex={state.start} onClose={close} />}</AnimatePresence>
        </Suspense>
      </ErrorBoundary>
    </PresentationContext.Provider>
  );
}

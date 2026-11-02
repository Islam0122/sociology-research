import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, NotebookPen, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { SLIDES } from './slides';

interface PresentationModeProps {
  startIndex: number;
  onClose: () => void;
}

export default function PresentationMode({ startIndex, onClose }: PresentationModeProps) {
  const [index, setIndex] = useState(() => Math.min(Math.max(0, startIndex), SLIDES.length - 1));
  const [direction, setDirection] = useState(1);
  const [notes, setNotes] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const wasFullscreen = useRef(false);

  const go = useCallback((next: number) => {
    setIndex((cur) => {
      const clamped = Math.min(Math.max(0, next), SLIDES.length - 1);
      setDirection(clamped >= cur ? 1 : -1);
      return clamped;
    });
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await rootRef.current?.requestFullscreen();
    } catch {
      /* Fullscreen not available (e.g. iOS Safari) — the overlay already fills the viewport. */
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          setIndex((i) => {
            setDirection(1);
            return Math.min(i + 1, SLIDES.length - 1);
          });
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          setIndex((i) => {
            setDirection(-1);
            return Math.max(i - 1, 0);
          });
          break;
        case 'Home':
          e.preventDefault();
          go(0);
          break;
        case 'End':
          e.preventDefault();
          go(SLIDES.length - 1);
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case 'n':
        case 'N':
        case 'т':
        case 'Т':
          setNotes((v) => !v);
          break;
        case 'f':
        case 'F':
        case 'а':
        case 'А':
          void toggleFullscreen();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose, toggleFullscreen]);

  // Lock page scroll, focus overlay, enter fullscreen, and exit together.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    rootRef.current?.focus();
    void rootRef.current?.requestFullscreen?.().catch(() => undefined);
    const onFs = () => {
      if (document.fullscreenElement) wasFullscreen.current = true;
      else if (wasFullscreen.current) onClose();
    };
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('fullscreenchange', onFs);
      if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
    };
  }, [onClose]);

  const slide = SLIDES[index];
  if (!slide) return null;
  const progress = ((index + 1) / SLIDES.length) * 100;

  return (
    <motion.div
      ref={rootRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Режим презентации"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="no-print fixed inset-0 z-[100] flex flex-col bg-ink-950 text-fg outline-none"
      onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX;
        if (start == null || end == null) return;
        const dx = end - start;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Progress */}
      <div className="h-[3px] w-full bg-line" role="progressbar" aria-valuemin={1} aria-valuemax={SLIDES.length} aria-valuenow={index + 1} aria-label="Прогресс презентации">
        <motion.div className="h-full bg-gradient-to-r from-accent to-violet" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between px-[clamp(1rem,4vw,4rem)] py-4">
        <span className="font-mono text-[11px] tracking-[0.22em] text-fg-subtle">
          SOCIOLOGY <span className="text-fg-subtle/60">/</span> <span className="text-accent-soft">2026</span>
        </span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setNotes((v) => !v)} aria-pressed={notes} title="Заметки докладчика (N)" className={cn('grid h-9 w-9 place-items-center rounded-full hover:bg-white/5', notes ? 'text-accent-soft' : 'text-fg-subtle')}>
            <NotebookPen className="h-4 w-4" />
            <span className="sr-only">Заметки докладчика</span>
          </button>
          <button type="button" onClick={() => void toggleFullscreen()} title="Полный экран (F)" className="grid h-9 w-9 place-items-center rounded-full text-fg-subtle hover:bg-white/5 hover:text-fg">
            <Maximize2 className="h-4 w-4" />
            <span className="sr-only">Полный экран</span>
          </button>
          <button type="button" onClick={onClose} title="Выйти (Esc)" className="grid h-9 w-9 place-items-center rounded-full text-fg-subtle hover:bg-white/5 hover:text-fg">
            <X className="h-5 w-5" />
            <span className="sr-only">Выйти из презентации</span>
          </button>
        </div>
      </div>

      {/* Slide */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-y-auto px-[clamp(1rem,6vw,7rem)] pb-8"
            aria-live="polite"
          >
            <div className="mx-auto flex min-h-full max-w-7xl flex-col justify-center py-4">
              <p className="eyebrow text-accent-soft">{slide.kicker}</p>
              {slide.title && (
                <h2 className="mt-4 mb-[clamp(1.5rem,4vh,3rem)] max-w-5xl font-serif text-[clamp(1.9rem,4.4vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg text-balance">
                  {slide.title}
                </h2>
              )}
              <ErrorBoundary label="Слайд не удалось отобразить.">{slide.render()}</ErrorBoundary>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Speaker notes */}
      <AnimatePresence>
        {notes && (
          <motion.aside
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-surface"
            aria-label="Заметки докладчика"
          >
            <p className="px-[clamp(1rem,4vw,4rem)] py-4 text-sm leading-relaxed text-fg-muted">
              <span className="eyebrow mr-3 text-accent-soft">Заметки</span>
              {slide.notes}
            </p>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Bottom bar */}
      <div className="flex items-center justify-between gap-4 border-t border-line px-[clamp(1rem,4vw,4rem)] py-3">
        <p className="hidden text-xs text-fg-subtle md:block">← → навигация · Esc выход · N заметки · F полный экран</p>
        <div className="flex items-center gap-1.5" aria-hidden>
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              tabIndex={-1}
              onClick={() => go(i)}
              className={cn('h-1.5 rounded-full transition-all', i === index ? 'w-6 bg-accent' : 'w-1.5 bg-line-strong hover:bg-fg-subtle')}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tabular-nums text-fg-muted">
            {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg hover:border-line-strong disabled:opacity-30" aria-label="Предыдущий слайд">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => go(index + 1)} disabled={index === SLIDES.length - 1} className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg hover:border-line-strong disabled:opacity-30" aria-label="Следующий слайд">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

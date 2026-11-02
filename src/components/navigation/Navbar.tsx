import { AnimatePresence, motion } from 'framer-motion';
import { Menu, MonitorPlay, Printer, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAV_ITEMS, PROJECT } from '../../data/navigation';
import { usePresentation } from '../../hooks/usePresentation';
import type { SectionId } from '../../types';
import { cn } from '../../utils/cn';
import { scrollToSection } from '../../utils/scroll';

interface NavbarProps {
  scrolled: boolean;
  active: SectionId | null;
}

export function Navbar({ scrolled, active }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { open: openPresentation } = usePresentation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (id: SectionId) => {
    setOpen(false);
    // Wait for the mobile menu to release scroll lock.
    requestAnimationFrame(() => scrollToSection(id));
  };

  const isActive = (covers: SectionId[]) => active !== null && covers.includes(active);

  return (
    <nav
      aria-label="Основная навигация"
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open ? 'border-b border-line bg-ink-950/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
      )}
    >
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-fg focus:px-3 focus:py-1.5 focus:text-ink-950"
      >
        Перейти к содержанию
      </a>
      <div className="container-edit flex h-16 items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => go('intro')}
          className="font-mono text-[11px] font-medium tracking-[0.22em] text-fg"
          aria-label="В начало страницы"
        >
          SOCIOLOGY <span className="text-fg-subtle">/</span> <span className="text-accent-soft">{PROJECT.year}</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const on = isActive(item.covers);
            return (
              <li key={item.target}>
                <button
                  type="button"
                  onClick={() => go(item.target)}
                  aria-current={on ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors',
                    on ? 'text-fg' : 'text-fg-subtle hover:text-fg',
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-line-strong bg-white/[0.04]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-fg-subtle xl:inline">{PROJECT.author}</span>
          <span className="hidden h-4 w-px bg-line-strong xl:inline-block" aria-hidden />
          <button
            type="button"
            onClick={() => window.print()}
            className="hidden h-9 w-9 place-items-center rounded-full text-fg-subtle transition-colors hover:bg-white/5 hover:text-fg md:grid"
            aria-label="Экспорт в PDF (печать)"
            title="Экспорт в PDF"
          >
            <Printer className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => openPresentation(0)}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-3.5 text-xs font-medium text-fg transition-colors hover:border-accent/60 hover:bg-accent/10"
          >
            <MonitorPlay className="h-4 w-4 text-accent-soft" />
            <span className="hidden sm:inline">Презентация</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 4rem)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto border-t border-line bg-ink-950 lg:hidden"
          >
            <ul className="container-edit flex flex-col py-6">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.target} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => go(item.target)}
                    className={cn(
                      'flex w-full items-baseline gap-4 py-4 text-left font-serif text-2xl',
                      isActive(item.covers) ? 'text-fg' : 'text-fg-muted',
                    )}
                  >
                    <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="container-edit flex flex-col gap-3 pb-10 text-sm text-fg-subtle">
              <p>Автор: {PROJECT.author}</p>
              <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 text-left text-fg-muted">
                <Printer className="h-4 w-4" /> Экспорт в PDF
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

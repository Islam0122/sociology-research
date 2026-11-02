import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';

export function BackToTop({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => scrollToSection('intro')}
          aria-label="Вернуться к началу"
          className="no-print fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-surface/90 text-fg backdrop-blur transition-colors hover:border-fg-subtle sm:bottom-8 sm:right-8"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

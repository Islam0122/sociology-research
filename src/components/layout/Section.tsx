import type { ReactNode } from 'react';
import type { SectionId } from '../../types';
import { cn } from '../../utils/cn';

interface SectionProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  tone?: 'base' | 'raised' | 'contrast';
}

const tones = {
  base: 'bg-ink-950',
  raised: 'bg-ink-900',
  contrast: 'bg-[#0a0a0f]',
};

export function Section({ id, children, className, labelledBy, tone = 'base' }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative scroll-mt-16 py-24 outline-none sm:py-32', tones[tone], className)}
    >
      {children}
    </section>
  );
}

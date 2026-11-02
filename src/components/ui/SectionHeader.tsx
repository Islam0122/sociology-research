import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Reveal } from './Reveal';

interface SectionHeaderProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'split';
  className?: string;
}

export function SectionHeader({ index, eyebrow, title, lead, align = 'split', className }: SectionHeaderProps) {
  return (
    <header className={cn('grid gap-8 lg:gap-16', align === 'split' && 'lg:grid-cols-12', className)}>
      <Reveal className={cn(align === 'split' && 'lg:col-span-7')}>
        <div className="flex items-center gap-4">
          {index && <span className="font-mono text-xs text-accent-soft">{index}</span>}
          <span className="h-px w-10 bg-line-strong" aria-hidden />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h2 className="mt-6 font-serif text-[clamp(2rem,4.6vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg text-balance">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.1} className={cn('self-end', align === 'split' && 'lg:col-span-5')}>
          <p className="text-base leading-relaxed text-fg-muted sm:text-lg">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}

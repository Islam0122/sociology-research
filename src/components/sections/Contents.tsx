import { ArrowUpRight } from 'lucide-react';
import { CHAPTERS } from '../../data/navigation';
import { scrollToSection } from '../../utils/scroll';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export function Contents() {
  return (
    <Section id="contents" labelledBy="contents-title" tone="raised">
      <div className="container-edit">
        <SectionHeader
          eyebrow="Содержание"
          title={<span id="contents-title">Семь глав исследования</span>}
          lead="Нажмите на главу, чтобы перейти к ней. Структура движется от теории к практике: от понятия социальных сетей — к собственному опросу и выводам."
        />
        <ol className="mt-16 border-t border-line">
          {CHAPTERS.map((ch, i) => (
            <Reveal as="li" key={ch.number} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => scrollToSection(ch.target)}
                className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-6 text-left transition-colors hover:bg-white/[0.02] sm:grid-cols-[5rem_1fr_1fr_auto] sm:gap-8 sm:py-8"
              >
                <span className="font-mono text-sm text-fg-subtle transition-colors group-hover:text-accent-soft">{ch.number}</span>
                <span className="font-serif text-xl leading-tight text-fg sm:text-3xl">{ch.title}</span>
                <span className="hidden text-sm text-fg-subtle sm:block">{ch.summary}</span>
                <ArrowUpRight className="h-5 w-5 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
              </button>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

import { Info } from 'lucide-react';
import { KG_INTRO, KG_QUOTE, KG_TOPICS } from '../../data/chapters';
import { IMAGES } from '../../data/images';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { SmartImage } from '../ui/SmartImage';

export function ChapterKyrgyzstan() {
  return (
    <Section id="chapter-4" labelledBy="ch4-title">
      <div className="container-edit">
        <SectionHeader
          index="04"
          eyebrow="Глава четвёртая · Региональный контекст"
          title={<span id="ch4-title">«Социальные сети и молодежь Кыргызстана»</span>}
          lead={KG_INTRO[0]}
        />
      </div>

      <Reveal className="mt-16 sm:mt-20">
        <div className="relative">
          <SmartImage asset={IMAGES.bishkek} className="h-[44vh] min-h-[18rem] w-full sm:h-[60vh]" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#080B12_0%,transparent_30%,transparent_60%,#080B12_100%)]" />
          <div className="container-edit absolute inset-x-0 bottom-8">
            <p className="max-w-3xl font-serif text-[clamp(1.4rem,3vw,2.4rem)] leading-snug text-fg">{KG_QUOTE}</p>
          </div>
        </div>
      </Reveal>

      <div className="container-edit">
        <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {KG_TOPICS.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} delay={(i % 3) * 0.06}>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-line-strong">
                    <Icon className="h-4 w-4 text-accent-soft" strokeWidth={1.5} aria-hidden />
                  </span>
                  <span className="font-mono text-[11px] text-fg-subtle">4.{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-medium text-fg">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{t.text}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16 flex gap-4 rounded-xl border border-line bg-surface/60 p-6">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" aria-hidden />
          <p className="text-sm leading-relaxed text-fg-muted">{KG_INTRO[1]}</p>
        </Reveal>
      </div>
    </Section>
  );
}

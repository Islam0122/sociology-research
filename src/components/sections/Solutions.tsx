import { RECOMMENDATIONS } from '../../data/solutions';
import { Section } from '../layout/Section';
import { WithCitations } from '../ui/Cite';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export function Solutions() {
  return (
    <Section id="solutions" labelledBy="solutions-title" tone="raised">
      <div className="container-edit">
        <SectionHeader
          index="05"
          eyebrow="Глава пятая · Рекомендации"
          title={<span id="solutions-title">Пути решения проблем: семь принципов осознанного использования</span>}
          lead="Рекомендации адресованы прежде всего студентам, но могут быть полезны преподавателям, кураторам и родителям. Каждая сопровождается конкретной практикой."
        />

        <ol className="mt-20">
          {RECOMMENDATIONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal
                as="li"
                key={r.number}
                delay={0.03 * i}
                className="group grid gap-6 border-t border-line py-10 transition-colors last:border-b md:grid-cols-12 md:gap-10"
              >
                <div className="flex items-start gap-5 md:col-span-5">
                  <span className="font-serif text-6xl leading-none text-line-strong transition-colors duration-500 group-hover:text-accent sm:text-7xl">
                    {r.number}
                  </span>
                  <h3 className="pt-2 font-serif text-2xl leading-tight text-fg sm:text-[1.75rem]">{r.title}</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-fg-muted md:col-span-4">
                  <WithCitations text={r.description} />
                </p>
                <div className="md:col-span-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-accent-soft" strokeWidth={1.6} aria-hidden />
                    <span className="eyebrow">На практике</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-fg">{r.practice}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}

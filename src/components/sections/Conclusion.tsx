import { MonitorPlay, Printer } from 'lucide-react';
import { FINAL_STATEMENT, FINDINGS, PERSONAL, SUMMARY } from '../../data/conclusion';
import { PROJECT } from '../../data/navigation';
import { usePresentation } from '../../hooks/usePresentation';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function Conclusion() {
  const { open } = usePresentation();
  return (
    <Section id="conclusion" labelledBy="conclusion-title" tone="raised" className="overflow-hidden">
      <div aria-hidden className="print-hide-media pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />
      <div className="container-edit relative">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-accent-soft">07</span>
            <span className="h-px w-10 bg-line-strong" aria-hidden />
            <span className="eyebrow" id="conclusion-title">Глава седьмая · Заключение</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <blockquote className="mt-12 max-w-5xl">
            <p className="font-serif text-[clamp(2rem,5.2vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.02em] text-fg text-balance">
              <span className="text-accent-soft">«</span>
              {FINAL_STATEMENT}
              <span className="text-accent-soft">»</span>
            </p>
          </blockquote>
        </Reveal>

        <div className="mt-24 grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h3 className="eyebrow text-accent-soft">Итоги исследования</h3>
          </Reveal>
          <Reveal delay={0.05} className="prose-edit lg:col-span-9">
            {SUMMARY.map((p) => (
              <p key={p} className="text-[17px]">{p}</p>
            ))}
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h3 className="eyebrow text-accent-soft">Основные выводы</h3>
          </Reveal>
          <ol className="lg:col-span-9">
            {FINDINGS.map((f, i) => (
              <Reveal as="li" key={f} delay={i * 0.04} className="flex gap-6 border-b border-line py-5 last:border-0">
                <span className="font-serif text-2xl text-fg-subtle tabular-nums">{i + 1}</span>
                <p className="pt-1 text-[16px] leading-relaxed text-fg">{f}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-16 grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h3 className="eyebrow text-accent-soft">Личный вывод автора</h3>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-9">
            <div className="rounded-2xl border border-line bg-surface p-7 sm:p-10">
              {PERSONAL.map((p) => (
                <p key={p} className="font-serif text-lg italic leading-relaxed text-fg-muted first:mt-0 sm:text-xl [&+&]:mt-5">
                  {p}
                </p>
              ))}
              <p className="mt-8 text-sm text-fg">— {PROJECT.authorRu}</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-24 flex flex-col items-start justify-between gap-8 rounded-2xl border border-line bg-ink-950 p-8 sm:p-12 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Спасибо за внимание</p>
            <p className="mt-4 font-serif text-4xl text-fg sm:text-5xl">Благодарю за внимание!</p>
            <p className="mt-3 max-w-lg text-fg-muted">
              Буду рад вопросам и обсуждению. Отдельная благодарность всем, кто примет участие в опросе.
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-3">
            <Button onClick={() => window.print()} icon={<Printer className="h-4 w-4" />}>
              Сохранить в PDF
            </Button>
            <Button variant="primary" onClick={() => open(0)} icon={<MonitorPlay className="h-4 w-4" />}>
              Режим презентации
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

import { GOAL, METHODS, OBJECT_SUBJECT, RELEVANCE, TASKS } from '../../data/research';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export function Overview() {
  return (
    <Section id="overview" labelledBy="overview-title">
      <div className="container-edit">
        <SectionHeader
          eyebrow="Введение · Research overview"
          title={<span id="overview-title">Почему цифровая среда стала новым агентом социализации</span>}
          lead="Введение определяет рамки работы: актуальность темы, цель и задачи, объект и предмет, а также использованные методы."
        />

        {/* Relevance — editorial two-column with drop cap */}
        <div className="mt-20 grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h3 className="eyebrow text-accent-soft">Актуальность темы</h3>
          </Reveal>
          <Reveal delay={0.05} className="prose-edit lg:col-span-9 lg:columns-2 lg:gap-12">
            {RELEVANCE.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'text-[17px] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-fg'
                    : 'text-[17px]'
                }
              >
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Goal — pull statement */}
        <div className="mt-20 grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h3 className="eyebrow text-accent-soft">Цель исследования</h3>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-9">
            <p className="font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] leading-snug tracking-[-0.01em] text-fg text-pretty">{GOAL}</p>
          </Reveal>
        </div>

        {/* Tasks — numbered index */}
        <div className="mt-20 grid gap-12 border-t border-line pt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <h3 className="eyebrow text-accent-soft">Задачи исследования</h3>
            <p className="mt-4 max-w-[16rem] text-sm text-fg-subtle">Семь задач последовательно раскрываются в главах 01–07.</p>
          </Reveal>
          <ol className="grid gap-x-12 sm:grid-cols-2 lg:col-span-9">
            {TASKS.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 0.04} className="flex gap-5 border-b border-line py-5">
                <span className="font-mono text-xs text-fg-subtle tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[15px] leading-relaxed text-fg-muted">{t}</span>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Object & subject + methods */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {OBJECT_SUBJECT.map((item) => (
            <Reveal key={item.title} className="bg-ink-950 p-8 sm:p-10">
              <h3 className="eyebrow text-accent-soft">{item.title}</h3>
              <p className="mt-5 font-serif text-xl leading-snug text-fg sm:text-2xl">{item.text}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {METHODS.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06}>
              <p className="eyebrow">Метод {String(i + 1).padStart(2, '0')}</p>
              <p className="mt-3 font-medium text-fg">{m.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-subtle">{m.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 rounded-xl border border-line bg-surface/50 px-6 py-5 text-sm leading-relaxed text-fg-muted">
          <span className="font-medium text-fg">Как читать работу.</span> Главы 01–05 — теоретическая часть, основанная на научной литературе
          (ссылки в квадратных скобках ведут к списку источников). Глава 06 — собственная эмпирическая часть автора: инструмент опроса и
          визуализация ответов. Теоретические положения и данные опроса в работе последовательно разделены.
        </Reveal>
      </div>
    </Section>
  );
}

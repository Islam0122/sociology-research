import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { NEGATIVE_TOPICS } from '../../data/chapters';
import { IMAGES } from '../../data/images';
import { cn } from '../../utils/cn';
import { Section } from '../layout/Section';
import { WithCitations } from '../ui/Cite';
import { Reveal } from '../ui/Reveal';
import { SmartImage } from '../ui/SmartImage';

export function ChapterNegative() {
  const [activeId, setActiveId] = useState(NEGATIVE_TOPICS[0]?.id ?? '');
  const active = NEGATIVE_TOPICS.find((t) => t.id === activeId) ?? NEGATIVE_TOPICS[0];

  return (
    <Section id="chapter-3" labelledBy="ch3-title" tone="contrast" className="overflow-hidden">
      {/* Contrasting atmosphere */}
      <div aria-hidden className="print-hide-media pointer-events-none absolute inset-x-0 top-0 h-[42rem]">
        <SmartImage asset={IMAGES.night} className="h-full w-full opacity-30" graded={false} imgClassName="grayscale" showCredit={false} decorative />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,15,0.4),#0a0a0f_85%)]" />
      </div>

      <div className="container-edit relative">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-danger">03</span>
            <span className="h-px w-10 bg-danger/40" aria-hidden />
            <span className="eyebrow">Глава третья · Риски</span>
          </div>
          <h2 id="ch3-title" className="mt-6 max-w-4xl font-serif text-[clamp(2.2rem,5.6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg text-balance">
            Отрицательное влияние: <span className="italic text-fg-muted">обратная сторона ленты</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted">
            Те же механизмы, которые делают платформы удобными, — персонализация, мгновенная обратная связь, бесконечный контент — при
            бесконтрольном использовании оборачиваются рисками для психики, внимания и картины мира. Важно учитывать, что научные выводы о
            масштабе этих эффектов остаются предметом дискуссии <WithCitations text="[8, 9]" />.
          </p>
        </Reveal>

        {/* Interactive explorer */}
        <div className="mt-20 grid gap-8 lg:grid-cols-12">
          <div role="tablist" aria-label="Риски социальных сетей" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
            {NEGATIVE_TOPICS.map((t, i) => {
              const Icon = t.icon;
              const on = t.id === activeId;
              return (
                <button
                  key={t.id}
                  role="tab"
                  type="button"
                  id={`neg-tab-${t.id}`}
                  aria-selected={on}
                  aria-controls={`neg-panel-${t.id}`}
                  onClick={() => setActiveId(t.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors lg:px-5 lg:py-4',
                    on ? 'border-danger/40 bg-danger/[0.07] text-fg' : 'border-line text-fg-subtle hover:border-line-strong hover:text-fg',
                  )}
                >
                  <span className="font-mono text-[11px]">3.{i + 1}</span>
                  <Icon className={cn('h-4 w-4', on ? 'text-danger' : '')} strokeWidth={1.6} aria-hidden />
                  <span className="whitespace-nowrap text-sm font-medium lg:whitespace-normal">{t.title}</span>
                </button>
              );
            })}
          </div>

          <div className="min-h-[24rem] lg:col-span-8">
            <AnimatePresence mode="wait">
              {active && (
                <motion.div
                  key={active.id}
                  role="tabpanel"
                  id={`neg-panel-${active.id}`}
                  aria-labelledby={`neg-tab-${active.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-line bg-[#0f0f16] p-7 sm:p-10"
                >
                  <h3 className="font-serif text-3xl text-fg sm:text-4xl">{active.title}</h3>
                  <dl className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <dt className="eyebrow text-warn">Причины</dt>
                      <dd className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                        <WithCitations text={active.causes} />
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-danger">Последствия</dt>
                      <dd className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                        <WithCitations text={active.consequences} />
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-8 rounded-xl border border-line bg-black/30 p-5">
                    <p className="eyebrow">Жизненная ситуация</p>
                    <p className="mt-2 font-serif text-lg italic leading-snug text-fg">{active.example}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Print version: all topics listed */}
        <div className="hidden print:block">
          {NEGATIVE_TOPICS.filter((t) => t.id !== activeId).map((t) => (
            <div key={t.id} className="mt-6">
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm">Причины: {t.causes}</p>
              <p className="mt-1 text-sm">Последствия: {t.consequences}</p>
              <p className="mt-1 text-sm italic">Пример: {t.example}</p>
            </div>
          ))}
        </div>

        <Reveal className="mt-16 grid gap-6 border-t border-line pt-10 md:grid-cols-3">
          {[
            ['Механизм', 'Алгоритмы оптимизируют платформы под удержание внимания, а не под благополучие пользователя.'],
            ['Уязвимость', 'Молодые люди, находящиеся в процессе формирования идентичности, особенно чувствительны к оценке окружающих.'],
            ['Вывод', 'Проблема заключается не в технологии как таковой, а в характере и мере её использования.'],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="eyebrow">{k}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{v}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

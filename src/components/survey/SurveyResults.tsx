import { BarChart3, Table2 } from 'lucide-react';
import { lazy, Suspense, useState } from 'react';
import { SURVEY_QUESTIONS } from '../../data/survey';
import type { SurveyCounts } from '../../types';
import { cn } from '../../utils/cn';
import { distribution, formatPercent } from '../../utils/survey';
import { ErrorBoundary } from '../ui/ErrorBoundary';

const DistributionChart = lazy(() => import('../charts/DistributionChart').then((m) => ({ default: m.DistributionChart })));

interface SurveyResultsProps {
  counts: SurveyCounts;
  total: number;
}

export function SurveyResults({ counts, total }: SurveyResultsProps) {
  const [view, setView] = useState<'chart' | 'table'>('chart');

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-fg-subtle">Распределение ответов по каждому вопросу, % от числа ответивших.</p>
        <div role="group" aria-label="Вид отображения" className="inline-flex rounded-full border border-line p-0.5">
          {(
            [
              ['chart', 'График', BarChart3],
              ['table', 'Таблица', Table2],
            ] as const
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              onClick={() => setView(key)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors',
                view === key ? 'bg-white/10 text-fg' : 'text-fg-subtle hover:text-fg',
              )}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {label}
            </button>
          ))}
        </div>
      </div>

      {total === 0 ? (
        <div className="mt-6 grid min-h-[16rem] place-items-center rounded-2xl border border-dashed border-line-strong p-8 text-center">
          <div>
            <p className="font-serif text-2xl text-fg">Пока нет ни одного ответа</p>
            <p className="mt-2 max-w-sm text-sm text-fg-subtle">
              Заполните анкету — и здесь появятся графики распределения ответов. Никакие результаты заранее не подставляются.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
          {SURVEY_QUESTIONS.map((q) => {
            const rows = distribution(q, counts);
            const answered = rows.reduce((a, r) => a + r.count, 0);
            return (
              <article key={q.id} className="rounded-2xl border border-line bg-ink-950 p-5 sm:p-6" aria-labelledby={`res-${q.id}`}>
                <p className="font-mono text-[11px] text-fg-subtle">Вопрос {q.number}</p>
                <h4 id={`res-${q.id}`} className="mt-1.5 text-[15px] font-medium leading-snug text-fg">
                  {q.text}
                </h4>
                <div className="mt-5">
                  {view === 'chart' ? (
                    <ErrorBoundary label="График не удалось построить.">
                      <Suspense fallback={<div className="skeleton h-40 rounded-lg" aria-label="Загрузка графика" />}>
                        <DistributionChart rows={rows} compact />
                      </Suspense>
                    </ErrorBoundary>
                  ) : (
                    <table className="w-full text-sm">
                      <caption className="sr-only">{q.text}</caption>
                      <thead>
                        <tr className="border-b border-line text-left text-fg-subtle">
                          <th scope="col" className="py-2 font-normal">Вариант</th>
                          <th scope="col" className="py-2 text-right font-normal">Ответов</th>
                          <th scope="col" className="py-2 text-right font-normal">Доля</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.optionId} className="border-b border-line/60">
                            <th scope="row" className="py-2 text-left font-normal text-fg-muted">{r.label}</th>
                            <td className="py-2 text-right text-fg tabular-nums">{r.count}</td>
                            <td className="py-2 text-right text-fg tabular-nums">{formatPercent(r.percent)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <p className="mt-3 text-[11px] text-fg-subtle">Ответили: {answered}</p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

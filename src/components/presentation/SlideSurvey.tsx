import { lazy, Suspense } from 'react';
import { PUBLISHED_SURVEY, SURVEY_QUESTIONS } from '../../data/survey';
import { useSurvey } from '../../hooks/useSurvey';
import { distribution } from '../../utils/survey';

const DistributionChart = lazy(() => import('../charts/DistributionChart').then((m) => ({ default: m.DistributionChart })));

export function SlideSurvey() {
  const survey = useSurvey();
  const counts = PUBLISHED_SURVEY?.counts ?? survey.counts;
  const total = PUBLISHED_SURVEY?.totalRespondents ?? survey.responses.length;

  return (
    <div>
      <p className="text-sm text-fg-subtle">
        {PUBLISHED_SURVEY
          ? `${PUBLISHED_SURVEY.title}, ${PUBLISHED_SURVEY.conductedAt}. Ответов: ${total}.`
          : `Демонстрационные локальные данные, нерепрезентативная выборка. Ответов: ${total}.`}
      </p>
      {total === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line-strong p-10">
          <p className="font-serif text-2xl text-fg">Ответов пока нет</p>
          <p className="mt-2 text-fg-muted">Анкета доступна на сайте в разделе 06 — результаты появятся здесь автоматически.</p>
          <ul className="mt-6 grid gap-2 text-fg-muted">
            {SURVEY_QUESTIONS.map((q) => (
              <li key={q.id}>
                {q.number}. {q.text}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
          {SURVEY_QUESTIONS.map((q) => (
            <div key={q.id}>
              <p className="mb-2 text-sm font-medium text-fg">
                {q.number}. {q.shortLabel}
              </p>
              <Suspense fallback={<div className="skeleton h-32 rounded-lg" />}>
                <DistributionChart rows={distribution(q, counts)} compact />
              </Suspense>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

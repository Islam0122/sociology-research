import { FlaskConical, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { PUBLISHED_SURVEY } from '../../data/survey';
import { useSurvey } from '../../hooks/useSurvey';
import { cn } from '../../utils/cn';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Spinner } from '../ui/Spinner';
import { SurveyDataTools } from './SurveyDataTools';
import { SurveyForm } from './SurveyForm';
import { SurveyResults } from './SurveyResults';

type Source = 'local' | 'published';

export function SurveySection() {
  const survey = useSurvey();
  const [source, setSource] = useState<Source>(PUBLISHED_SURVEY ? 'published' : 'local');
  const published = source === 'published' ? PUBLISHED_SURVEY : null;
  const counts = published ? published.counts : survey.counts;
  const total = published ? published.totalRespondents : survey.responses.length;

  return (
    <Section id="survey" labelledBy="survey-title">
      <div className="container-edit">
        <SectionHeader
          index="06"
          eyebrow="Глава шестая · Эмпирическая часть"
          title={<span id="survey-title">Результаты исследования: интерактивный опрос студентов</span>}
          lead="Эта глава — собственная часть работы автора. Анкета из четырёх вопросов позволяет собрать ответы прямо на сайте и сразу увидеть их распределение."
        />

        {/* Honesty notice */}
        <Reveal className="mt-14 flex gap-4 rounded-2xl border border-warn/30 bg-warn/[0.06] p-5 sm:p-6" role="note">
          <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-warn" aria-hidden />
          <div className="text-sm leading-relaxed text-fg-muted">
            <p className="font-medium text-fg">Демонстрационный локальный опрос</p>
            <p className="mt-1">
              Ответы сохраняются только в памяти этого браузера (localStorage) и никуда не отправляются. Собранные таким образом данные{' '}
              <strong className="font-medium text-fg">не являются репрезентативной научной выборкой</strong> и не могут переноситься на всю
              молодёжь. Сайт не содержит заранее подставленных результатов.
              {PUBLISHED_SURVEY === null && ' Итоги реального опроса автор добавит после его проведения.'}
            </p>
          </div>
        </Reveal>

        {PUBLISHED_SURVEY && (
          <div role="group" aria-label="Источник данных" className="no-print mt-8 inline-flex rounded-full border border-line p-1">
            {(
              [
                ['published', 'Результаты опроса автора'],
                ['local', 'Локальные ответы'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={source === key}
                onClick={() => setSource(key)}
                className={cn('rounded-full px-4 py-1.5 text-xs', source === key ? 'bg-white/10 text-fg' : 'text-fg-subtle hover:text-fg')}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {survey.status === 'loading' && <Spinner label="Загрузка ответов" />}

        {survey.status === 'error' && (
          <div role="alert" className="mt-10 rounded-2xl border border-danger/30 bg-danger/5 p-6">
            <p className="font-medium text-fg">Не удалось загрузить данные опроса</p>
            <p className="mt-1 text-sm text-fg-muted">{survey.error}</p>
            <Button className="mt-4" size="sm" variant="danger" onClick={survey.reset}>
              Очистить повреждённые данные
            </Button>
          </div>
        )}

        {survey.status === 'ready' && (
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="no-print space-y-6 lg:col-span-5">
              <SurveyForm onSubmit={survey.submit} />
              <SurveyDataTools responses={survey.responses} onReset={survey.reset} onImport={survey.importResponses} />
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                <div className="bg-surface p-5 sm:p-6">
                  <p className="eyebrow">Всего ответов</p>
                  <p className="mt-2 font-serif text-5xl text-fg tabular-nums" aria-live="polite">
                    {total}
                  </p>
                </div>
                <div className="bg-surface p-5 sm:p-6">
                  <p className="eyebrow">Источник</p>
                  <p className="mt-3 text-sm text-fg">{published ? published.title : 'Локальный (демо)'}</p>
                </div>
                <div className="col-span-2 bg-surface p-5 sm:col-span-1 sm:p-6">
                  <p className="eyebrow">Статус</p>
                  <p className="mt-3 flex items-center gap-2 text-sm text-fg">
                    <ShieldCheck className="h-4 w-4 text-accent-soft" aria-hidden />
                    {published ? published.conductedAt : 'Нерепрезентативно'}
                  </p>
                </div>
              </div>
              {published && <p className="mt-3 text-xs text-fg-subtle">Выборка: {published.sampleDescription}</p>}
              <div className="mt-8">
                <SurveyResults counts={counts} total={total} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

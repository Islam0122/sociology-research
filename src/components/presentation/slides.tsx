import type { ReactNode } from 'react';
import { NEGATIVE_TOPICS, POSITIVE_TOPICS, SOCIAL_FUNCTIONS, KG_TOPICS, CH1_DEFINITION } from '../../data/chapters';
import { FINAL_STATEMENT, FINDINGS } from '../../data/conclusion';
import { IMAGES } from '../../data/images';
import { PROJECT } from '../../data/navigation';
import { GOAL, OBJECT_SUBJECT, TASKS } from '../../data/research';
import { RECOMMENDATIONS } from '../../data/solutions';
import type { Slide } from '../../types';
import { SmartImage } from '../ui/SmartImage';
import { SlideSurvey } from './SlideSurvey';

export interface SlideDefinition extends Slide {
  render: () => ReactNode;
}

const List = ({ items }: { items: string[] }) => (
  <ul className="grid gap-3">
    {items.map((t, i) => (
      <li key={t} className="flex gap-4 text-[clamp(0.95rem,1.5vw,1.25rem)] leading-snug text-fg-muted">
        <span className="pt-1 font-mono text-[0.7em] text-accent-soft">{String(i + 1).padStart(2, '0')}</span>
        {t}
      </li>
    ))}
  </ul>
);

const Grid = ({ items }: { items: { title: string; text: string }[] }) => (
  <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
    {items.map((it) => (
      <div key={it.title} className="bg-ink-950 p-[clamp(1rem,2vw,1.75rem)]">
        <p className="text-[clamp(1rem,1.6vw,1.35rem)] font-medium text-fg">{it.title}</p>
        <p className="mt-1.5 text-[clamp(0.85rem,1.2vw,1rem)] leading-snug text-fg-muted">{it.text}</p>
      </div>
    ))}
  </div>
);

const stripCites = (s: string) => s.replace(/\s?\[\d+(?:,\s*\d+)*\]/g, '');

export const SLIDES: SlideDefinition[] = [
  {
    id: 'title',
    kicker: PROJECT.meta.join(' / '),
    title: PROJECT.title,
    notes: 'Представиться, назвать тему и дисциплину. Одной фразой: как цифровая среда формирует поведение и ценности молодёжи.',
    render: () => (
      <div className="grid h-full gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="text-[clamp(1.05rem,1.8vw,1.5rem)] leading-relaxed text-fg-muted">{PROJECT.lead}</p>
          <p className="mt-4 italic text-fg-subtle">{PROJECT.subtitleEn}</p>
          <p className="mt-10 font-mono text-sm tracking-widest text-fg">{PROJECT.author.toUpperCase()}</p>
        </div>
        <SmartImage asset={IMAGES.hero} className="hidden aspect-[4/3] rounded-2xl border border-line lg:col-span-5 lg:block" />
      </div>
    ),
  },
  {
    id: 'relevance',
    kicker: 'Введение',
    title: 'Актуальность и цель',
    notes: 'Объяснить, почему соцсети — новый агент социализации. Зачитать цель исследования.',
    render: () => (
      <div className="grid gap-10 lg:grid-cols-2">
        <p className="font-serif text-[clamp(1.3rem,2.4vw,2.1rem)] leading-snug text-fg">{GOAL}</p>
        <Grid items={OBJECT_SUBJECT} />
      </div>
    ),
  },
  {
    id: 'tasks',
    kicker: 'Введение',
    title: 'Задачи исследования',
    notes: 'Кратко перечислить задачи — они соответствуют главам работы.',
    render: () => <List items={TASKS} />,
  },
  {
    id: 'ch1',
    kicker: 'Глава 01',
    title: 'Понятие и роль социальных сетей',
    notes: 'Дать определение. Подчеркнуть: соцсети — социальный институт и среда с алгоритмами. Назвать шесть функций.',
    render: () => (
      <div className="grid gap-8 lg:grid-cols-12">
        <p className="font-serif text-[clamp(1.15rem,2vw,1.75rem)] leading-snug text-fg lg:col-span-5">
          <span className="text-accent-soft">{CH1_DEFINITION.term}</span> — {CH1_DEFINITION.definition}
        </p>
        <div className="grid grid-cols-2 gap-3 lg:col-span-7">
          {SOCIAL_FUNCTIONS.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3">
                <Icon className="h-5 w-5 shrink-0 text-accent-soft" strokeWidth={1.5} aria-hidden />
                <span className="text-[clamp(0.9rem,1.3vw,1.1rem)] text-fg">{f.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
  {
    id: 'ch2',
    kicker: 'Глава 02',
    title: 'Положительное влияние',
    notes: 'Привести пример из студенческой жизни: обучение по открытым курсам, портфолио IT-специалиста.',
    render: () => <Grid items={POSITIVE_TOPICS.map((t) => ({ title: t.title, text: t.lead }))} />,
  },
  {
    id: 'ch3',
    kicker: 'Глава 03',
    title: 'Отрицательное влияние',
    notes: 'Причины → последствия. Отметить, что масштаб эффектов в науке обсуждается.',
    render: () => (
      <div className="grid gap-3">
        {NEGATIVE_TOPICS.map((t) => (
          <div key={t.id} className="grid gap-1 border-b border-line pb-3 sm:grid-cols-[16rem_1fr] sm:gap-6">
            <p className="text-[clamp(1rem,1.5vw,1.3rem)] font-medium text-fg">{t.title}</p>
            <p className="text-[clamp(0.85rem,1.15vw,1rem)] leading-snug text-fg-muted">{stripCites(t.consequences)}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'ch4',
    kicker: 'Глава 04',
    title: 'Социальные сети и молодежь Кыргызстана',
    notes: 'Соцсети как инфраструктура учёбы, работы и бизнеса. Подчеркнуть: национальная статистика сознательно не приводится без проверенных источников.',
    render: () => <Grid items={KG_TOPICS.map((t) => ({ title: t.title, text: t.text }))} />,
  },
  {
    id: 'solutions',
    kicker: 'Глава 05',
    title: 'Семь рекомендаций',
    notes: 'Назвать рекомендации и одну практику, которой пользуетесь сами.',
    render: () => (
      <ol className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
        {RECOMMENDATIONS.map((r) => (
          <li key={r.number} className="flex items-baseline gap-4 border-b border-line pb-3">
            <span className="font-serif text-[clamp(1.4rem,2.2vw,2rem)] text-accent-soft">{r.number}</span>
            <span className="text-[clamp(0.95rem,1.4vw,1.2rem)] text-fg">{r.title}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: 'survey',
    kicker: 'Глава 06 · Эмпирическая часть',
    title: 'Интерактивный опрос студентов',
    notes: 'Пояснить: опрос демонстрационный, данные локальные и нерепрезентативные. Можно предложить аудитории ответить прямо сейчас.',
    render: () => <SlideSurvey />,
  },
  {
    id: 'conclusion',
    kicker: 'Глава 07 · Заключение',
    title: 'Основные выводы',
    notes: 'Зачитать 2–3 главных вывода и финальную мысль.',
    render: () => <List items={FINDINGS} />,
  },
  {
    id: 'final',
    kicker: 'Спасибо за внимание',
    title: '',
    notes: 'Финальная мысль. Поблагодарить и перейти к вопросам.',
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <p className="font-serif text-[clamp(1.8rem,4.4vw,4rem)] font-medium leading-[1.1] tracking-[-0.02em] text-fg text-balance">
          <span className="text-accent-soft">«</span>
          {FINAL_STATEMENT}
          <span className="text-accent-soft">»</span>
        </p>
        <p className="mt-10 font-mono text-sm tracking-widest text-fg-subtle">
          {PROJECT.author.toUpperCase()} · SOCIOLOGY · {PROJECT.year}
        </p>
      </div>
    ),
  },
];

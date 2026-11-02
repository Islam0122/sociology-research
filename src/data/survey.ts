import type { PublishedSurvey, SurveyQuestion } from '../types';

export const SURVEY_STORAGE_KEY = 'srs-social-media-survey:v1';

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'hours',
    number: 1,
    text: 'Сколько часов в день вы проводите в социальных сетях?',
    shortLabel: 'Время в соцсетях',
    options: [
      { id: 'lt1', label: 'Менее 1 часа' },
      { id: '1-3', label: '1–3 часа' },
      { id: '3-5', label: '3–5 часов' },
      { id: 'gt5', label: 'Более 5 часов' },
    ],
  },
  {
    id: 'platform',
    number: 2,
    text: 'Какую социальную сеть вы используете чаще всего?',
    shortLabel: 'Основная платформа',
    options: [
      { id: 'instagram', label: 'Instagram' },
      { id: 'tiktok', label: 'TikTok' },
      { id: 'telegram', label: 'Telegram' },
      { id: 'youtube', label: 'YouTube' },
      { id: 'other', label: 'Другая' },
    ],
  },
  {
    id: 'mood',
    number: 3,
    text: 'Влияют ли социальные сети на ваше настроение?',
    shortLabel: 'Влияние на настроение',
    options: [
      { id: 'strong', label: 'Да, заметно' },
      { id: 'some', label: 'Иногда' },
      { id: 'none', label: 'Нет, не влияют' },
      { id: 'unsure', label: 'Затрудняюсь ответить' },
    ],
  },
  {
    id: 'learning',
    number: 4,
    text: 'Используете ли вы социальные сети для обучения?',
    shortLabel: 'Соцсети для обучения',
    options: [
      { id: 'regular', label: 'Да, регулярно' },
      { id: 'sometimes', label: 'Иногда' },
      { id: 'rarely', label: 'Редко' },
      { id: 'never', label: 'Нет' },
    ],
  },
];

/**
 * РЕЗУЛЬТАТЫ РЕАЛЬНОГО ОПРОСА.
 *
 * Пока опрос не проведён, значение равно `null`, и сайт показывает только
 * локальные демонстрационные ответы. После проведения опроса замените `null`
 * объектом вида:
 *
 * export const PUBLISHED_SURVEY: PublishedSurvey | null = {
 *   title: 'Опрос студентов 1–2 курса',
 *   conductedAt: 'Ноябрь 2026',
 *   sampleDescription: 'Студенты факультета …, онлайн-анкета',
 *   totalRespondents: 40,
 *   counts: {
 *     hours:    { lt1: 0, '1-3': 0, '3-5': 0, gt5: 0 },
 *     platform: { instagram: 0, tiktok: 0, telegram: 0, youtube: 0, other: 0 },
 *     mood:     { strong: 0, some: 0, none: 0, unsure: 0 },
 *     learning: { regular: 0, sometimes: 0, rarely: 0, never: 0 },
 *   },
 * };
 *
 * Готовый объект можно получить кнопкой «Экспорт для публикации» в разделе 06.
 */
export const PUBLISHED_SURVEY: PublishedSurvey | null = null;

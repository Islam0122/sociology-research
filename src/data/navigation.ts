import type { ChapterMeta, NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Введение', target: 'overview', covers: ['overview', 'contents'] },
  { label: 'Исследование', target: 'chapter-1', covers: ['chapter-1'] },
  { label: 'Влияние', target: 'chapter-2', covers: ['chapter-2', 'chapter-3', 'chapter-4'] },
  { label: 'Решения', target: 'solutions', covers: ['solutions'] },
  { label: 'Статистика', target: 'survey', covers: ['survey'] },
  { label: 'Заключение', target: 'conclusion', covers: ['conclusion', 'references'] },
];

export const CHAPTERS: ChapterMeta[] = [
  {
    number: '01',
    title: 'Понятие и роль социальных сетей',
    summary: 'Определение, социальная природа и функции цифровых платформ.',
    target: 'chapter-1',
  },
  {
    number: '02',
    title: 'Положительное влияние',
    summary: 'Образование, коммуникация, карьера и гражданская активность.',
    target: 'chapter-2',
  },
  {
    number: '03',
    title: 'Отрицательное влияние',
    summary: 'Зависимость, давление, дезинформация, кибербуллинг, внимание.',
    target: 'chapter-3',
  },
  {
    number: '04',
    title: 'Социальные сети в Кыргызстане',
    summary: 'Цифровое образование, занятость, многоязычие и участие молодежи.',
    target: 'chapter-4',
  },
  {
    number: '05',
    title: 'Пути решения проблем',
    summary: 'Семь практических рекомендаций для осознанного использования.',
    target: 'solutions',
  },
  {
    number: '06',
    title: 'Результаты исследования',
    summary: 'Интерактивный опрос студентов и визуализация ответов.',
    target: 'survey',
  },
  {
    number: '07',
    title: 'Заключение',
    summary: 'Итоги, основные выводы и личная позиция автора.',
    target: 'conclusion',
  },
];

export const PROJECT = {
  title: 'Влияние социальных сетей на поведение и мировоззрение молодежи',
  subtitleEn: 'The Impact of Social Media on Youth Behavior and Worldview',
  lead: 'Исследование роли цифровой среды в формировании личности, ценностей и социальных отношений современного поколения.',
  author: 'Islam Duishobaev',
  authorRu: 'Ислам Дуйшобаев',
  subject: 'Социология',
  type: 'Индивидуальная самостоятельная работа студента (СРС)',
  year: 2026,
  meta: ['SOCIOLOGY', 'INDIVIDUAL RESEARCH', '2026'],
} as const;

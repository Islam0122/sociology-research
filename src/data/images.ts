import type { ImageAsset } from '../types';

/**
 * Photographic assets.
 *
 * Each asset lists several sources: the first one that loads is shown.
 * To use your own photos (for example, your own shots of Bishkek), put files
 * into `public/images/` and add `/images/<file>.jpg` as the FIRST source.
 */
const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const IMAGES = {
  hero: {
    sources: ['/images/hero.jpg', unsplash('1529156069898-49953e39b3ac', 2200), unsplash('1511707171634-5f897ff02aa9', 2200)],
    alt: 'Группа молодых людей проводит время вместе — фотография, тонированная в тёмно-синюю гамму',
    credit: 'Фото: Unsplash',
  },
  phone: {
    sources: ['/images/phone.jpg', unsplash('1511707171634-5f897ff02aa9', 1400), unsplash('1512941937669-90a1b58e7e9c', 1400)],
    alt: 'Смартфон в руке — главный инструмент доступа к социальным сетям',
    credit: 'Фото: Unsplash',
  },
  students: {
    sources: ['/images/students.jpg', unsplash('1522202176988-66273c2fd55f', 1400), unsplash('1523240795612-9a054b0db644', 1400)],
    alt: 'Студенты совместно работают за ноутбуками',
    credit: 'Фото: Unsplash',
  },
  learning: {
    sources: ['/images/learning.jpg', unsplash('1516321318423-f06f85e504b3', 1400), unsplash('1515378791036-0648a3ef77b2', 1400)],
    alt: 'Онлайн-обучение: человек участвует в видеозанятии',
    credit: 'Фото: Unsplash',
  },
  coding: {
    sources: ['/images/coding.jpg', unsplash('1573164713988-8665fc963095', 1400), unsplash('1498050108023-c5249f4df085', 1400)],
    alt: 'Молодой специалист работает с кодом за ноутбуком',
    credit: 'Фото: Unsplash',
  },
  night: {
    sources: ['/images/night-scroll.jpg', unsplash('1512941937669-90a1b58e7e9c', 1400), unsplash('1511707171634-5f897ff02aa9', 1400)],
    alt: 'Экран смартфона в темноте — символ бесконечной ленты',
    credit: 'Фото: Unsplash',
  },
  news: {
    sources: ['/images/news.jpg', unsplash('1504711434969-e33886168f5c', 1400), unsplash('1495020689067-958852a7765e', 1400)],
    alt: 'Газеты и новостные материалы — тема проверки информации',
    credit: 'Фото: Unsplash',
  },
  bishkek: {
    sources: ['/images/bishkek.jpg', unsplash('1531545514256-b1400bc00f31', 1800), unsplash('1556761175-b413da4baf72', 1800)],
    alt: 'Молодые люди в современной рабочей среде. Замените на собственную фотографию Бишкека: public/images/bishkek.jpg',
    credit: 'Иллюстративное фото: Unsplash',
  },
  team: {
    sources: ['/images/team.jpg', unsplash('1556761175-b413da4baf72', 1400), unsplash('1517245386807-bb43f82c33c4', 1400)],
    alt: 'Команда молодых специалистов обсуждает проект',
    credit: 'Фото: Unsplash',
  },
} satisfies Record<string, ImageAsset>;

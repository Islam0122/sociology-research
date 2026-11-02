# Влияние социальных сетей на поведение и мировоззрение молодежи

Интерактивное исследование (СРС) по социологии · Islam Duishobaev · 2026
React · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · Recharts · Lucide

## Запуск

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production-сборка в dist/
npm run preview    # просмотр сборки
```

## Структура

```
src/
  components/
    layout/        Section, Footer, ScrollProgress, BackToTop
    navigation/    Navbar (активный раздел, мобильное меню)
    sections/      Hero, Overview, Contents, главы 01–05, Conclusion, References
    survey/        анкета, результаты, инструменты экспорта/импорта
    charts/        DistributionChart (Recharts, загружается лениво)
    presentation/  режим презентации + слайды
    ui/            Reveal, SmartImage, Button, ErrorBoundary, Cite, Spinner
  data/            весь текст: navigation, research, chapters, solutions,
                   conclusion, references, survey, images
  hooks/ utils/ types/ pages/ styles/
```

Весь текст работы лежит в `src/data/*`: его можно править без изменения компонентов.

## Как обновить результаты опроса

1. Соберите ответы в разделе 06 (данные хранятся в localStorage браузера).
   Ответы с разных устройств можно объединить через «JSON» → «Импорт JSON».
2. Нажмите «Экспорт для публикации», и скачается готовый фрагмент кода.
3. Вставьте его вместо `export const PUBLISHED_SURVEY ... = null;` в `src/data/survey.ts`
   и укажите описание выборки. Сайт покажет переключатель «Результаты опроса автора / Локальные ответы».

## Фотографии

Фотографии подгружаются с Unsplash (`src/data/images.ts`). Чтобы поставить свои снимки
(например, Бишкека для главы 04), положите файлы в `public/images/`
(`hero.jpg`, `bishkek.jpg`, …). Они используются первыми. Если фото недоступно,
вместо него показывается аккуратная заглушка.

## Презентация

Кнопка «Презентация» в шапке. Управление: ← → / пробел для навигации, Esc для выхода,
N показывает заметки докладчика, F включает полный экран. На телефоне слайды листаются свайпом. 11 слайдов на 5–7 минут.

## PDF

Кнопка с принтером или «Сохранить в PDF» открывает печать браузера с отдельными стилями для печати
(светлый фон, все главы раскрыты, интерактивные элементы скрыты).
# sociology-research

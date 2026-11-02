import { CH1_DEFINITION, CH1_TEXT, PLATFORMS, SOCIAL_FUNCTIONS } from '../../data/chapters';
import { IMAGES } from '../../data/images';
import { Section } from '../layout/Section';
import { WithCitations } from '../ui/Cite';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { SmartImage } from '../ui/SmartImage';

export function ChapterSocialMedia() {
  return (
    <Section id="chapter-1" labelledBy="ch1-title">
      <div className="container-edit">
        <SectionHeader
          index="01"
          eyebrow="Глава первая · Теория"
          title={<span id="ch1-title">Понятие и роль социальных сетей</span>}
          lead="Социальные сети — это одновременно технология, коммуникационная среда и социальный институт, который влияет на то, как люди общаются, узнают новости и понимают себя."
        />

        {/* Definition */}
        <div className="mt-20 grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-surface p-8 sm:p-12 lg:col-span-7">
            <div aria-hidden className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <p className="eyebrow relative">Определение</p>
            <p className="relative mt-6 font-serif text-[clamp(1.25rem,2vw,1.6rem)] leading-snug text-fg">
              <span className="text-accent-soft">{CH1_DEFINITION.term}</span> — {CH1_DEFINITION.definition}
            </p>
            <p className="relative mt-6 text-sm text-fg-subtle">
              <WithCitations text={CH1_DEFINITION.source} />
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <SmartImage asset={IMAGES.phone} className="h-72 rounded-2xl border border-line lg:h-full" />
          </Reveal>
        </div>

        {/* Theory text */}
        <div className="mt-20 grid gap-12 md:grid-cols-3">
          {CH1_TEXT.map((block, i) => (
            <Reveal key={block.title} delay={i * 0.06} className="border-t border-line-strong pt-6">
              <p className="font-mono text-xs text-fg-subtle">1.{i + 1}</p>
              <h3 className="mt-3 text-lg font-medium text-fg">{block.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                <WithCitations text={block.text} />
              </p>
            </Reveal>
          ))}
        </div>

        {/* Functions */}
        <div className="mt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-serif text-3xl text-fg sm:text-4xl">Функции социальных сетей</h3>
            <p className="max-w-sm text-sm text-fg-subtle">Шесть функций, которые платформы выполняют в жизни современного общества.</p>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {SOCIAL_FUNCTIONS.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 3) * 0.06} className="group bg-ink-950 p-7 transition-colors hover:bg-surface sm:p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-accent-soft" strokeWidth={1.5} aria-hidden />
                    <span className="font-mono text-[11px] text-fg-subtle">0{i + 1}</span>
                  </div>
                  <h4 className="mt-8 text-lg font-medium text-fg">{f.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    <WithCitations text={f.description} />
                  </p>
                  <p className="mt-5 border-t border-line pt-4 text-xs text-fg-subtle">
                    <span className="text-fg-muted">Пример:</span> {f.example}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Platforms */}
        <div className="mt-24 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h3 className="font-serif text-3xl text-fg sm:text-4xl">Платформы — разные роли</h3>
            <p className="mt-4 text-sm leading-relaxed text-fg-subtle">
              Каждая платформа формирует собственную культуру общения. Формат контента определяет, какое поведение поощряется: визуальная
              самопрезентация, быстрые тренды или глубокое обучение.
            </p>
          </Reveal>
          <div className="lg:col-span-8">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Примеры платформ и их социальные роли</caption>
              <thead>
                <tr className="border-b border-line-strong text-fg-subtle">
                  <th scope="col" className="eyebrow py-3 pr-4 font-normal">Платформа</th>
                  <th scope="col" className="eyebrow hidden py-3 pr-4 font-normal sm:table-cell">Формат</th>
                  <th scope="col" className="eyebrow py-3 font-normal">Социальная роль</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORMS.map((p) => (
                  <tr key={p.name} className="border-b border-line align-top">
                    <th scope="row" className="py-5 pr-4 font-serif text-xl font-normal text-fg">{p.name}</th>
                    <td className="hidden py-5 pr-4 text-fg-subtle sm:table-cell">{p.format}</td>
                    <td className="py-5 leading-relaxed text-fg-muted">{p.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Section>
  );
}

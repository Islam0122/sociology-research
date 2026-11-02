import { Check } from 'lucide-react';
import { POSITIVE_TOPICS } from '../../data/chapters';
import { IMAGES } from '../../data/images';
import { cn } from '../../utils/cn';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { SmartImage } from '../ui/SmartImage';

const topicImages = [IMAGES.learning, IMAGES.students, IMAGES.coding, IMAGES.team];

export function ChapterPositive() {
  return (
    <Section id="chapter-2" labelledBy="ch2-title" tone="raised">
      <div className="container-edit">
        <SectionHeader
          index="02"
          eyebrow="Глава вторая · Возможности"
          title={<span id="ch2-title">Положительное влияние социальных сетей</span>}
          lead="При осознанном использовании социальные сети расширяют возможности молодого человека: дают доступ к знаниям, помогают строить связи, карьеру и участвовать в жизни общества."
        />

        <div className="mt-20 space-y-24 sm:space-y-32">
          {POSITIVE_TOPICS.map((topic, i) => {
            const Icon = topic.icon;
            const reversed = i % 2 === 1;
            const image = topicImages[i] ?? IMAGES.students;
            return (
              <article key={topic.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16" aria-labelledby={`pos-${topic.id}`}>
                <Reveal className={cn('lg:col-span-6', reversed && 'lg:order-2')}>
                  <SmartImage asset={image} className="aspect-[4/3] rounded-2xl border border-line" />
                </Reveal>
                <Reveal delay={0.1} className={cn('lg:col-span-6', reversed && 'lg:order-1')}>
                  <div className="flex items-center gap-3 text-accent-soft">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                    <span className="font-mono text-xs">2.{i + 1}</span>
                  </div>
                  <h3 id={`pos-${topic.id}`} className="mt-4 font-serif text-3xl leading-tight text-fg sm:text-4xl">
                    {topic.title}
                  </h3>
                  <p className="mt-5 text-[17px] leading-relaxed text-fg-muted">{topic.lead}</p>
                  <ul className="mt-6 space-y-3">
                    {topic.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] text-fg-muted">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 border-l-2 border-accent/60 pl-5">
                    <p className="eyebrow">Практический пример</p>
                    <p className="mt-2 text-[15px] italic leading-relaxed text-fg">{topic.example}</p>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

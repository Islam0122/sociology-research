import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ListOrdered } from 'lucide-react';
import { IMAGES } from '../../data/images';
import { PROJECT } from '../../data/navigation';
import { scrollToSection } from '../../utils/scroll';
import { Button } from '../ui/Button';
import { SmartImage } from '../ui/SmartImage';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="intro" aria-labelledby="hero-title" className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink-950 outline-none">
      {/* Photograph */}
      <motion.div
        className="print-hide-media absolute inset-0"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <SmartImage asset={IMAGES.hero} priority className="h-full w-full" imgClassName="object-[50%_35%]" showCredit={false} decorative />
      </motion.div>
      {/* Cinematic overlays */}
      <div aria-hidden className="print-hide-media absolute inset-0 bg-[linear-gradient(90deg,#080B12_0%,rgba(8,11,18,0.88)_38%,rgba(8,11,18,0.45)_70%,rgba(8,11,18,0.7)_100%)]" />
      <div aria-hidden className="print-hide-media absolute inset-0 bg-[linear-gradient(180deg,rgba(8,11,18,0.75)_0%,transparent_25%,transparent_55%,#080B12_100%)]" />
      <div aria-hidden className="print-hide-media absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-[140px]" />

      <div className="container-edit relative z-10 flex flex-1 flex-col justify-end pb-14 pt-32 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.22em] text-fg-muted"
        >
          {PROJECT.meta.map((m, i) => (
            <span key={m} className="flex items-center gap-3">
              {i > 0 && <span className="text-fg-subtle">/</span>}
              {m}
            </span>
          ))}
        </motion.p>

        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="mt-6 max-w-5xl font-serif text-[clamp(2.4rem,6.6vw,5.6rem)] font-medium leading-[1.02] tracking-[-0.025em] text-fg text-balance"
        >
          <span className="text-fg-subtle">«</span>Влияние социальных сетей на поведение и{' '}
          <em className="bg-gradient-to-r from-accent-soft to-violet bg-clip-text font-normal italic text-transparent">мировоззрение</em>{' '}
          молодежи<span className="text-fg-subtle">»</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease }}
          className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">{PROJECT.lead}</p>
            <p className="mt-3 text-sm italic text-fg-subtle">{PROJECT.subtitleEn}</p>
            <div className="no-print mt-10 flex flex-wrap gap-3">
              <Button variant="primary" size="lg" onClick={() => scrollToSection('overview')} iconRight={<ArrowRight className="h-4 w-4" />}>
                Начать исследование
              </Button>
              <Button size="lg" onClick={() => scrollToSection('contents')} icon={<ListOrdered className="h-4 w-4" />}>
                Смотреть содержание
              </Button>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line text-sm lg:col-span-5 lg:ml-auto lg:max-w-md">
            {[
              ['Автор', PROJECT.author],
              ['Дисциплина', PROJECT.subject],
              ['Тип работы', 'СРС, индивидуальная'],
              ['Год', String(PROJECT.year)],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink-950/80 px-5 py-4 backdrop-blur">
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-1.5 text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToSection('overview')}
        aria-label="Прокрутить к введению"
        className="no-print absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-fg-subtle hover:text-fg md:block"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
}

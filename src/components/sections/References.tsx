import { REFERENCE_KIND_LABEL, REFERENCES } from '../../data/references';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';

export function References() {
  return (
    <Section id="references" labelledBy="references-title" className="print-break">
      <div className="container-edit">
        <SectionHeader
          eyebrow="Библиография"
          title={<span id="references-title">Список использованных источников</span>}
          lead="Список включает только проверяемые издания: социологические учебники, монографии, рецензируемые статьи и доклады международных организаций."
        />
        <ol className="mt-16 border-t border-line">
          {REFERENCES.map((r) => (
            <li key={r.id} id={`ref-${r.id}`} className="grid scroll-mt-24 gap-3 border-b border-line py-5 target:bg-accent/[0.06] sm:grid-cols-[3rem_1fr_7rem] sm:gap-6">
              <span className="font-mono text-sm text-fg-subtle tabular-nums">[{r.id}]</span>
              <div>
                <p className="text-[15px] leading-relaxed text-fg">{r.citation}</p>
                {r.note && <p className="mt-1.5 text-sm text-fg-subtle">{r.note}</p>}
              </div>
              <span className="eyebrow sm:text-right">{REFERENCE_KIND_LABEL[r.kind]}</span>
            </li>
          ))}
        </ol>
        <Reveal className="mt-10 text-sm leading-relaxed text-fg-subtle">
          Примечание. Выходные данные приведены по изданиям, доступным автору; при оформлении печатной версии работы рекомендуется сверить их
          с библиотечным каталогом. Ссылки в тексте даны в квадратных скобках.
        </Reveal>
      </div>
    </Section>
  );
}

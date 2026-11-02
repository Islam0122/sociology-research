import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Send } from 'lucide-react';
import { useState } from 'react';
import { SURVEY_QUESTIONS } from '../../data/survey';
import type { QuestionId, SurveyAnswers } from '../../types';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

interface SurveyFormProps {
  onSubmit: (answers: SurveyAnswers) => void;
  disabled?: boolean;
}

export function SurveyForm({ onSubmit, disabled }: SurveyFormProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<SurveyAnswers>>({});
  const [done, setDone] = useState(false);

  const question = SURVEY_QUESTIONS[step];
  const isLast = step === SURVEY_QUESTIONS.length - 1;
  const complete = SURVEY_QUESTIONS.every((q) => answers[q.id]);

  const choose = (id: QuestionId, value: string) => setAnswers((a) => ({ ...a, [id]: value }));

  const submit = () => {
    if (!complete) return;
    onSubmit(answers as SurveyAnswers);
    setDone(true);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="flex min-h-[26rem] flex-col items-start justify-center rounded-2xl border border-line bg-surface p-8 sm:p-10" role="status">
        <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden />
        <h3 className="mt-6 font-serif text-3xl text-fg">Спасибо, ответ сохранён</h3>
        <p className="mt-3 max-w-md text-fg-muted">
          Ответ записан локально в этом браузере, а графики справа обновились. Если вы собираете ответы одногруппников на одном устройстве,
          передайте его следующему участнику.
        </p>
        <Button className="mt-8" variant="primary" onClick={restart} icon={<RotateCcw className="h-4 w-4" />}>
          Добавить ещё один ответ
        </Button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isLast) submit();
        else if (answers[question.id]) setStep((s) => s + 1);
      }}
      className="flex min-h-[26rem] flex-col rounded-2xl border border-line bg-surface p-6 sm:p-10"
      aria-label="Анкета"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-fg-subtle">
          Вопрос {question.number} / {SURVEY_QUESTIONS.length}
        </span>
        <div className="flex gap-1.5" aria-hidden>
          {SURVEY_QUESTIONS.map((q, i) => (
            <span key={q.id} className={cn('h-1 w-6 rounded-full transition-colors', i <= step ? 'bg-accent' : 'bg-line-strong')} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.fieldset
          key={question.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="mt-8 flex-1"
        >
          <legend className="font-serif text-2xl leading-snug text-fg sm:text-3xl">{question.text}</legend>
          <div className="mt-8 grid gap-2.5">
            {question.options.map((o) => {
              const checked = answers[question.id] === o.id;
              return (
                <label
                  key={o.id}
                  className={cn(
                    'flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3.5 transition-colors',
                    checked ? 'border-accent bg-accent/10 text-fg' : 'border-line text-fg-muted hover:border-line-strong hover:text-fg',
                  )}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={o.id}
                    checked={checked}
                    onChange={() => choose(question.id, o.id)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden
                    className={cn(
                      'grid h-4 w-4 place-items-center rounded-full border peer-focus-visible:ring-2 peer-focus-visible:ring-accent',
                      checked ? 'border-accent' : 'border-fg-subtle',
                    )}
                  >
                    {checked && <span className="h-2 w-2 rounded-full bg-accent" />}
                  </span>
                  <span className="text-[15px]">{o.label}</span>
                </label>
              );
            })}
          </div>
        </motion.fieldset>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} icon={<ArrowLeft className="h-4 w-4" />}>
          Назад
        </Button>
        {isLast ? (
          <Button type="submit" variant="primary" disabled={!complete || disabled} icon={<Send className="h-4 w-4" />}>
            Отправить ответ
          </Button>
        ) : (
          <Button type="submit" variant="primary" disabled={!answers[question.id]} iconRight={<ArrowRight className="h-4 w-4" />}>
            Далее
          </Button>
        )}
      </div>
    </form>
  );
}

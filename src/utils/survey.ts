import { SURVEY_QUESTIONS } from '../data/survey';
import type { DistributionRow, PublishedSurvey, QuestionId, SurveyCounts, SurveyQuestion, SurveyResponse } from '../types';

export function emptyCounts(): SurveyCounts {
  const counts = {} as SurveyCounts;
  for (const q of SURVEY_QUESTIONS) {
    counts[q.id] = Object.fromEntries(q.options.map((o) => [o.id, 0]));
  }
  return counts;
}

export function aggregate(responses: SurveyResponse[]): SurveyCounts {
  const counts = emptyCounts();
  for (const r of responses) {
    for (const q of SURVEY_QUESTIONS) {
      const answer = r.answers[q.id];
      const bucket = counts[q.id];
      if (answer !== undefined && bucket[answer] !== undefined) bucket[answer] += 1;
    }
  }
  return counts;
}

export function distribution(question: SurveyQuestion, counts: SurveyCounts): DistributionRow[] {
  const bucket = counts[question.id] ?? {};
  const total = Object.values(bucket).reduce((a, b) => a + b, 0);
  return question.options.map((o) => {
    const count = bucket[o.id] ?? 0;
    return { optionId: o.id, label: o.label, count, percent: total ? (count / total) * 100 : 0 };
  });
}

export function formatPercent(value: number): string {
  if (value === 0) return '0%';
  return `${value < 10 ? value.toFixed(1).replace('.', ',') : Math.round(value)}%`;
}

const isQuestionId = (v: string): v is QuestionId => SURVEY_QUESTIONS.some((q) => q.id === v);

/** Validates unknown JSON (from localStorage or an imported file). */
export function parseResponses(raw: unknown): SurveyResponse[] {
  if (!Array.isArray(raw)) throw new Error('Неверный формат данных: ожидается массив ответов.');
  return raw.map((item, i) => {
    if (typeof item !== 'object' || item === null) throw new Error(`Запись №${i + 1} повреждена.`);
    const rec = item as Record<string, unknown>;
    const answers = rec.answers as Record<string, unknown> | undefined;
    if (!answers || typeof answers !== 'object') throw new Error(`В записи №${i + 1} нет ответов.`);
    const clean = {} as SurveyResponse['answers'];
    for (const q of SURVEY_QUESTIONS) {
      const a = answers[q.id];
      if (typeof a !== 'string' || !q.options.some((o) => o.id === a)) {
        throw new Error(`Запись №${i + 1}: недопустимый ответ на вопрос ${q.number}.`);
      }
      clean[q.id] = a;
    }
    Object.keys(answers).forEach((k) => {
      if (!isQuestionId(k)) throw new Error(`Запись №${i + 1}: неизвестный вопрос «${k}».`);
    });
    return {
      id: typeof rec.id === 'string' ? rec.id : `imported-${i}-${Date.now()}`,
      createdAt: typeof rec.createdAt === 'string' ? rec.createdAt : new Date().toISOString(),
      answers: clean,
    };
  });
}

export function toCsv(responses: SurveyResponse[]): string {
  const header = ['id', 'createdAt', ...SURVEY_QUESTIONS.map((q) => `Q${q.number} ${q.shortLabel}`)];
  const rows = responses.map((r) => [
    r.id,
    r.createdAt,
    ...SURVEY_QUESTIONS.map((q) => q.options.find((o) => o.id === r.answers[q.id])?.label ?? ''),
  ]);
  return [header, ...rows].map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\n');
}

export function toPublishedSnippet(responses: SurveyResponse[]): string {
  const data: PublishedSurvey = {
    title: 'Опрос студентов',
    conductedAt: new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
    sampleDescription: 'Опишите выборку: кто, где, как проводился опрос',
    totalRespondents: responses.length,
    counts: aggregate(responses),
  };
  return `export const PUBLISHED_SURVEY: PublishedSurvey | null = ${JSON.stringify(data, null, 2)};\n`;
}

export function downloadFile(filename: string, content: string, mime: string): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

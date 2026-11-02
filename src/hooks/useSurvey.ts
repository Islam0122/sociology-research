import { useCallback, useEffect, useMemo, useState } from 'react';
import { SURVEY_STORAGE_KEY } from '../data/survey';
import type { SurveyAnswers, SurveyCounts, SurveyResponse } from '../types';
import { aggregate, makeId, parseResponses } from '../utils/survey';

type Status = 'loading' | 'ready' | 'error';

export interface SurveyStore {
  status: Status;
  error: string | null;
  responses: SurveyResponse[];
  counts: SurveyCounts;
  submit: (answers: SurveyAnswers) => void;
  reset: () => void;
  importResponses: (raw: unknown, mode: 'merge' | 'replace') => number;
}

const EVENT = 'srs-survey-change';

function read(): SurveyResponse[] {
  const raw = window.localStorage.getItem(SURVEY_STORAGE_KEY);
  if (!raw) return [];
  return parseResponses(JSON.parse(raw));
}

function write(responses: SurveyResponse[]): void {
  window.localStorage.setItem(SURVEY_STORAGE_KEY, JSON.stringify(responses));
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Local demonstration survey store backed by localStorage.
 * Instances stay in sync (page + presentation mode + other tabs).
 */
export function useSurvey(): SurveyStore {
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  const load = useCallback(() => {
    try {
      setResponses(read());
      setError(null);
      setStatus('ready');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось прочитать сохранённые ответы.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
    const onStorage = (e: StorageEvent) => {
      if (e.key === SURVEY_STORAGE_KEY) load();
    };
    window.addEventListener(EVENT, load);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, load);
      window.removeEventListener('storage', onStorage);
    };
  }, [load]);

  const persist = useCallback((next: SurveyResponse[]) => {
    try {
      write(next);
    } catch {
      setError('Браузер не позволяет сохранить данные (например, в приватном режиме).');
      setStatus('error');
    }
  }, []);

  const submit = useCallback(
    (answers: SurveyAnswers) => {
      persist([...responses, { id: makeId(), createdAt: new Date().toISOString(), answers }]);
    },
    [responses, persist],
  );

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(SURVEY_STORAGE_KEY);
      window.dispatchEvent(new Event(EVENT));
    } catch {
      /* storage unavailable — nothing to clear */
    }
    setResponses([]);
    setError(null);
    setStatus('ready');
  }, []);

  const importResponses = useCallback(
    (raw: unknown, mode: 'merge' | 'replace') => {
      const parsed = parseResponses(raw);
      const base = mode === 'merge' ? responses : [];
      const known = new Set(base.map((r) => r.id));
      const next = [...base, ...parsed.filter((r) => !known.has(r.id))];
      persist(next);
      return parsed.length;
    },
    [responses, persist],
  );

  const counts = useMemo(() => aggregate(responses), [responses]);

  return { status, error, responses, counts, submit, reset, importResponses };
}

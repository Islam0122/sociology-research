import { AlertTriangle, Download, FileCode2, FileSpreadsheet, RotateCcw, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import type { SurveyResponse } from '../../types';
import { downloadFile, toCsv, toPublishedSnippet } from '../../utils/survey';
import { Button } from '../ui/Button';

interface SurveyDataToolsProps {
  responses: SurveyResponse[];
  onReset: () => void;
  onImport: (raw: unknown, mode: 'merge' | 'replace') => number;
}

export function SurveyDataTools({ responses, onReset, onImport }: SurveyDataToolsProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);
  const empty = responses.length === 0;
  const stamp = new Date().toISOString().slice(0, 10);

  const handleFile = async (file: File) => {
    try {
      const data: unknown = JSON.parse(await file.text());
      const n = onImport(data, 'merge');
      setMessage({ tone: 'ok', text: `Импортировано записей: ${n}.` });
    } catch (e) {
      setMessage({ tone: 'error', text: e instanceof Error ? e.message : 'Не удалось прочитать файл.' });
    }
  };

  return (
    <div className="no-print rounded-2xl border border-line p-5 sm:p-6">
      <p className="eyebrow">Инструменты автора</p>
      <p className="mt-2 text-sm text-fg-subtle">
        Сохраните собранные ответы, перенесите их на другое устройство или подготовьте итоговые данные для публикации на сайте.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          size="sm"
          disabled={empty}
          icon={<Download className="h-3.5 w-3.5" />}
          onClick={() => downloadFile(`survey-${stamp}.json`, JSON.stringify(responses, null, 2), 'application/json')}
        >
          JSON
        </Button>
        <Button
          size="sm"
          disabled={empty}
          icon={<FileSpreadsheet className="h-3.5 w-3.5" />}
          onClick={() => downloadFile(`survey-${stamp}.csv`, '﻿' + toCsv(responses), 'text/csv;charset=utf-8')}
        >
          CSV (Excel)
        </Button>
        <Button
          size="sm"
          disabled={empty}
          icon={<FileCode2 className="h-3.5 w-3.5" />}
          title="Код для файла src/data/survey.ts"
          onClick={() => downloadFile(`published-survey-${stamp}.ts`, toPublishedSnippet(responses), 'text/plain')}
        >
          Экспорт для публикации
        </Button>
        <Button size="sm" icon={<Upload className="h-3.5 w-3.5" />} onClick={() => fileRef.current?.click()}>
          Импорт JSON
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
            e.target.value = '';
          }}
        />
        {!confirming ? (
          <Button size="sm" variant="danger" disabled={empty} icon={<RotateCcw className="h-3.5 w-3.5" />} onClick={() => setConfirming(true)}>
            Сбросить данные
          </Button>
        ) : (
          <span className="inline-flex flex-wrap items-center gap-2 rounded-full border border-danger/40 bg-danger/5 py-1 pl-3 pr-1 text-xs text-fg">
            <AlertTriangle className="h-3.5 w-3.5 text-danger" aria-hidden />
            Удалить все {responses.length} отв.?
            <Button
              size="sm"
              variant="danger"
              onClick={() => {
                onReset();
                setConfirming(false);
                setMessage({ tone: 'ok', text: 'Демонстрационные данные удалены.' });
              }}
            >
              Да, удалить
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
              Отмена
            </Button>
          </span>
        )}
      </div>
      {message && (
        <p role="status" className={message.tone === 'ok' ? 'mt-3 text-xs text-accent-soft' : 'mt-3 text-xs text-danger'}>
          {message.text}
        </p>
      )}
    </div>
  );
}

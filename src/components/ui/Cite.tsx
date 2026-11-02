import { REFERENCES } from '../../data/references';

/** Renders text, turning “[n]” markers into links to the bibliography. */
export function WithCitations({ text }: { text: string }) {
  const parts = text.split(/(\[\d+(?:,\s*\d+)*\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[(\d+(?:,\s*\d+)*)\]$/);
        if (!match?.[1]) return <span key={i}>{part}</span>;
        const ids = match[1].split(',').map((s) => Number(s.trim()));
        return (
          <sup key={i} className="ml-0.5 font-mono text-[0.68em]">
            [
            {ids.map((id, j) => {
              const ref = REFERENCES.find((r) => r.id === id);
              return (
                <span key={id}>
                  <a href={`#ref-${id}`} title={ref?.citation} className="text-accent-soft hover:text-fg hover:underline">
                    {id}
                  </a>
                  {j < ids.length - 1 && ', '}
                </span>
              );
            })}
            ]
          </sup>
        );
      })}
    </>
  );
}

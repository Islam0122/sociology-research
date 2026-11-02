import { PROJECT } from '../../data/navigation';

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950 py-10">
      <div className="container-edit flex flex-col gap-4 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono tracking-widest uppercase">Sociology / {PROJECT.year}</p>
        <p>
          {PROJECT.authorRu} ({PROJECT.author}) · {PROJECT.type}
        </p>
        <p>Учебный проект. Демонстрационные данные опроса хранятся только в вашем браузере.</p>
      </div>
    </footer>
  );
}

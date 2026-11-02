export function Spinner({ label = 'Загрузка…' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-16 text-fg-subtle">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-line-strong border-t-accent" aria-hidden />
      <span className="font-mono text-xs tracking-widest uppercase">{label}</span>
    </div>
  );
}

export function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="no-print fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent" aria-hidden>
      <div
        className="h-full origin-left bg-gradient-to-r from-accent to-violet"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

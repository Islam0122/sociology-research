import type { SectionId } from '../types';

export function scrollToSection(id: SectionId): void {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
  // Move focus for keyboard and screen-reader users without jumping.
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
}

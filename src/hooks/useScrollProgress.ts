import { useEffect, useState } from 'react';

/** Returns page scroll progress (0–1) and whether the page is scrolled past `threshold` px. */
export function useScrollProgress(threshold = 24): { progress: number; scrolled: boolean } {
  const [state, setState] = useState({ progress: 0, scrolled: false });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setState({ progress: max > 0 ? Math.min(1, y / max) : 0, scrolled: y > threshold });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}

import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';
import type { ImageAsset } from '../../types';
import { cn } from '../../utils/cn';

interface SmartImageProps {
  asset: ImageAsset;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Apply the site's navy colour grading. */
  graded?: boolean;
  showCredit?: boolean;
  /** Decorative images fail silently (no message). */
  decorative?: boolean;
}

/**
 * Photograph with loading skeleton, ordered fallbacks and a graceful error state.
 */
export function SmartImage({ asset, className, imgClassName, priority, graded = true, showCredit = true, decorative = false }: SmartImageProps) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const failed = index >= asset.sources.length;
  const src = asset.sources[index];

  useEffect(() => {
    setIndex(0);
    setLoaded(false);
  }, [asset]);

  return (
    <figure className={cn('relative overflow-hidden bg-surface', className)}>
      {!loaded && !failed && <div className="skeleton absolute inset-0" aria-hidden />}
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_30%_20%,#1a2440,transparent_60%),linear-gradient(160deg,#101522,#0b0f19)] p-6 text-center">
          {!decorative && (
            <>
              <ImageOff className="h-5 w-5 text-fg-subtle" aria-hidden />
              <span className="max-w-xs text-xs text-fg-subtle">Изображение недоступно (нет подключения к интернету).</span>
            </>
          )}
        </div>
      ) : (
        <img
          key={src}
          src={src}
          alt={decorative ? '' : asset.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false);
            setIndex((i) => i + 1);
          }}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700',
            loaded ? 'opacity-100' : 'opacity-0',
            graded && 'saturate-[0.75] contrast-[1.05]',
            imgClassName,
          )}
        />
      )}
      {graded && !failed && (
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#0b1a3a] mix-blend-color opacity-40" />
      )}
      {showCredit && !failed && (
        <figcaption className="absolute bottom-2 right-3 font-mono text-[10px] tracking-wider text-white/55">{asset.credit}</figcaption>
      )}
    </figure>
  );
}

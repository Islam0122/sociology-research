import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-ink-950 hover:bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_-8px_rgba(76,141,255,0.5)]',
  secondary: 'border border-line-strong bg-white/[0.02] text-fg hover:border-fg-subtle hover:bg-white/[0.05]',
  ghost: 'text-fg-muted hover:bg-white/[0.05] hover:text-fg',
  danger: 'border border-danger/40 text-danger hover:bg-danger/10',
};

const sizes = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-[15px] gap-2.5',
};

export function Button({ variant = 'secondary', size = 'md', icon, iconRight, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'li' | 'article' | 'figure';
}

/** Subtle fade-and-rise reveal on first entry into the viewport. */
export function Reveal({ children, delay = 0, y = 18, as = 'div', ...rest }: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      data-reveal
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Component>
  );
}

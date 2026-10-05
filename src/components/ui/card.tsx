'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | '3d' | 'kit' | 'skill';
  hover?: boolean;
  children: React.ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = true, className, children, style, ...props }, ref) => {
    const variants = {
      default: 'bg-secondary border border-[var(--color-rule)] rounded-lg overflow-hidden',
      '3d': 'card-3d bg-secondary border border-[var(--color-rule)] rounded-lg overflow-hidden transform-gpu transform-style-3d',
      kit: 'bg-secondary border border-[var(--color-rule)] rounded-lg overflow-hidden relative',
      skill: 'skill-apple-card bg-secondary border border-[var(--color-rule)] rounded-lg overflow-hidden',
    };

    const hoverStyles = hover ? {
      default: 'hover:border-[var(--color-rule-2)] hover:translate-y-[-4px]',
      '3d': '',
      kit: 'hover:border-[var(--color-rule-2)] hover:translate-y-[-4px]',
      skill: 'hover:border-[var(--color-rule-2)] hover:translate-y-[-4px]',
    } : {};

    return (
      <motion.div
        ref={ref}
        className={cn(
          variants[variant],
          hoverStyles[variant],
          'transition-all duration-short ease-out',
          className
        )}
        style={style}
        whileHover={hover && variant === '3d' ? { 
          boxShadow: '0 16px 40px oklch(0% 0 0 / 0.5), 0 0 24px oklch(76% 0.17 50 / 0.12)',
          borderColor: 'var(--color-rule-2)',
        } : undefined}
        whileTap={variant === '3d' ? { 
          scale: 0.98,
          translateZ: -4,
        } : undefined}
        {...props}
      >
        {children}
        {hover && variant !== '3d' && (
          <div 
            className="card-glare absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-micro z-5"
            style={{ 
              background: 'radial-gradient(circle 200px at var(--glare-x, 50%) var(--glare-y, 50%), oklch(76% 0.17 50 / 0.15), transparent 75%)',
            }}
          />
        )}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
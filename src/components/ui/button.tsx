'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'accent' | 'ghost' | 'icon' | 'link' | 'view-toggle';
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'accent', size = 'md', isActive, className, children, whileTap, whileHover, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-body font-medium lowercase cursor-pointer transition-all';
    
    const variants = {
      accent: 'bg-accent text-paper border border-accent rounded-pill',
      ghost: 'bg-secondary text-ink-2 border border-[var(--color-rule)] rounded-pill',
      icon: 'bg-secondary border border-[var(--color-rule)] rounded-full',
      link: 'bg-none border-none text-accent',
      'view-toggle': 'bg-secondary border border-[var(--color-rule)] rounded-sm',
    };
    
    const sizes = {
      sm: 'px-3 py-1 text-xs',
      md: 'px-4 py-1.5 text-sm',
      lg: 'px-6 py-2 text-base',
    };

    const isIconVariant = variant === 'icon' || variant === 'view-toggle';
    const iconSizes = {
      sm: 'w-7 h-7',
      md: 'w-9 h-9',
      lg: 'w-10 h-10',
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          isActive && variant === 'view-toggle' && 'text-accent border-accent',
          className
        )}
        whileTap={whileTap ?? { scale: 0.95 }}
        whileHover={whileHover ?? (variant !== 'link' && variant !== 'icon' ? { y: -1 } : undefined)}
        style={{ 
          ...(isIconVariant && { width: iconSizes[size], height: iconSizes[size] }),
          ...(variant === 'link' && { padding: 0 }),
        }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
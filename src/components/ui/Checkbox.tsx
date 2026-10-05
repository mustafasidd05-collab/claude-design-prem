'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <label className={cn('flex items-start gap-3 cursor-pointer', className)}>
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="absolute opacity-0 h-4 w-4 cursor-pointer"
            {...props}
          />
          <motion.div
            className={cn(
              'w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all duration-micro',
              'border-[var(--color-rule)] bg-secondary',
              props.checked && 'border-accent bg-accent',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper'
            )}
            whileTap={{ scale: 0.9 }}
            animate={{ 
              scale: props.checked ? 1 : 0,
              rotate: props.checked ? 0 : -10,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          >
            <svg 
              className="w-3 h-3 text-paper" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>
        </div>
        {(label || description) && (
          <div className="flex-1 min-w-0 pt-0.5">
            {label && (
              <span className="block font-body text-sm text-ink">
                {label}
              </span>
            )}
            {description && (
              <span className="block text-xs text-muted mt-0.5">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
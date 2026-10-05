'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'page' | 'full' | 'narrow';
  padding?: boolean;
}

export function Container({ children, className, maxWidth = 'page', padding = true }: ContainerProps) {
  const widths = {
    page: 'max-w-page',
    full: 'max-w-full',
    narrow: 'max-w-3xl',
  };
  
  return (
    <div className={cn(
      'mx-auto',
      widths[maxWidth],
      padding && 'px-gutter',
      className
    )}>
      {children}
    </div>
  );
}
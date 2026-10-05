'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode, Fragment } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showClose?: boolean;
  closeOnOverlayClick?: boolean;
  className?: string;
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[90vw]',
};

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md', 
  showClose = true, 
  closeOnOverlayClick = true,
  className 
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            className="fixed inset-0 z-[var(--z-modal)] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-hidden="true"
          />
          <motion.div
            className={cn(
              'fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4',
              'pointer-events-none'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={cn(
                'relative w-full bg-paper border border-[var(--color-rule)] rounded-xl shadow-[0_24px_60px_oklch(0%_0_0_/0.5)]',
                'overflow-hidden pointer-events-auto',
                sizes[size],
                className
              )}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              {(title || showClose) && (
                <div className="flex items-start justify-between p-6 border-b border-[var(--color-rule)]">
                  {title && (
                    <h2 className="font-display text-xl text-ink">{title}</h2>
                  )}
                  {showClose && (
                    <button
                      onClick={onClose}
                      className="btn-icon p-1 text-muted hover:text-ink"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              )}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  position?: 'right' | 'left' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'full';
  showClose?: boolean;
  className?: string;
}

const drawerSizes = {
  right: { sm: 'w-72', md: 'w-96', lg: 'w-[36rem]', full: 'w-[90vw]' },
  left: { sm: 'w-72', md: 'w-96', lg: 'w-[36rem]', full: 'w-[90vw]' },
  bottom: { sm: 'h-48', md: 'h-72', lg: 'h-96', full: 'h-[80vh]' },
};

const drawerPositions = {
  right: 'right-0 top-0 h-full',
  left: 'left-0 top-0 h-full',
  bottom: 'left-0 right-0 bottom-0',
};

export function Drawer({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'right', 
  size = 'md', 
  showClose = true,
  className 
}: DrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            className="fixed inset-0 z-[var(--z-modal)] bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            className={cn(
              'fixed z-[var(--z-modal)] bg-paper border-l border-[var(--color-rule)] shadow-[-24px_0_60px_oklch(0%_0_0_/0.5)]',
              'flex flex-col overflow-hidden pointer-events-auto',
              drawerPositions[position],
              drawerSizes[position][size],
              className
            )}
            initial={position === 'right' ? { x: '100%' } : position === 'left' ? { x: '-100%' } : { y: '100%' }}
            animate={{ x: 0, y: 0 }}
            exit={position === 'right' ? { x: '100%' } : position === 'left' ? { x: '-100%' } : { y: '100%' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            {(title || showClose) && (
              <div className="flex items-center justify-between p-4 border-b border-[var(--color-rule)]">
                {title && (
                  <h2 className="font-display text-lg text-ink">{title}</h2>
                )}
                {showClose && (
                  <button
                    onClick={onClose}
                    className="btn-icon p-1 text-muted hover:text-ink"
                    aria-label="Close drawer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>
          </motion.aside>
        </Fragment>
      )}
    </AnimatePresence>
  );
}
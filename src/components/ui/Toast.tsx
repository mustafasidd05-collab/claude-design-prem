'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export function ToastProvider() {
  const { toastMessage, hideToast } = useUIStore();
  
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          className={cn(
            'fixed bottom-8 left-1/2 -translate-x-1/2 z-[var(--z-toast)]',
            'flex items-center gap-3 px-6 py-4 bg-ink text-paper rounded-pill shadow-[0_16px_40px_oklch(0%_0_0_/0.5)]',
            'pointer-events-auto'
          )}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          onClick={hideToast}
          role="alert"
          aria-live="polite"
        >
          <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0" />
          <span className="font-body text-sm">{toastMessage}</span>
          <button
            onClick={(e) => { e.stopPropagation(); hideToast(); }}
            className="ml-2 p-1 text-paper/70 hover:text-paper transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
    info: <Info className="w-5 h-5 text-accent" />,
  };
  
  return (
    <motion.div
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-[var(--z-toast)]',
        'flex items-center gap-3 px-6 py-4 bg-ink text-paper rounded-pill shadow-[0_16px_40px_oklch(0%_0_0_/0.5)]',
        'pointer-events-auto'
      )}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      onClick={onClose}
      role="alert"
      aria-live="polite"
    >
      {icons[type]}
      <span className="font-body text-sm">{message}</span>
      <button
        onClick={(e) => { e.stopPropagation(); onClose?.(); }}
        className="ml-2 p-1 text-paper/70 hover:text-paper transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
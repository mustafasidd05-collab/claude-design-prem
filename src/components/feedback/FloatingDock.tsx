'use client';

import { motion } from 'framer-motion';
import { useSelectionStore } from '@/store/selection';
import { useUIStore } from '@/store/ui';
import { cn } from '@/lib/utils';
import { Download, X, Copy, List } from 'lucide-react';

export function FloatingDock() {
  const { count, clearAll } = useSelectionStore();
  const { openBundleDrawer, openPromptStackerModal } = useUIStore();
  
  if (count === 0) return null;
  
  return (
    <motion.div
      className={cn(
        'floating-action-dock fixed bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-toast)]',
        'pointer-events-auto'
      )}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div className="dock-inner bg-paper border border-[var(--color-rule)] rounded-xl shadow-[0_24px_60px_oklch(0%_0_0_/0.5)] p-3 px-6 flex items-center gap-4">
        <div className="dock-stats flex items-center gap-2 text-sm">
          <motion.span
            className="dock-pulse-dot w-2 h-2 rounded-full bg-accent"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>{count} skill{count !== 1 ? 's' : ''} in bundle</span>
        </div>
        <div className="dock-buttons flex items-center gap-2">
          <motion.button
            className="dock-btn-secondary btn-ghost text-sm px-3"
            onClick={openPromptStackerModal}
            whileTap={{ scale: 0.98 }}
          >
            <Copy className="w-4 h-4 mr-1" />
            stack prompt
          </motion.button>
          <motion.button
            className="dock-btn-secondary btn-ghost text-sm px-3"
            onClick={openBundleDrawer}
            whileTap={{ scale: 0.98 }}
          >
            <List className="w-4 h-4 mr-1" />
            inspect cart
          </motion.button>
          <motion.button
            className="dock-btn-primary btn-accent text-sm px-4"
            onClick={() => {}}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4 mr-1" />
            download .zip
          </motion.button>
          <motion.button
            className="dock-btn-clear btn-icon p-1 text-muted hover:text-danger"
            onClick={clearAll}
            whileTap={{ scale: 0.95 }}
            title="clear selection"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
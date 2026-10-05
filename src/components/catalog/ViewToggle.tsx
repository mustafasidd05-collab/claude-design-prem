'use client';

import { motion } from 'framer-motion';
import { Grid, List } from 'lucide-react';
import { useUIStore } from '@/store/ui';
import { cn } from '@/lib/utils';

export function ViewToggle() {
  const { viewMode, setViewMode } = useUIStore();
  
  return (
    <motion.div 
      className="view-controls-bar flex gap-2xs"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
    >
      <motion.button
        className={cn(
          'btn-view-toggle flex items-center justify-center w-8.5 h-8.5 bg-secondary border border-[var(--color-rule)] rounded-sm text-muted cursor-pointer transition-all duration-micro',
          viewMode === 'grid' && 'text-accent border-accent'
        )}
        onClick={() => setViewMode('grid')}
        whileTap={{ scale: 0.95 }}
        title="Grid view"
      >
        <Grid className="w-3.5 h-3.5" />
      </motion.button>
      <motion.button
        className={cn(
          'btn-view-toggle flex items-center justify-center w-8.5 h-8.5 bg-secondary border border-[var(--color-rule)] rounded-sm text-muted cursor-pointer transition-all duration-micro',
          viewMode === 'list' && 'text-accent border-accent'
        )}
        onClick={() => setViewMode('list')}
        whileTap={{ scale: 0.95 }}
        title="List view"
      >
        <List className="w-3.5 h-3.5" />
      </motion.button>
    </motion.div>
  );
}
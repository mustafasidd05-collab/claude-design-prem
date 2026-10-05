'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { getDomainPills } from '@/services/skills';
import { cn } from '@/lib/utils';

export function DomainPills() {
  const domainPills = getDomainPills();
  const [activeDomain, setActiveDomain] = useState('ALL');
  
  return (
    <motion.div 
      className="domain-pills-row flex gap-xs flex-wrap"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      {domainPills.map((pill) => (
        <motion.button
          key={pill.key}
          className={cn(
            'apple-domain-pill inline-flex items-center gap-1.5 bg-secondary border border-[var(--color-rule)] rounded-pill px-3.5 py-1.5 font-body text-xs font-medium text-ink-2 cursor-pointer whitespace-nowrap lowercase transition-all duration-micro ease-out',
            activeDomain === pill.key && 'bg-accent text-paper border-accent'
          )}
          onClick={() => setActiveDomain(pill.key)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + domainPills.indexOf(pill) * 0.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {pill.label}
          <span className="apple-pill-count text-[10px] opacity-75">{pill.count}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
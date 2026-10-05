'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSubgroups } from '@/services/skills';
import { cn } from '@/lib/utils';

export function SubgroupSelect({ 
  activeDomain = 'ALL', 
  onChange 
}: { 
  activeDomain?: string; 
  onChange?: (value: string) => void;
}) {
  const [subgroups, setSubgroups] = useState<Array<{ key: string; title: string; skills: any[] }>>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let mounted = true;
    getSubgroups().then(data => {
      if (mounted) {
        setSubgroups(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);
  
  const filteredSubgroups = activeDomain === 'ALL' 
    ? subgroups 
    : subgroups.filter(s => s.skills.some((skill: any) => skill.domain_key === activeDomain));
  
  if (loading) {
    return (
      <motion.div 
        className="subgroup-controls-row flex items-center justify-between flex-wrap gap-sm"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="subgroup-select-wrapper flex items-center gap-xs">
          <label htmlFor="subgroupSelect" className="subgroup-label font-label text-[11px] tracking-micro uppercase text-ink/55">
            SUBGROUP:
          </label>
          <select
            id="subgroupSelect"
            className={cn(
              'select-control bg-secondary border border-[var(--color-rule)] rounded-md px-3 py-1.5 font-body text-xs text-ink-2 outline-none cursor-pointer lowercase transition-colors duration-micro',
              'focus:border-accent'
            )}
            disabled
          >
            <option value="ALL">loading...</option>
          </select>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="subgroup-controls-row flex items-center justify-between flex-wrap gap-sm"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <div className="subgroup-select-wrapper flex items-center gap-xs">
        <label htmlFor="subgroupSelect" className="subgroup-label font-label text-[11px] tracking-micro uppercase text-ink/55">
          SUBGROUP:
        </label>
        <select
          id="subgroupSelect"
          className={cn(
            'select-control bg-secondary border border-[var(--color-rule)] rounded-md px-3 py-1.5 font-body text-xs text-ink-2 outline-none cursor-pointer lowercase transition-colors duration-micro',
            'focus:border-accent'
          )}
          onChange={(e) => onChange?.(e.target.value)}
        >
          <option value="ALL">all subgroups ({filteredSubgroups.length})</option>
          {filteredSubgroups.map((sg) => (
            <option key={sg.key} value={sg.key}>
              {sg.title}
            </option>
          ))}
        </select>
      </div>
      
      <div className="selection-actions-cluster flex items-center gap-xs">
        <motion.button 
          className="btn-link text-xs"
          onClick={() => {}}
          whileTap={{ scale: 0.98 }}
        >
          select all filtered
        </motion.button>
        <span className="link-sep text-xs text-[var(--color-rule-2)]">·</span>
        <motion.button 
          className="btn-link text-xs"
          onClick={() => {}}
          whileTap={{ scale: 0.98 }}
        >
          clear selection
        </motion.button>
        <span className="link-sep text-xs text-[var(--color-rule-2)]">·</span>
        <motion.button 
          className="btn-link text-xs"
          onClick={() => {}}
          whileTap={{ scale: 0.98 }}
        >
          stack into prompt
        </motion.button>
      </div>
    </motion.div>
  );
}
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getFlowcharts } from '@/services/skills';
import { cn } from '@/lib/utils';

const FLOWCHART_FILTERS = [
  { key: 'ALL', label: 'all pipelines (11)' },
  { key: 'ROUTER', label: 'router' },
  { key: 'CODING', label: 'engineering' },
  { key: 'DESIGN', label: 'ui/ux + 3d' },
  { key: 'QA', label: 'qa + e2e' },
  { key: 'REASONING', label: 'deep reasoning' },
  { key: 'MARKETING', label: 'growth' },
  { key: 'EXEC', label: 'executive' },
  { key: 'SEC', label: 'cybersecurity' },
  { key: 'AI', label: 'ai swarms' },
  { key: 'OPS', label: 'operations' },
];

export function FlowchartsTab() {
  const [flowcharts, setFlowcharts] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getFlowcharts().then(fcs => {
      setFlowcharts(fcs);
      setLoading(false);
    });
  }, []);
  
  const filteredFlowcharts = activeFilter === 'ALL' 
    ? flowcharts 
    : flowcharts.filter(fc => fc.domainKey === activeFilter);
  
  return (
    <motion.div 
      id="panel-flowcharts" 
      className="tab-content-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div 
        className="flowcharts-control-bar"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flowcharts-intro">
          <h3 className="section-subtitle font-display font-normal text-ink" style={{ fontSize: 'var(--text-xl)', letterSpacing: '-0.01em' }}>
            architectural agent pipelines
          </h3>
          <p className="section-body text-sm text-muted max-w-[65ch] leading-[1.55] mt-xs">
            inspect connected commands, simulate live multi-agent execution step-by-step, or download domain workflow bundles.
          </p>
        </div>
        <div className="flowchart-filter-pills flex gap-xs flex-wrap mt-lg">
          {FLOWCHART_FILTERS.map((filter) => (
            <motion.button
              key={filter.key}
              className={cn(
                'fc-filter-btn bg-secondary border border-[var(--color-rule)] rounded-pill px-3 py-1 font-body text-xs font-medium text-ink-2 cursor-pointer whitespace-nowrap lowercase transition-all duration-micro ease-out',
                activeFilter === filter.key && 'bg-accent text-paper border-accent'
              )}
              onClick={() => setActiveFilter(filter.key)}
              whileTap={{ scale: 0.97 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="flowcharts-apple-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-4xl">
            <motion.div 
              className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : (
          filteredFlowcharts.map((fc, index) => (
            <motion.article
              key={fc.domainKey}
              className="apple-diagram-card bg-secondary border border-[var(--color-rule)] rounded-lg p-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, borderColor: 'var(--color-rule-2)' }}
            >
              <div className="card-top-row flex items-center justify-between mb-sm">
                <span className="skill-domain-pill font-label text-[10px] tracking-micro uppercase text-accent">
                  {fc.domainKey}
                </span>
              </div>
              
              <h3 className="section-subtitle font-display font-normal text-ink mb-xs" style={{ fontSize: 'var(--text-xl)', letterSpacing: '-0.01em' }}>
                {fc.title}
              </h3>
              
              <p className="section-body text-sm text-muted mb-lg leading-[1.55]">
                {fc.desc}
              </p>
              
              <div className="font-mono text-[11px] text-muted bg-paper-3 border border-[var(--color-rule)] rounded-md p-3 overflow-x-auto mb-lg" style={{ maxHeight: '200px' }}>
                <pre>{fc.code}</pre>
              </div>
              
              <div className="space-y-2">
                {fc.steps.map((step: any, i: number) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-paper-2 border border-[var(--color-rule)] rounded-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <span className="font-label text-[10px] tracking-micro uppercase text-accent flex-shrink-0 pt-0.5">
                      {step.label}
                    </span>
                    <div className="flex-1">
                      <code className="font-mono text-xs text-accent bg-paper-3 px-1.5 py-0.5 rounded">{step.cmd}</code>
                      <p className="text-sm text-muted mt-1">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-lg pt-lg border-t border-[var(--color-rule)] flex flex-wrap gap-xs">
                {fc.skills.map((skillSlug: string) => (
                  <span key={skillSlug} className="apple-command-tag font-label text-[11px] font-medium lowercase text-ink-2 bg-paper-3 border border-[var(--color-rule)] px-2 py-0.5 rounded-sm">
                    /{skillSlug}
                  </span>
                ))}
              </div>
            </motion.article>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
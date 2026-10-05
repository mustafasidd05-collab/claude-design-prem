'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getBlueprints } from '@/services/skills';

export function BlueprintsTab() {
  const [blueprints, setBlueprints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getBlueprints().then(bps => {
      setBlueprints(bps);
      setLoading(false);
    });
  }, []);
  
  return (
    <motion.div 
      id="panel-blueprints" 
      className="tab-content-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div 
        className="flowcharts-intro mb-lg"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="section-subtitle font-display font-normal text-ink" style={{ fontSize: 'var(--text-xl)', letterSpacing: '-0.01em' }}>
          5 anchor engineering blueprints
        </h3>
        <p className="section-body text-sm text-muted mt-xs">
          non-negotiable execution contracts and foundational methodologies guaranteeing zero-hallucination development.
        </p>
      </motion.div>
      
      <motion.div 
        className="blueprints-apple-grid grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-lg"
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
          blueprints.map((bp, index) => (
            <motion.article
              key={bp.slug}
              className="apple-blueprint-card bg-secondary border border-[var(--color-rule)] rounded-lg p-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, borderColor: 'var(--color-rule-2)' }}
            >
              <div className="card-top-row flex items-center justify-between mb-sm">
                <span className="skill-domain-pill font-label text-[10px] tracking-micro uppercase text-accent">
                  BLUEPRINT
                </span>
              </div>
              
              <h3 className="section-subtitle font-display font-normal text-ink mb-xs" style={{ fontSize: 'var(--text-xl)', letterSpacing: '-0.01em' }}>
                {bp.title}
              </h3>
              
              <p className="text-sm text-accent mb-lg font-medium">{bp.tagline}</p>
              
              <div className="space-y-3">
                {bp.phases.map((phase: [string, string], i: number) => (
                  <motion.div
                    key={i}
                    className="p-3 bg-paper-2 border border-[var(--color-rule)] rounded-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <span className="font-label text-[10px] tracking-micro uppercase text-accent block mb-1">
                      {phase[0]}
                    </span>
                    <p className="text-sm text-muted">{phase[1]}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                className="mt-lg w-full btn-ghost text-sm"
                whileTap={{ scale: 0.98 }}
              >
                view full spec
              </motion.button>
            </motion.article>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
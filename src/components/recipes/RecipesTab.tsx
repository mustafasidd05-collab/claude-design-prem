'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRecipes } from '@/services/skills';
import { ChevronDown } from 'lucide-react';

export function RecipesTab() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  
  useEffect(() => {
    getRecipes().then(rps => {
      setRecipes(rps);
      setLoading(false);
    });
  }, []);
  
  return (
    <motion.div 
      id="panel-recipes" 
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
          composition recipes & command sequences
        </h3>
        <p className="section-body text-sm text-muted mt-xs">
          tested multi-skill command chains ready to drop into claude code, antigravity, or cursor chat sessions.
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
          recipes.map((recipe, index) => (
            <motion.article
              key={recipe.title}
              className="apple-blueprint-card bg-secondary border border-[var(--color-rule)] rounded-lg p-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, borderColor: 'var(--color-rule-2)' }}
            >
              <div className="card-top-row flex items-center justify-between mb-sm">
                <span className="skill-domain-pill font-label text-[10px] tracking-micro uppercase text-accent">
                  {recipe.domain}
                </span>
              </div>
              
              <h3 className="section-subtitle font-display font-normal text-ink mb-xs" style={{ fontSize: 'var(--text-xl)', letterSpacing: '-0.01em' }}>
                {recipe.title}
              </h3>
              
              <motion.button
                className="w-full flex items-center justify-between p-3 bg-paper-2 border border-[var(--color-rule)] rounded-md text-left"
                onClick={() => setExpanded(expanded === recipe.title ? null : recipe.title)}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="font-body text-sm text-ink">view steps</span>
                <motion.div
                  className="flex-shrink-0 w-5 h-5 text-accent"
                  animate={{ rotate: expanded === recipe.title ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              <motion.div
                className="mt-3 space-y-2"
                initial={false}
                animate={{ 
                  opacity: expanded === recipe.title ? 1 : 0,
                  height: expanded === recipe.title ? 'auto' : 0,
                }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {recipe.steps.map((step: [string, string], i: number) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-paper-2 border border-[var(--color-rule)] rounded-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <span className="font-label text-[10px] tracking-micro uppercase text-accent flex-shrink-0 pt-0.5">
                      {i + 1}.
                    </span>
                    <div className="flex-1">
                      <code className="font-mono text-xs text-accent bg-paper-3 px-1.5 py-0.5 rounded">{step[0]}</code>
                      <p className="text-sm text-muted mt-1">{step[1]}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.article>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
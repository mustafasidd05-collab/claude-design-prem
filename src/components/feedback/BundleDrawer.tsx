'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy, Trash2 } from 'lucide-react';
import { useSelectionStore } from '@/store/selection';
import { useUIStore } from '@/store/ui';
import { getSkillBySlug } from '@/services/skills';
import { cn } from '@/lib/utils';

export function BundleDrawer() {
  const { isOpen, closeBundleDrawer } = useUIStore();
  const { selectedSlugs, count, toggleSkill, clearAll } = useSelectionStore();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            className="fixed inset-0 z-[var(--z-modal)] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBundleDrawer}
          />
          <motion.aside
            className="bundle-drawer fixed right-0 top-0 h-full z-[var(--z-modal)] w-96 bg-paper border-l border-[var(--color-rule)] shadow-[-24px_0_60px_oklch(0%_0_0_/0.5)] flex flex-col overflow-hidden pointer-events-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="drawer-header flex items-center justify-between p-4 border-b border-[var(--color-rule)]">
              <h3 className="font-display font-normal text-ink" style={{ fontSize: 'var(--text-lg)' }}>
                bundle cart (<span id="drawerCountHeader">{count}</span>)
              </h3>
              <button
                onClick={closeBundleDrawer}
                className="btn-icon p-1 text-muted hover:text-ink"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="drawer-body flex-1 overflow-y-auto p-4">
              {count === 0 ? (
                <div id="drawerEmptyState" className="drawer-empty text-center py-4xl text-muted">
                  <p className="drawer-empty-title font-body text-lg mb-2">your cart is empty.</p>
                  <p className="drawer-empty-sub text-sm">
                    select skills from the grid to build a custom multi-skill package.
                  </p>
                </div>
              ) : (
                <div id="drawerItemsList" className="drawer-items-list space-y-2">
                  {Array.from(selectedSlugs).map((slug) => (
                    <motion.div
                      key={slug}
                      className="drawer-item-chip flex items-center justify-between p-3 bg-secondary border border-[var(--color-rule)] rounded-md"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <span className="drawer-item-title font-body text-sm text-ink">/{slug}</span>
                      <button
                        className="drawer-item-remove btn-icon p-1 text-muted hover:text-danger"
                        onClick={() => toggleSkill(slug)}
                        title="Remove from bundle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="drawer-footer p-4 border-t border-[var(--color-rule)] space-y-2">
              <motion.button
                className="btn-accent w-full justify-center"
                onClick={() => {}}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4 mr-1" />
                download custom bundle (.zip)
              </motion.button>
              <motion.button
                className="btn-ghost w-full justify-center"
                onClick={openPromptStackerModal}
                whileTap={{ scale: 0.98 }}
              >
                <Copy className="w-4 h-4 mr-1" />
                stack selected into prompt
              </motion.button>
              <motion.button
                className="btn-ghost btn-danger w-full justify-center"
                onClick={clearAll}
                whileTap={{ scale: 0.98 }}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                clear all selected
              </motion.button>
            </div>
          </motion.aside>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

import { Fragment } from 'react';
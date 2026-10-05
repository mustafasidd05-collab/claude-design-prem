'use client';

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { Container } from '@/components/layout';
import { Hero } from '@/components/hero';
import { FloatingDock } from '@/components/feedback/FloatingDock';
import { BundleDrawer } from '@/components/feedback/BundleDrawer';
import { TweaksPanel } from '@/components/feedback/TweaksPanel';
import { ToastProvider } from '@/components/feedback/Toast';
import { useUIStore } from '@/store/ui';
import { getDomainPills } from '@/services/skills';
import { X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const CatalogTab = lazy(() => import('@/components/catalog/CatalogTab').then(m => ({ default: m.CatalogTab })));
const FlowchartsTab = lazy(() => import('@/components/flowcharts/FlowchartsTab').then(m => ({ default: m.FlowchartsTab })));
const BlueprintsTab = lazy(() => import('@/components/blueprints/BlueprintsTab').then(m => ({ default: m.BlueprintsTab })));
const RecipesTab = lazy(() => import('@/components/recipes/RecipesTab').then(m => ({ default: m.RecipesTab })));

const tabs = [
  { key: 'catalog', label: 'skills' },
  { key: 'flowcharts', label: 'flowcharts' },
  { key: 'blueprints', label: 'blueprints' },
  { key: 'recipes', label: 'recipes' },
] as const;

function TabContent() {
  const { activeTab } = useUIStore();
  
  switch (activeTab) {
    case 'catalog':
      return <CatalogTab />;
    case 'flowcharts':
      return <FlowchartsTab />;
    case 'blueprints':
      return <BlueprintsTab />;
    case 'recipes':
      return <RecipesTab />;
    default:
      return <CatalogTab />;
  }
}

function SkeletonLoader() {
  return (
    <div className="flex items-center justify-center py-4xl">
      <motion.div 
        className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function TabButton({ tab, domainPills }: { tab: typeof tabs[0]; domainPills: { key: string; label: string; count: number }[] }) {
  const { activeTab, setActiveTab } = useUIStore();
  const pill = domainPills.find(p => p.key === tab.key.toUpperCase());
  
  return (
    <motion.button
      className={`tab-btn font-body text-sm font-medium lowercase transition-colors duration-micro px-3 py-1 ${activeTab === tab.key ? 'text-ink' : 'text-muted'}`}
      onClick={() => setActiveTab(tab.key as any)}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {tab.label} <span className="ml-1 text-[10px] opacity-50">({pill?.count || 0})</span>
    </motion.button>
  );
}

export function App() {
  const { activeTab, setActiveTab, cmdPaletteOpen, closeCmdPalette, tweaksOpen, toggleTweaks } = useUIStore();
  const [domainPills, setDomainPills] = useState<{ key: string; label: string; count: number }[]>([]);
  
  useEffect(() => {
    const pills = getDomainPills();
    setDomainPills(pills);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        <Container>
          <motion.div 
            className="discovery-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div 
              className="tabs-container flex items-center justify-between gap-md mb-xl border-b border-[var(--color-rule)] pb-xs flex-wrap"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <motion.div className="tabs flex gap-2xs relative" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <motion.div
                  className="tab-glider absolute bottom-[-1px] h-[2px] bg-accent rounded-[1px] transition-all duration-short ease-out"
                  style={{
                    left: tabs.findIndex(t => t.key === activeTab) * 120,
                    width: 100,
                  }}
                />
                {tabs.map((tab) => (
                  <TabButton key={tab.key} tab={tab} domainPills={domainPills} />
                ))}
              </motion.div>
              
              <motion.div className="view-controls-bar flex gap-2xs" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <motion.button
                  className="btn-view-toggle flex items-center justify-center w-8.5 h-8.5 bg-secondary border border-[var(--color-rule)] rounded-sm text-muted cursor-pointer transition-all duration-micro"
                  onClick={() => {}}
                  whileTap={{ scale: 0.95 }}
                  title="Grid view"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </motion.button>
                <motion.button
                  className="btn-view-toggle flex items-center justify-center w-8.5 h-8.5 bg-secondary border border-[var(--color-rule)] rounded-sm text-muted cursor-pointer transition-all duration-micro"
                  onClick={() => {}}
                  whileTap={{ scale: 0.95 }}
                  title="List view"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
            
            <Suspense fallback={<SkeletonLoader />}>
              <TabContent />
            </Suspense>
          </motion.div>
        </Container>
      </main>
      
      <Footer />
      
      <FloatingDock />
      <BundleDrawer />
      <TweaksPanel />
      <ToastProvider />
      
      {/* Command Palette */}
      {cmdPaletteOpen && (
        <motion.div
          className="modal-backdrop fixed inset-0 z-[var(--z-modal)] bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCmdPalette}
        >
          <motion.div
            className="cmd-palette-card fixed top-1/4 left-1/2 -translate-x-1/2 z-[var(--z-modal)] w-full max-w-2xl bg-paper border border-[var(--color-rule)] rounded-xl shadow-[0_24px_60px_oklch(0%_0_0_/0.5)] overflow-hidden pointer-events-auto"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="cmd-search-row flex items-center gap-3 p-4 border-b border-[var(--color-rule)]">
              <svg className="cmd-search-icon w-5 h-5 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="cmd-input flex-1 bg-transparent border-none outline-none font-body text-base text-ink"
                placeholder="jump to any skill, domain, flowchart, or blueprint... (esc to close)"
                autoFocus
              />
              <kbd className="cmd-badge font-label text-[10px] tracking-micro uppercase text-neutral px-2 py-0.5 border border-[var(--color-rule)] rounded-[4px]">
                ESC
              </kbd>
            </div>
            <div className="cmd-results-list max-h-96 overflow-y-auto">
              <div className="p-8 text-center text-muted">Type to search...</div>
            </div>
            <div className="cmd-footer flex items-center justify-between px-4 py-3 text-xs text-muted border-t border-[var(--color-rule)]">
              <span>use ↑ ↓ to navigate</span>
              <span>↵ to select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
export default App;
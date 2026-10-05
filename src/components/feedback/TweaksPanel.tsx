'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Zap, Move, Minimize2 } from 'lucide-react';
import { useUIStore } from '@/store/ui';
import { cn } from '@/lib/utils';

export function TweaksPanel() {
  const { isOpen, toggleTweaks, theme, setTheme, motion, setMotion, tilt, setTilt } = useUIStore();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            className="fixed inset-0 z-[var(--z-modal)] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleTweaks}
          />
          <motion.aside
            className="tweaks-drawer fixed right-0 top-0 h-full z-[var(--z-modal)] w-80 bg-paper border-l border-[var(--color-rule)] shadow-[-24px_0_60px_oklch(0%_0_0_/0.5)] flex flex-col overflow-hidden pointer-events-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="tweaks-header flex items-center justify-between p-4 border-b border-[var(--color-rule)]">
              <h4 className="font-body font-semibold text-ink">display tweaks</h4>
              <button
                onClick={toggleTweaks}
                className="btn-icon p-1 text-muted hover:text-ink"
                aria-label="Close tweaks panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="tweaks-content flex-1 overflow-y-auto p-4 space-y-6">
              <motion.div
                className="tweak-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block font-label text-[11px] tracking-micro uppercase text-ink/55 mb-2">
                  THEME
                </label>
                <div className="flex gap-2">
                  <motion.button
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-secondary border rounded-md text-sm font-body text-ink-2 transition-all duration-micro',
                      theme === 'dark' && 'bg-accent border-accent text-paper'
                    )}
                    onClick={() => setTheme('dark')}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Moon className="w-4 h-4" />
                    <span>dark</span>
                  </motion.button>
                  <motion.button
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-secondary border rounded-md text-sm font-body text-ink-2 transition-all duration-micro',
                      theme === 'light' && 'bg-accent border-accent text-paper'
                    )}
                    onClick={() => setTheme('light')}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sun className="w-4 h-4" />
                    <span>light</span>
                  </motion.button>
                </div>
              </motion.div>
              
              <motion.div
                className="tweak-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block font-label text-[11px] tracking-micro uppercase text-ink/55 mb-2">
                  MOTION VELOCITY
                </label>
                <select
                  className="select-control w-full"
                  value={motion}
                  onChange={(e) => setMotion(e.target.value as any)}
                >
                  <option value="natural">natural (fluid)</option>
                  <option value="snappy">snappy (linear)</option>
                  <option value="cinematic">cinematic (slow drift)</option>
                  <option value="reduced">reduced (no motion)</option>
                </select>
              </motion.div>
              
              <motion.div
                className="tweak-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block font-label text-[11px] tracking-micro uppercase text-ink/55 mb-2">
                  3D CARD TILT
                </label>
                <div className="tweak-toggle-row flex items-center justify-between">
                  <span className="font-body text-sm text-ink">card perspective physics</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={tilt}
                      onChange={(e) => setTilt(e.target.checked)}
                    />
                    <div className={cn(
                      'w-11 h-6 bg-[var(--color-rule)] rounded-full transition-colors duration-micro',
                      'peer-checked:bg-accent'
                    )}>
                      <motion.div
                        className="w-5 h-5 bg-paper rounded-full transition-transform duration-micro"
                        animate={{ x: tilt ? 24 : 0 }}
                      />
                    </div>
                  </label>
                </div>
              </motion.div>
              
              <motion.div
                className="tweak-item pt-4 border-t border-[var(--color-rule)]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block font-label text-[11px] tracking-micro uppercase text-ink/55 mb-2">
                  REDUCED MOTION
                </label>
                <p className="text-sm text-muted mb-3">
                  Respects system <code className="font-mono text-xs bg-paper-3 px-1.5 py-0.5 rounded">prefers-reduced-motion</code> setting.
                  All animations automatically disable when enabled in OS accessibility preferences.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="w-3 h-3 rounded-full border border-[var(--color-rule)]" />
                  <span>System preference: <strong>Reduced</strong></span>
                </div>
              </motion.div>
            </div>
          </motion.aside>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

import { Fragment } from 'react';
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Download, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: {
    slug: string;
    title: string;
    content: string;
  } | null;
}

export function ReadingModal({ isOpen, onClose, skill }: ReadingModalProps) {
  if (!skill) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop fixed inset-0 z-[var(--z-modal)] bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  );
}

interface KitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  kit: {
    key: string;
    icon: string;
    title: string;
    subtitle: string;
    sizeEstimate: string;
  } | null;
  onConfirm: () => void;
  progress?: number;
}

export function KitConfirmModal({ isOpen, onClose, kit, onConfirm, progress }: KitConfirmModalProps) {
  if (!kit) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            className="modal-backdrop fixed inset-0 z-[var(--z-modal)] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-card spotlight-target fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="w-full max-w-lg bg-paper border border-[var(--color-rule)] rounded-xl shadow-[0_24px_60px_oklch(0%_0_0_/0.5)] overflow-hidden pointer-events-auto">
              <div className="flex items-start justify-between p-6 border-b border-[var(--color-rule)]">
                <div className="flex items-center gap-3">
                  <span className="text-4xl" role="img" aria-label={kit.title}>{kit.icon}</span>
                  <div>
                    <h2 className="confirm-kit-title font-display font-normal text-ink" style={{ fontSize: 'var(--text-xl)', letterSpacing: '-0.01em' }}>
                      {kit.title}
                    </h2>
                    <p className="confirm-kit-sub text-sm text-muted mt-1">{kit.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="btn-icon p-1 text-muted hover:text-ink"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex gap-3 text-sm">
                  <span className="pill px-3 py-1 bg-secondary border border-[var(--color-rule)] rounded-pill font-label text-[10px] tracking-micro uppercase text-ink">
                    {kit.sizeEstimate}
                  </span>
                  <span className="pill px-3 py-1 bg-secondary border border-[var(--color-rule)] rounded-pill font-label text-[10px] tracking-micro uppercase text-ink">
                    format: .zip (skill.md + readme)
                  </span>
                </div>
                
                <div>
                  <div className="manifest-label font-label text-[10px] tracking-micro uppercase text-ink/55 mb-2">
                    INCLUDED SKILLS MANIFEST
                  </div>
                  <div className="manifest-chip-cloud flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span key={i} className="apple-command-tag font-label text-[10px] font-medium lowercase text-ink-2 bg-paper-3 border border-[var(--color-rule)] px-2 py-0.5 rounded-sm">
                        /skill-name-{i + 1}
                      </span>
                    ))}
                  </div>
                </div>
                
                {progress !== undefined && (
                  <div className="progress-bar-container h-1 bg-[var(--color-rule)] rounded-full overflow-hidden">
                    <motion.div
                      className="progress-bar-fill h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                )}
              </div>
              
              <div className="confirm-actions-row flex items-center justify-end gap-3 p-6 border-t border-[var(--color-rule)]">
                <button
                  onClick={onClose}
                  className="btn-ghost"
                >
                  cancel
                </button>
                <motion.button
                  onClick={onConfirm}
                  className="btn-accent"
                  whileTap={{ scale: 0.98 }}
                  disabled={progress !== undefined && progress < 100}
                >
                  {progress !== undefined && progress < 100 ? 'preparing...' : 'download bundle (.zip)'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

interface CmdPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  skills: any[];
}

export function CmdPalette({ isOpen, onClose, skills }: CmdPaletteProps) {
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const results = skills
    .filter(s => 
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.slug.toLowerCase().includes(query.toLowerCase()) ||
      s.domain_key.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 8);
  
  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);
  
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter' && results[selectedIndex]) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            className="modal-backdrop fixed inset-0 z-[var(--z-modal)] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="cmd-palette-card fixed top-1/4 left-1/2 -translate-x-1/2 z-[var(--z-modal)] w-full max-w-2xl bg-paper border border-[var(--color-rule)] rounded-xl shadow-[0_24px_60px_oklch(0%_0_0_/0.5)] overflow-hidden pointer-events-auto"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="cmd-search-row flex items-center gap-3 p-4 border-b border-[var(--color-rule)]">
              <Search className="cmd-search-icon w-5 h-5 text-muted flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                className="cmd-input flex-1 bg-transparent border-none outline-none font-body text-base text-ink"
                placeholder="jump to any skill, domain, flowchart, or blueprint... (esc to close)"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                autoFocus
              />
              <kbd className="cmd-badge font-label text-[10px] tracking-micro uppercase text-neutral px-2 py-0.5 border border-[var(--color-rule)] rounded-[4px]">
                ESC
              </kbd>
            </div>
            <div className="cmd-results-list max-h-96 overflow-y-auto">
              {results.length === 0 ? (
                <div className="p-8 text-center text-muted">No results found</div>
              ) : (
                results.map((skill, i) => (
                  <motion.button
                    key={skill.slug}
                    className={cn(
                      'cmd-item w-full px-4 py-3 flex items-center gap-3 text-left border-b border-[var(--color-rule)] last:border-0 transition-colors duration-micro',
                      i === selectedIndex && 'bg-secondary'
                    )}
                    onClick={() => onClose()}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <span className="apple-command-tag font-label text-[11px] font-medium lowercase text-accent bg-paper-3 border border-[var(--color-rule)] px-2 py-0.5 rounded-sm">
                      /{skill.slug}
                    </span>
                    <span className="font-body text-sm text-ink flex-1">{skill.title}</span>
                    <span className="font-label text-[10px] tracking-micro uppercase text-muted">{skill.domain_key}</span>
                  </motion.button>
                ))
              )}
            </div>
            <div className="cmd-footer flex items-center justify-between px-4 py-3 text-xs text-muted border-t border-[var(--color-rule)]">
              <span>use ↑ ↓ to navigate</span>
              <span>↵ to select</span>
            </div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

interface PromptStackerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSkills: string[];
  allSkills: any[];
  onCopy: () => void;
}

export function PromptStacker({ isOpen, onClose, selectedSkills, allSkills, onCopy }: PromptStackerProps) {
  const selected = allSkills.filter(s => selectedSkills.includes(s.slug));
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            className="modal-backdrop fixed inset-0 z-[var(--z-modal)] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-card spotlight-target fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 pointer-events-none max-w-3xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="w-full bg-paper border border-[var(--color-rule)] rounded-xl shadow-[0_24px_60px_oklch(0%_0_0_/0.5)] overflow-hidden pointer-events-auto">
              <div className="prompt-stacker-header p-6 border-b border-[var(--color-rule)]">
                <h2 className="confirm-kit-title font-display font-normal text-ink" style={{ fontSize: 'var(--text-xl)', letterSpacing: '-0.01em' }}>
                  prompt stacker & instruction compiler
                </h2>
                <p className="section-body text-sm text-muted mt-xs">
                  compose selected skills into a ready-to-paste instruction system for claude code, antigravity, or cursor.
                </p>
              </div>
              <div className="prompt-stacker-body p-6 space-y-4">
                <div className="prompt-meta-row flex items-center justify-between">
                  <span className="pill font-label text-[10px] tracking-micro uppercase text-ink/55">
                    {selectedSkills.length} skills selected
                  </span>
                  <button className="btn-ghost text-sm" onClick={() => {}}>
                    include all filtered
                  </button>
                </div>
                <textarea
                  className="prompt-stacker-textarea w-full h-96 bg-paper-2 border border-[var(--color-rule)] rounded-md p-4 font-mono text-sm text-ink resize-none outline-none"
                  readOnly
                  value={selected.map(s => `/${s.slug}`).join(' ') + '\n\n# Combined prompt would go here...'}
                />
              </div>
              <div className="confirm-actions-row flex items-center justify-end gap-3 p-6 border-t border-[var(--color-rule)]">
                <button onClick={onClose} className="btn-ghost">close</button>
                <motion.button
                  onClick={onCopy}
                  className="btn-accent"
                  whileTap={{ scale: 0.98 }}
                >
                  copy instruction prompt
                </motion.button>
              </div>
            </div>
          </motion.div>
        </Fragment>
      )}
    </AnimatePresence>
  );
}

import { Fragment } from 'react';
import { Search } from 'lucide-react';
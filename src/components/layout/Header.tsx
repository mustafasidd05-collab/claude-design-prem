'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui';
import { useSelectionStore } from '@/store/selection';
import { Button } from '@/components/ui';
import { Command, Search, ShoppingCart, Settings, Menu, X, ChevronDown } from 'lucide-react';

export function Header() {
  const { 
    openCmdPalette, 
    cmdPaletteOpen,
    toggleTweaks,
    tweaksOpen,
    theme,
    setTheme,
  } = useUIStore();
  const { count } = useSelectionStore();
  
  return (
    <header className="site-header sticky top-0 z-[var(--z-sticky)] bg-paper/85 backdrop-blur-[16px] border-b border-[var(--color-rule)]">
      <div className="header-inner max-w-page mx-auto h-[52px] flex items-center justify-between px-gutter">
        <a href="#" className="brand flex items-center gap-xs text-ink no-underline" title="skills portal">
          <span className="brand-mark text-accent text-[14px]">●</span>
          <span className="brand-title font-body font-semibold text-sm tracking-tight">skills</span>
          <span className="brand-count font-label text-[10px] tracking-micro uppercase text-muted bg-paper-2 border border-[var(--color-rule)] px-1.5 py-0.5 rounded-sm">
            448
          </span>
        </a>
        
        <div className="header-actions flex items-center gap-xs">
          <Button 
            variant="icon" 
            size="md"
            onClick={openCmdPalette}
            aria-label="Open command palette (⌘K)"
            className="btn-cmd-trigger"
          >
            <kbd className="font-label text-[11px] px-1.5 py-0.5 border border-[var(--color-rule)] rounded-[4px] bg-paper">
              ⌘K
            </kbd>
          </Button>
          
          <Button 
            variant="ghost" 
            size="md"
            onClick={() => {}}
            className="hidden sm:inline-flex"
          >
            prompt stacker
          </Button>
          
          <Button 
            variant="accent" 
            size="md"
            onClick={() => {}}
            className="relative"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="cart-pill-badge">{count}</span>
          </Button>
          
          <Button 
            variant="icon" 
            size="md"
            onClick={toggleTweaks}
            aria-label="Display tweaks"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
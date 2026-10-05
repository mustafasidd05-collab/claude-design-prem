'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Search, X, Command } from 'lucide-react';
import { useUIStore } from '@/store/ui';

export function SearchBox() {
  const [query, setQuery] = useState('');
  const [showClear, setShowClear] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openCmdPalette } = useUIStore();
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openCmdPalette();
      }
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        inputRef.current?.blur();
        setQuery('');
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [openCmdPalette]);
  
  return (
    <motion.div 
      className="search-box relative flex items-center bg-secondary border border-[var(--color-rule)] rounded-md px-md transition-colors duration-micro"
      whileHover={{ borderColor: 'var(--color-accent)' }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <Search className="search-icon text-muted flex-shrink-0 w-5 h-5" aria-hidden="true" />
      <input
        ref={inputRef}
        type="text"
        id="searchInput"
        className="search-input flex-1 border-none bg-transparent font-body text-sm text-ink py-2 px-1 outline-none lowercase"
        placeholder="search 448 skills by command, title, or tag... (press '/' to focus)"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowClear(e.target.value.length > 0);
        }}
        onFocus={() => setShowClear(query.length > 0)}
        onBlur={() => setTimeout(() => setShowClear(false), 200)}
        autoComplete="off"
        spellCheck={false}
      />
      {showClear && (
        <motion.button
          className="search-clear bg-none border-none text-muted cursor-pointer text-[14px] transition-colors duration-micro"
          onClick={() => { setQuery(''); inputRef.current?.focus(); }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          ×
        </motion.button>
      )}
      <kbd className="search-kbd font-label text-[10px] tracking-[0.05em] uppercase text-neutral px-1.5 py-0.5 border border-[var(--color-rule)] rounded-[4px] ml-xs">
        ⌘K
      </kbd>
    </motion.div>
  );
}
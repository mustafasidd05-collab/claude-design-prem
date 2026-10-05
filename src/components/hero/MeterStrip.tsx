'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function MeterStrip() {
  const [bars, setBars] = useState<number[]>(() => Array(64).fill(0).map(() => Math.random() * 0.3 + 0.1));
  const [peaks, setPeaks] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const animate = () => {
      setBars(prev => prev.map((_, i) => {
        const change = (Math.random() - 0.5) * 0.15;
        const newVal = Math.max(0.05, Math.min(1, prev[i] + change));
        
        // Occasionally create peaks
        if (Math.random() < 0.02) {
          setPeaks(p => [...p, i]);
          setTimeout(() => setPeaks(p => p.filter(idx => idx !== i)), 150);
        }
        
        return newVal;
      }));
    };
    
    intervalRef.current = setInterval(animate, 70);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const index = Math.floor((x / rect.width) * 64);
    
    if (index >= 0 && index < 64) {
      // Create ripple effect
      for (let i = Math.max(0, index - 3); i <= Math.min(63, index + 3); i++) {
        const distance = Math.abs(i - index);
        const boost = (1 - distance / 4) * 0.5;
        setBars(prev => {
          const newBars = [...prev];
          newBars[i] = Math.min(1, prev[i] + boost);
          return newBars;
        });
      }
    }
  };
  
  const handleClick = () => {
    // Pulse all bars
    setBars(prev => prev.map(() => Math.random() * 0.5 + 0.5));
    setPeaks(prev => [...Array(64).keys()]);
    setTimeout(() => setPeaks([]), 300);
  };
  
  return (
    <motion.aside 
      ref={containerRef}
      className="meter grid grid-cols-[auto_1fr_auto] gap-lg items-center px-gutter py-sm border-y border-[var(--color-rule)] font-label cursor-crosshair select-none"
      style={{ userSelect: 'none' }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      whileHover={{ backgroundColor: 'var(--color-paper-2)' }}
    >
      <motion.p 
        className="meter__label meter__label--left text-xs tracking-micro uppercase text-ink/55"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        SKILLS &middot; 448 INDEXED
      </motion.p>
      
      <motion.div 
        className="meter__bars flex gap-[2px] items-end h-7 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {bars.map((height, i) => (
          <motion.span
            key={i}
            className="flex-1 min-w-[1px] bg-accent rounded-[0.5px] opacity-70"
            style={{ 
              height: `${height * 100}%`,
              backgroundColor: peaks.includes(i) ? 'oklch(92% 0.19 60)' : undefined,
              boxShadow: peaks.includes(i) ? '0 0 8px var(--color-accent)' : undefined,
              opacity: peaks.includes(i) ? 1 : undefined,
            }}
            animate={{ height: `${height * 100}%` }}
            transition={{ duration: 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        ))}
      </motion.div>
      
      <motion.p 
        className="meter__label meter__label--right text-xs tracking-micro uppercase text-ink/55"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        DOMAINS &middot; 10 ACTIVE
      </motion.p>
    </motion.aside>
  );
}
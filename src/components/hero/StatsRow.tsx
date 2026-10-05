'use client';

import { motion } from 'framer-motion';

export function StatsRow() {
  const stats = [
    { number: '448', label: 'VERIFIED SKILLS' },
    { number: '10', label: 'CORE DOMAINS' },
    { number: '43', label: 'SUBGROUPS' },
  ];
  
  return (
    <motion.div 
      className="stats-row flex items-center justify-center gap-2xl"
      style={{ '--i': 2 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.46 }}
    >
      {stats.map((stat, i) => (
        <motion.div key={stat.label} className="stat flex flex-col items-center gap-xs">
          <motion.span 
            className="stat__number font-display tabular-nums text-ink"
            style={{ fontSize: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)', letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 20, 
              delay: 0.46 + i * 0.1 
            }}
          >
            {stat.number}
          </motion.span>
          <span className="stat__label font-label text-[11px] tracking-micro uppercase text-ink/55">
            {stat.label}
          </span>
        </motion.div>
      ))}
      <motion.div className="stat__divider w-px h-14 bg-[var(--color-rule)]" />
      <motion.div className="stat__divider w-px h-14 bg-[var(--color-rule)]" />
    </motion.div>
  );
}
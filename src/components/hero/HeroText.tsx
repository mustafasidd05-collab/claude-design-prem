'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export function HeroText() {
  return (
    <div className="hero__text flex flex-col" style={{ '--i': 0 }}>
      <motion.p 
        className="eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      >
        00 &middot; SKILLS DIRECTORY
      </motion.p>
      
      <motion.h1 
        className="hero__title font-display font-normal leading-[1.02] tracking-tight text-ink max-w-[16ch] mb-lg"
        style={{ fontSize: 'clamp(3rem, 5vw + 1rem, 5.5rem)' }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
      >
        code that <em>knows</em>&nbsp;the codebase.
      </motion.h1>
      
      <motion.p 
        className="hero__lede text-lg text-ink-2 max-w-[48ch] leading-[1.55] mb-xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
      >
        448 autonomous agent skills across 10 domains. browse specifications, simulate pipelines, compile bundles &mdash; zero dependencies.
      </motion.p>
      
      <motion.div 
        className="hero__actions flex gap-sm flex-wrap"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
      >
        <Button variant="accent" size="lg" onClick={() => {}}>
          download all 448 skills
        </Button>
        <Button variant="ghost" size="lg" onClick={() => {}}>
          search skills
        </Button>
      </motion.div>
    </div>
  );
}
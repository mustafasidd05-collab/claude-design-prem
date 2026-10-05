'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skill } from '@/types/skill';
import { Checkbox } from '@/components/ui';
import { useSelectionStore } from '@/store/selection';
import { ExternalLink, ChevronRight } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
  index: number;
  viewMode: 'grid' | 'list';
}

export function SkillCard({ skill, index, viewMode }: SkillCardProps) {
  const { toggleSkill, isSelected } = useSelectionStore();
  const selected = isSelected(skill.slug);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <motion.article
      className={cn(
        'skill-apple-card relative bg-secondary border border-[var(--color-rule)] rounded-lg p-lg flex flex-col justify-between',
        'transition-all duration-short ease-out',
        viewMode === 'list' && 'flex-row items-center gap-lg',
        'overflow-hidden'
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.03 }}
      whileHover={{ y: -4, borderColor: 'var(--color-rule-2)' }}
      style={{
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
      }}
    >
      <div className={cn('flex items-start gap-sm', viewMode === 'list' && 'flex-shrink-0 w-[60px]')}>
        <Checkbox
          className="apple-checkbox mt-0.5 flex-shrink-0"
          checked={selected}
          onChange={() => toggleSkill(skill.slug)}
          aria-label={`Select ${skill.title}`}
        />
      </div>
      
      <div className={cn('flex-1 min-w-0', viewMode === 'list' && 'flex-col')}>
        <div className="card-top-row flex items-center justify-between mb-sm">
          <span className="apple-command-tag font-label text-[11px] font-medium lowercase text-ink-2 bg-paper-3 border border-[var(--color-rule)] px-2 py-0.5 rounded-sm">
            /{skill.slug}
          </span>
          <span className="skill-domain-pill font-label text-[10px] tracking-micro uppercase text-accent">
            {skill.domain_key}
          </span>
        </div>
        
        <h3 className="skill-apple-title font-display font-normal text-ink mb-xs" style={{ fontSize: 'var(--text-xl)', letterSpacing: '-0.01em' }}>
          {skill.title}
        </h3>
        
        <p className="skill-apple-desc text-sm text-muted line-clamp-3 mb-lg leading-[1.55]" style={{ maxWidth: '55ch' }}>
          {skill.desc}
        </p>
        
        <div className="skill-apple-footer flex items-center gap-sm pt-sm border-t border-[var(--color-rule)]">
          <span className="font-label text-[10px] tracking-micro uppercase text-ink/55">
            {skill.subgroup_title}
          </span>
          <motion.a
            href={skill.uri_path}
            target="_blank"
            rel="noopener noreferrer"
            className="skill-apple-actions inline-flex items-center gap-1 font-body text-xs font-medium text-accent hover:text-accent-hover"
            whileHover={{ x: 4 }}
          >
            view spec
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </div>
      
      <div className="card-glare" />
    </motion.article>
  );
}
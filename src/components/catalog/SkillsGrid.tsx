'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/types/skill';
import { SkillCard } from './SkillCard';

interface SkillsGridProps {
  skills: Skill[];
  viewMode: 'grid' | 'list';
}

export function SkillsGrid({ skills, viewMode }: SkillsGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  if (skills.length === 0) {
    return (
      <div className="col-span-full text-center py-4xl text-muted">
        No skills found matching your criteria.
      </div>
    );
  }
  
  return (
    <motion.div
      className={cn(
        'skills-apple-grid',
        viewMode === 'grid' 
          ? 'grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-lg' 
          : 'flex flex-col gap-md'
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="list"
      aria-label="Skills catalog"
    >
      {skills.map((skill, index) => (
        <SkillCard 
          key={skill.slug} 
          skill={skill} 
          index={index} 
          viewMode={viewMode}
        />
      ))}
    </motion.div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getSkills, getSkillsByDomain, getSkillsBySubgroup } from '@/services/skills';
import { SearchBox } from './SearchBox';
import { DomainPills } from './DomainPills';
import { SubgroupSelect } from './SubgroupSelect';
import { ViewToggle } from './ViewToggle';
import { SkillsGrid } from './SkillsGrid';
import { Skill } from '@/types/skill';
import { useUIStore } from '@/store/ui';

export function CatalogTab() {
  const { viewMode, activeTab, setActiveTab } = useUIStore();
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDomain, setActiveDomain] = useState('ALL');
  const [activeSubgroup, setActiveSubgroup] = useState('ALL');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getSkills().then(skills => {
      setAllSkills(skills);
      setFilteredSkills(skills);
      setLoading(false);
    });
  }, []);
  
  const filterSkills = useMemo(() => {
    let result = allSkills;
    
    // Domain filter
    if (activeDomain !== 'ALL') {
      result = result.filter(s => s.domain_key === activeDomain);
    }
    
    // Subgroup filter
    if (activeSubgroup !== 'ALL') {
      result = result.filter(s => s.subgroup_key === activeSubgroup);
    }
    
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.title.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.domain_key.toLowerCase().includes(q) ||
        s.subgroup_title.toLowerCase().includes(q)
      );
    }
    
    return result;
  }, [allSkills, activeDomain, activeSubgroup, searchQuery]);
  
  useEffect(() => {
    setFilteredSkills(filterSkills);
  }, [filterSkills]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleDomainChange = (domain: string) => {
    setActiveDomain(domain);
    setActiveSubgroup('ALL');
  };
  
  const handleSubgroupChange = (subgroup: string) => {
    setActiveSubgroup(subgroup);
  };
  
  return (
    <motion.div 
      id="panel-catalog" 
      className="tab-content-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22 }}
    >
      <motion.div className="toolbar" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <SearchBox onSearch={handleSearch} />
        <DomainPills onDomainChange={handleDomainChange} activeDomain={activeDomain} />
        <SubgroupSelect activeDomain={activeDomain} onChange={handleSubgroupChange} />
      </motion.div>
      
      <motion.div 
        className="flex items-center justify-between mb-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <motion.p className="eyebrow">02 &middot; CATALOG</motion.p>
        <ViewToggle />
      </motion.div>
      
      <motion.div 
        id="skillsGrid" 
        className={cn(
          'skills-apple-grid',
          viewMode === 'grid' ? 'grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-lg' : 'flex flex-col gap-md'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-4xl">
            <motion.div 
              className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : filteredSkills.length === 0 ? (
          <motion.div 
            className="col-span-full text-center py-4xl text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            No skills found matching your criteria.
          </motion.div>
        ) : (
          filteredSkills.map((skill, index) => (
            <motion.article
              key={skill.slug}
              className="skill-apple-card relative bg-secondary border border-[var(--color-rule)] rounded-lg p-lg flex flex-col justify-between transition-all duration-short ease-out overflow-hidden"
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
              whileHover={{ y: -4, borderColor: 'var(--color-rule-2)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
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
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
              </div>
              
              <div className="card-glare absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-micro z-5" 
                style={{ background: 'radial-gradient(circle 200px at var(--glare-x, 50%) var(--glare-y, 50%), oklch(76% 0.17 50 / 0.15), transparent 75%)' }}
              />
            </motion.article>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
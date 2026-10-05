import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Skill {
  slug: string;
  title: string;
  desc: string;
  domain_key: string;
  domain_title: string;
  subgroup_key: string;
  subgroup_title: string;
  content: string;
}

interface SelectionState {
  selectedSlugs: Set<string>;
  addSkill: (slug: string) => void;
  removeSkill: (slug: string) => void;
  toggleSkill: (slug: string) => void;
  selectAll: (slugs: string[]) => void;
  clearAll: () => void;
  isSelected: (slug: string) => boolean;
  count: number;
}

export const useSelectionStore = create<SelectionState>()(
  persist(
    (set, get) => ({
      selectedSlugs: new Set<string>(),

      addSkill: (slug) =>
        set((state) => {
          const newSet = new Set(state.selectedSlugs);
          newSet.add(slug);
          return { selectedSlugs: newSet };
        }),

      removeSkill: (slug) =>
        set((state) => {
          const newSet = new Set(state.selectedSlugs);
          newSet.delete(slug);
          return { selectedSlugs: newSet };
        }),

      toggleSkill: (slug) =>
        set((state) => {
          const newSet = new Set(state.selectedSlugs);
          if (newSet.has(slug)) {
            newSet.delete(slug);
          } else {
            newSet.add(slug);
          }
          return { selectedSlugs: newSet };
        }),

      selectAll: (slugs) =>
        set({ selectedSlugs: new Set(slugs) }),

      clearAll: () => set({ selectedSlugs: new Set() }),

      isSelected: (slug) => get().selectedSlugs.has(slug),

      get count() {
        return get().selectedSlugs.size;
      },
    }),
    {
      name: 'skills-portal-selection',
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          if (!item) return null;
          try {
            const parsed = JSON.parse(item);
            return { state: { selectedSlugs: new Set(parsed.state.selectedSlugs) } };
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          const state = value.state as { selectedSlugs: Set<string> };
          localStorage.setItem(name, JSON.stringify({ state: { selectedSlugs: Array.from(state.selectedSlugs) } }));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;

  // Motion
  motion: 'natural' | 'snappy' | 'cinematic' | 'reduced';
  setMotion: (motion: UIState['motion']) => void;

  // 3D Tilt
  tilt: boolean;
  setTilt: (enabled: boolean) => void;

  // Command Palette
  cmdPaletteOpen: boolean;
  openCmdPalette: () => void;
  closeCmdPalette: () => void;

  // Bundle Drawer
  bundleDrawerOpen: boolean;
  openBundleDrawer: () => void;
  closeBundleDrawer: () => void;

  // Tweaks Panel
  tweaksOpen: boolean;
  toggleTweaks: () => void;

  // Floating Dock
  floatingDockActive: boolean;
  setFloatingDockActive: (active: boolean) => void;

  // Active Tab
  activeTab: 'catalog' | 'flowcharts' | 'blueprints' | 'recipes';
  setActiveTab: (tab: UIState['activeTab']) => void;

  // View Mode
  viewMode: 'grid' | 'list';
  setViewMode: (mode: UIState['viewMode']) => void;

  // Toast
  toastMessage: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Theme
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setTheme: (theme) => set({ theme }),

      // Motion
      motion: 'natural',
      setMotion: (motion) => set({ motion }),

      // 3D Tilt
      tilt: true,
      setTilt: (tilt) => set({ tilt }),

      // Command Palette
      cmdPaletteOpen: false,
      openCmdPalette: () => set({ cmdPaletteOpen: true }),
      closeCmdPalette: () => set({ cmdPaletteOpen: false }),

      // Bundle Drawer
      bundleDrawerOpen: false,
      openBundleDrawer: () => set({ bundleDrawerOpen: true }),
      closeBundleDrawer: () => set({ bundleDrawerOpen: false }),

      // Tweaks Panel
      tweaksOpen: false,
      toggleTweaks: () => set((state) => ({ tweaksOpen: !state.tweaksOpen })),

      // Floating Dock
      floatingDockActive: false,
      setFloatingDockActive: (floatingDockActive) => set({ floatingDockActive }),

      // Active Tab
      activeTab: 'catalog',
      setActiveTab: (activeTab) => set({ activeTab }),

      // View Mode
      viewMode: 'grid',
      setViewMode: (viewMode) => set({ viewMode }),

      // Toast
      toastMessage: null,
      showToast: (toastMessage) => set({ toastMessage }),
      hideToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'skills-portal-ui',
      partialize: (state) => ({
        theme: state.theme,
        motion: state.motion,
        tilt: state.tilt,
        viewMode: state.viewMode,
      }),
    }
  )
);
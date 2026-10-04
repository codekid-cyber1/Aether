import { create } from 'zustand';

interface ConfiguratorState {
  // Model state
  primaryColor: string;
  soleColor: string;
  isExplodedView: boolean;
  
  // Actions
  setPrimaryColor: (color: string) => void;
  setSoleColor: (color: string) => void;
  toggleExplodedView: () => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  primaryColor: '#09090b', // Default Obsidian Black
  soleColor: '#ffffff',    // Default White
  isExplodedView: false,

  setPrimaryColor: (color) => set({ primaryColor: color }),
  setSoleColor: (color) => set({ soleColor: color }),
  toggleExplodedView: () => set((state) => ({ isExplodedView: !state.isExplodedView })),
}));
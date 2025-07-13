// Optional Zustand (global filter store)
import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  type: '',
  fuel: '',
  location: '',
  transmission: '',
  minPrice: 0,
  maxPrice: 200,
  search: '',
  setFilters: (filters) => set(filters),
  clearFilters: () => set({
    type: '',
    location: '',
    fuel: '',
    transmission: '',
  }),
}));

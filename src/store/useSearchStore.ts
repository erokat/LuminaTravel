import { create } from 'zustand';

interface SearchState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  setDates: (checkIn: string, checkOut: string) => void;
  setGuests: (adults: number, children: number) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  checkIn: '',
  checkOut: '',
  adults: 2,
  children: 0,
  setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
  setGuests: (adults, children) => set({ adults, children }),
}));

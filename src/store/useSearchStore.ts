import { create } from 'zustand';

interface SearchState {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  destination: string;
  setDates: (checkIn: string, checkOut: string) => void;
  setGuests: (adults: number, children: number) => void;
  setDestination: (destination: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  checkIn: '',
  checkOut: '',
  adults: 2,
  children: 0,
  destination: '',
  setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
  setGuests: (adults, children) => set({ adults, children }),
  setDestination: (destination) => set({ destination }),
}));

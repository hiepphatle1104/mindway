// store/searchStore.ts
import { create } from "zustand";

export interface Place {
  display_name: string;
  lat: string;
  lon: string;
}

interface SearchStore {
  query: string;
  results: Place[];
  loading: boolean;
  setQuery: (q: string) => void;
  searchPlaces: (q: string) => Promise<void>;
}

const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  results: [],
  loading: false,

  setQuery: (q) => set({ query: q }),

  searchPlaces: async (q: string) => {
    if (!q.trim()) {
      set({ results: [] });
      return;
    }
    set({ loading: true });

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}&addressdetails=1&limit=5`
      );
      const data = await res.json();
      set({ results: data, loading: false });
    } catch (err) {
      console.error("Search error:", err);
      set({ loading: false });
    }
  },
}));

export default useSearchStore;

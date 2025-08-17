import { create } from "zustand";

interface MapStore {
  selectedPlace: { lat: number; lng: number; display_name: string } | null;
  mapCenter: [number, number];
  setSelectedPlace: (place: {
    lat: string;
    lon: string;
    display_name: string;
  }) => void;
  setMapCenter: (center: [number, number]) => void;
}

const useMapStore = create<MapStore>((set) => ({
  selectedPlace: null,
  mapCenter: [10.780146665063548, 106.6993442321206] as [number, number], // Initial center
  setSelectedPlace: (place) =>
    set({
      selectedPlace: {
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        display_name: place.display_name,
      },
      mapCenter: [parseFloat(place.lat), parseFloat(place.lon)],
    }),
  setMapCenter: (center) => set({ mapCenter: center }),
}));

export default useMapStore;

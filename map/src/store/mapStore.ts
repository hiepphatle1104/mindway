import { create } from "zustand";

interface MapStore {
  selectedPlace: { lat: number; lng: number; display_name: string } | null;
  origin: { lat: number; lng: number; display_name: string } | null;
  destination: { lat: number; lng: number; display_name: string } | null;
  mapCenter: [number, number];
  setSelectedPlace: (place: {
    lat: string;
    lon: string;
    display_name: string;
  }) => void;
  setOrigin: (
    place: {
      lat: string;
      lon: string;
      display_name: string;
    } | null
  ) => void;
  setDestination: (
    place: {
      lat: string;
      lon: string;
      display_name: string;
    } | null
  ) => void;
  setMapCenter: (center: [number, number]) => void;
  clearAll: () => void;
}

const useMapStore = create<MapStore>((set) => ({
  selectedPlace: null,
  origin: null,
  destination: null,
  mapCenter: [10.780146665065548, 106.6993442321206] as [number, number], // Initial center
  setSelectedPlace: (place) =>
    set({
      selectedPlace: {
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        display_name: place.display_name,
      },
      mapCenter: [parseFloat(place.lat), parseFloat(place.lon)],
    }),
  setOrigin: (place) =>
    set({
      origin: place
        ? {
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
            display_name: place.display_name,
          }
        : null,
    }),
  setDestination: (place) =>
    set({
      destination: place
        ? {
            lat: parseFloat(place.lat),
            lng: parseFloat(place.lon),
            display_name: place.display_name,
          }
        : null,
    }),
  setMapCenter: (center) => set({ mapCenter: center }),
  clearAll: () =>
    set({
      selectedPlace: null,
      origin: null,
      destination: null,
    }),
}));

export default useMapStore;

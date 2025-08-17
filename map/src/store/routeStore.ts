import http from "@/lib/http";
import type { FeatureCollection } from "geojson";
import { create } from "zustand";

interface RouteStore {
  route: FeatureCollection | null;
  getRoute: (
    origin: { lat: number; lng: number },
    dest: { lat: number; lng: number }
  ) => Promise<void>;
}

const useRouteStore = create<RouteStore>((set) => ({
  route: null,
  getRoute: async (origin, dest) => {
    try {
      const url = `route?origin_lat=${origin.lat}&origin_lng=${origin.lng}&dest_lat=${dest.lat}&dest_lng=${dest.lng}`;
      const res = await http.get(url);

      if (res.status === 200)
        set({ route: res.data }); // <-- save route vào zustand
      else console.error("Error fetching route", res.status);
    } catch (err) {
      console.error("Error fetching route", err);
    }
  },
}));

export default useRouteStore;

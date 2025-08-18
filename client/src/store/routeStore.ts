import http from "@/lib/http";
import type { FeatureCollection } from "geojson";
import { create } from "zustand";

interface RouteStore {
  route: FeatureCollection | null;
  length: number | null;
  time: number | null;
  getRoute: (
    origin: { lat: number; lng: number },
    dest: { lat: number; lng: number }
  ) => Promise<void>;
  clearRoute: () => void;
}

const useRouteStore = create<RouteStore>((set) => ({
  route: null,
  length: null,
  time: null,
  getRoute: async (origin, dest) => {
    try {
      const url = `route?origin_lat=${origin.lat}&origin_lng=${origin.lng}&dest_lat=${dest.lat}&dest_lng=${dest.lng}`;
      const res = await http.get(url);

      if (res.status === 200) {
        const geojson = res.data;
        const props = geojson.features[0]?.properties || {};

        set({
          route: geojson, // vẽ tuyến đường
          length: props.length_m ? props.length_m / 1000 : null, // đổi m → km
          time: props.time_s ? props.time_s / 60 : null, // đổi s → phút
        });
        // <-- save route vào zustand
      } else console.error("Error fetching route", res.status);
    } catch (err) {
      console.error("Error fetching route", err);
    }
  },
  clearRoute: () => set({ route: null, length: null, time: null }),
}));

export default useRouteStore;

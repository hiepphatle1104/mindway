import useMapStore from "@/store/mapStore";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapController = () => {
  const { mapCenter } = useMapStore();
  const map = useMap();
  useEffect(() => {
    map.setView(mapCenter, 16);
  }, [map, mapCenter]);
  return null;
};

export default MapController;

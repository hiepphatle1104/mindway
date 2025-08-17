import useMapStore from "@/store/mapStore";
import useRouteStore from "@/store/routeStore";
import Map from "@components/map";

import MapController from "@/components/controller";
import Search from "@/components/search";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { GeoJSON, Marker, Popup } from "react-leaflet";

const origin = { lat: 10.780146665063548, lng: 106.6993442321206 };
const dest = { lat: 10.780723162863866, lng: 106.70317599927128 };

const App = () => {
  const { route, getRoute } = useRouteStore();
  const { selectedPlace, mapCenter } = useMapStore();

  // Fetch route on mount
  useEffect(() => {
    getRoute(origin, dest);
  }, [getRoute]);

  return (
    <div className="relative">
      <Search />
      <Map center={mapCenter} zoomlevel={14}>
        <MapController />
        {selectedPlace && (
          <Marker position={[selectedPlace.lat, selectedPlace.lng]}>
            <Popup>{selectedPlace.display_name}</Popup>
          </Marker>
        )}
        {route && <GeoJSON data={route} />}
      </Map>
    </div>
  );
};

export default App;

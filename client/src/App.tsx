import useMapStore from "@/store/mapStore";
import useRouteStore from "@/store/routeStore";
import Map from "@components/Map";
import MapController from "@components/MapController";
import Prediction from "@components/Prediction";
import Search from "@components/Search";
import Settings from "@components/Settings";
import Sounds from "@components/Sounds";
import { GeoJSON, Marker, Popup, ZoomControl } from "react-leaflet";

const App = () => {
  const { route } = useRouteStore();
  const { selectedPlace, mapCenter, origin, destination } = useMapStore();

  return (
    <div className="relative">
      <Search />
      <Settings />
      <Sounds />
      <Prediction />

      <Map center={mapCenter}>
        <MapController />
        <ZoomControl position="topright" />
        {selectedPlace && (
          <Marker position={[selectedPlace.lat, selectedPlace.lng]}>
            <Popup>{selectedPlace.display_name}</Popup>
          </Marker>
        )}

        {origin && (
          <Marker position={[origin.lat, origin.lng]}>
            <Popup>
              <div className="text-center">
                <div className="font-bold text-blue-600">Origin</div>
                <div>{origin.display_name}</div>
              </div>
            </Popup>
          </Marker>
        )}
        {destination && (
          <Marker position={[destination.lat, destination.lng]}>
            <Popup>
              <div className="text-center">
                <div className="font-bold text-green-600">Destination</div>
                <div>{destination.display_name}</div>
              </div>
            </Popup>
          </Marker>
        )}

        {route && <GeoJSON data={route} />}
      </Map>
    </div>
  );
};

export default App;

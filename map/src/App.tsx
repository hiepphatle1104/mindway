import useMapStore from "@/store/mapStore";
import useRouteStore from "@/store/routeStore";
import Map from "@components/map";

import MapController from "@/components/controller";
import Search from "@/components/search";
import type { FeatureCollection } from "geojson";
import "leaflet/dist/leaflet.css";
import { GeoJSON, Marker, Popup } from "react-leaflet";
import edgeData from "./edges.json";
import nodeData from "./nodes.json";

const edges = edgeData as FeatureCollection;
const nodes = nodeData as FeatureCollection;

const App = () => {
  const { route } = useRouteStore();
  const { selectedPlace, mapCenter, origin, destination } = useMapStore();

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
        {edges && <GeoJSON data={edges} />}
        {nodes && <GeoJSON data={nodes} />}
      </Map>
    </div>
  );
};

export default App;

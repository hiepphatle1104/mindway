import useRouteStore from "@/store/routeStore";
import Map from "@components/map";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { GeoJSON, Marker, Popup } from "react-leaflet";

const origin = { lat: 10.780146665063548, lng: 106.6993442321206 };
const dest = { lat: 10.780723162863866, lng: 106.70317599927128 };

const App = () => {
  const { route, getRoute } = useRouteStore();

  useEffect(() => {
    getRoute(origin, dest);
  }, [getRoute]);

  return (
    <Map center={[10.780146665063548, 106.6993442321206]} zoomlevel={16}>
      {/* Origin */}
      <Marker position={origin}>
        <Popup>High Land Coffee</Popup>
      </Marker>

      {/* Destination */}
      <Marker position={dest}>
        <Popup>Hospital</Popup>
      </Marker>

      {/* Route */}
      {route && <GeoJSON data={route} />}
    </Map>
  );
};

export default App;

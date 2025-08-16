import type { FeatureCollection } from "geojson";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const App = () => {
  const [route, setRoute] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      const res = await fetch(
        "http://127.0.0.1:8000/route?origin_lat=10.780146665063548&origin_lng=106.6993442321206&dest_lat=10.780723162863866&dest_lng=106.70317599927128"
      );
      const data = await res.json();
      setRoute(data);
    };

    fetchRoute();
  }, []);

  return (
    <MapContainer
      center={[10.780146665063548, 106.6993442321206]}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />

      {/* Origin */}
      <Marker position={{ lat: 10.780146665063548, lng: 106.6993442321206 }}>
        <Popup>High Land Coffee</Popup>
      </Marker>

      {/* Destination */}
      <Marker position={{ lat: 10.780723162863866, lng: 106.70317599927128 }}>
        <Popup>Hospital</Popup>
      </Marker>

      {/* Route */}
      {route && <GeoJSON data={route} />}
    </MapContainer>
  );
};

export default App;

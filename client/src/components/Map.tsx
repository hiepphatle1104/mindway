import "leaflet/dist/leaflet.css";
import type { PropsWithChildren } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

interface MapProps extends PropsWithChildren {
  center?: [number, number];
  zoomlevel?: number;
}

const Map = ({ children, center, zoomlevel = 16 }: MapProps) => {
  return (
    <MapContainer
      zoomControl={false}
      center={center}
      zoom={zoomlevel}
      className="h-full w-full z-1"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />

      {children}
    </MapContainer>
  );
};

export default Map;

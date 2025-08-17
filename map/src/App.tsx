import useRouteStore from "@/store/routeStore";
import Map from "@components/map";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
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
    <div className="relative">
      <TextField.Root
        placeholder="Search for place..."
        className="w-96 absolute z-10 top-5 right-5"
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Map center={[10.780146665063548, 106.6993442321206]} zoomlevel={14}>
        <Marker position={origin}>
          <Popup>High Land Coffee</Popup>
        </Marker>

        <Marker position={dest}>
          <Popup>Hospital</Popup>
        </Marker>

        {route && <GeoJSON data={route} />}
      </Map>
    </div>
  );
};

export default App;

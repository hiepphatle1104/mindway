import useMapStore from "@/store/mapStore";
import useRouteStore from "@/store/routeStore";
import useSearchStore from "@/store/searchStore";
import Map from "@components/map";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { GeoJSON, Marker, Popup, useMap } from "react-leaflet";

const origin = { lat: 10.780146665063548, lng: 106.6993442321206 };
const dest = { lat: 10.780723162863866, lng: 106.70317599927128 };

const App = () => {
  const { route, getRoute } = useRouteStore();
  const { query, setQuery, searchPlaces, results } = useSearchStore();
  const { selectedPlace, mapCenter, setSelectedPlace } = useMapStore();

  // Debounce search to avoid spamming API
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) searchPlaces(query);
    }, 400); // Delay 400ms
    return () => clearTimeout(handler);
  }, [query, searchPlaces]);

  // Fetch route on mount
  useEffect(() => {
    getRoute(origin, dest);
  }, [getRoute]);

  // Component to handle map view updates
  const MapController = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(mapCenter, 16); // Update map view when mapCenter changes
    }, [map, mapCenter]);
    return null;
  };

  return (
    <div className="relative h-screen w-full flex">
      {/* Map and Search Bar */}
      <div className="flex-1 relative">
        <div className="w-96 absolute z-10 top-5 right-5">
          <TextField.Root
            placeholder="Search for place..."
            radius="none"
            className="rounded-t!"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size={"3"}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          {results.length > 0 && query && (
            <ul className="bg-white rounded-b border-b border-l border-r border-neutral-400">
              {results.map((r) => (
                <li
                  key={`${r.lat}-${r.lon}`}
                  className="cursor-pointer hover:bg-neutral-100 w-full px-3! py-1! transition-colors ease-in-out select-none"
                  onClick={() => {
                    setSelectedPlace(r);
                    setQuery("");
                  }}
                >
                  {r.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Map center={mapCenter} zoomlevel={14}>
          <MapController /> {/* Update map view based on store */}
          {selectedPlace && (
            <Marker position={[selectedPlace.lat, selectedPlace.lng]}>
              <Popup>{selectedPlace.display_name}</Popup>
            </Marker>
          )}
          {route && <GeoJSON data={route} />}
        </Map>
      </div>
    </div>
  );
};

export default App;

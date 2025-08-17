import useMapStore from "@/store/mapStore";
import useRouteStore from "@/store/routeStore";
import Map from "@components/map";
import {
  faGear,
  faGears,
  faLanguage,
  faMapLocation,
  faMicrophone,
  faUser,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MapController from "@/components/controller";
import Search from "@/components/search";
import "leaflet/dist/leaflet.css";
import { Marker, Popup } from "react-leaflet";

import { useState } from "react";

const SETTINGS_DATA = [
  {
    title: "Cài đặt",
    icon: <FontAwesomeIcon icon={faGears} />,
  },
  {
    title: "Tài khoản",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    title: "Bản đồ",
    icon: <FontAwesomeIcon icon={faMapLocation} />,
  },
  {
    title: "Ngôn ngữ",
    icon: <FontAwesomeIcon icon={faLanguage} />,
  },
];

const App = () => {
  const { route, length, time } = useRouteStore();
  const { selectedPlace, mapCenter, origin, destination } = useMapStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Search />
      <div
        className="absolute top-2 left-14 flex flex-col items-center gap-2 
             bg-white border-2 border-gray-300 rounded-xl shadow-lg p-1 z-[1000]"
      >
        {/* Microphone */}
        <div className="relative group">
          <FontAwesomeIcon
            icon={faMicrophone}
            className="p-1 text-gray-700 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
          />
          {/* Tooltip */}
          <span
            className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                 bg-white text-gray-800 text-md rounded px-2 py-1 whitespace-nowrap
                 transition-opacity duration-200"
          >
            Coming soon
          </span>
        </div>

        {/* Volume */}
        <div className="relative group">
          <FontAwesomeIcon
            icon={faVolumeHigh}
            className="p-1 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
          />
          {/* Tooltip */}
          <span
            className="absolute left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                 bg-white text-gray-800 text-md rounded px-2 py-1 whitespace-nowrap
                 transition-opacity duration-200"
          >
            Coming soon
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 z-[1000]">
        <button
          onClick={() => setOpen(!open)}
          className="w-12 h-12 flex items-center justify-center rounded-full 
               bg-white shadow-lg border border-gray-300 text-gray-700 text-2xl
               hover:bg-gray-100 hover:text-gray-500 transition-all duration-200 cursor-pointer"
        >
          <FontAwesomeIcon icon={faGear} />
        </button>

        {open && (
          <div className="absolute left-14 bottom-0 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-fadeIn">
            {SETTINGS_DATA.map((item, index) => (
              <button
                className="flex items-center w-full gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                key={index}
              >
                <span> {item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {route && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white shadow rounded-lg z-[1000] px-8 py-4">
          <p className="font-semibold text-gray-800">Vận tốc: 30 km/h</p>
          <p className="font-semibold text-gray-800">
            Quãng đường: {length?.toFixed(2)} km
          </p>
          <p className="text-gray-600">
            Thời gian dự tính: {time?.toFixed(0)} phút
          </p>
        </div>
      )}

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
      </Map>
    </div>
  );
};

export default App;

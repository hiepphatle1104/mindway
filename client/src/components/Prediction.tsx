import useRouteStore from "@/store/routeStore";

const Prediction = () => {
  const { route, time, length } = useRouteStore();
  return (
    <>
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
    </>
  );
};

export default Prediction;

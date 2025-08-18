import useMapStore from "@/store/mapStore";
import useRouteStore from "@/store/routeStore";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { ArrowRightIcon } from "lucide-react";

const Routing = () => {
  const { route, getRoute, clearRoute } = useRouteStore();
  const { clearAll, origin, destination } = useMapStore();

  const handleGetDirections = () => {
    if (origin && destination) getRoute(origin, destination);
  };

  const handleCancel = () => {
    clearRoute();
    clearAll();
  };

  return (
    <>
      {!route ? (
        <Button
          size="3"
          disabled={!origin || !destination}
          onClick={handleGetDirections}
        >
          <ArrowRightIcon width="16" height="16" />
          Get Directions
        </Button>
      ) : (
        <Button size="3" variant="soft" color="red" onClick={handleCancel}>
          <Cross1Icon width="16" height="16" />
          Cancel Route
        </Button>
      )}
    </>
  );
};

export default Routing;

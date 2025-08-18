import WebSocketClient from "@/lib/websocket";
import useMapStore from "@/store/mapStore";
import useRouteStore from "@/store/routeStore";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Routing = () => {
  const { route, getRoute, clearRoute, updateRouteFromWebSocket } =
    useRouteStore();
  const { clearAll, origin, destination } = useMapStore();
  const wsClientRef = useRef<WebSocketClient | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleGetDirections = async () => {
    if (origin && destination) {
      setIsConnecting(true);

      try {
        // Connect to WebSocket when getting directions
        if (!wsClientRef.current) {
          wsClientRef.current = new WebSocketClient("ws://localhost:8000/ws");

          wsClientRef.current.onMessage((data) => {
            console.log("Received WebSocket message:", data);

            if (data.type === "route_response") {
              // Handle direct route response from WebSocket
              console.log("Route received via WebSocket:", data.data);
              // Update route store with the received data
              updateRouteFromWebSocket(data.data);
              setIsConnecting(false);
            }

            // Handle server broadcast messages for route updates
            if (data.type === "route_update") {
              console.log("Route update broadcast received:", data.message);
              // Refetch route data from API when server broadcasts an update
              if (origin && destination) {
                console.log("Refetching route data due to server update...");
                getRoute(origin, destination);
              }
            }
          });

          wsClientRef.current.connect();

          // Wait a bit for connection to establish
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        // Send route request through WebSocket
        if (wsClientRef.current && wsClientRef.current.isConnected()) {
          wsClientRef.current.send({
            type: "route_request",
            origin_lat: origin.lat,
            origin_lng: origin.lng,
            dest_lat: destination.lat,
            dest_lng: destination.lng,
            avg_speed: 30,
            timestamp: new Date().toISOString(),
          });
        } else {
          // Fallback to API if WebSocket is not connected
          console.log("WebSocket not connected, falling back to API");
          await getRoute(origin, destination);
          setIsConnecting(false);
        }
      } catch (error) {
        console.error("Error getting directions:", error);
        // Fallback to API
        await getRoute(origin, destination);
        setIsConnecting(false);
      }
    }
  };

  const handleCancel = () => {
    // Disconnect WebSocket when canceling
    if (wsClientRef.current) {
      wsClientRef.current.disconnect();
      wsClientRef.current = null;
    }

    setIsConnecting(false);
    clearRoute();
    clearAll();
  };

  // Cleanup WebSocket on component unmount
  useEffect(() => {
    return () => {
      if (wsClientRef.current) {
        wsClientRef.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      {!route ? (
        <Button
          size="3"
          disabled={!origin || !destination || isConnecting}
          onClick={handleGetDirections}
        >
          <ArrowRightIcon width="16" height="16" />
          {isConnecting ? "Getting Route..." : "Get Directions"}
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

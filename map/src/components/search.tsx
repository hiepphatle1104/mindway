import useMapStore from "@/store/mapStore";
import useRouteStore from "@/store/routeStore";
import useSearchStore from "@/store/searchStore";
import {
  ArrowRightIcon,
  Cross1Icon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";

const Search = () => {
  const { setQuery, searchPlaces, results } = useSearchStore();
  const { setOrigin, setDestination, origin, destination, clearAll } =
    useMapStore();
  const { getRoute, route, clearRoute } = useRouteStore();
  const [searchType, setSearchType] = useState<"origin" | "destination">(
    "origin"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce search to avoid spamming API
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery) searchPlaces(searchQuery);
    }, 400); // Delay 400ms
    return () => clearTimeout(handler);
  }, [searchQuery, searchPlaces]);

  const handlePlaceSelect = (place: any) => {
    if (searchType === "origin") {
      setOrigin(place);
    } else {
      setDestination(place);
    }
    setSearchQuery("");
    setQuery("");
  };

  const handleGetDirections = () => {
    if (origin && destination) {
      getRoute(origin, destination);
    }
  };

  const handleCancel = () => {
    clearRoute();
    clearAll();
  };

  const clearOrigin = () => {
    setOrigin(null);
    clearRoute();
  };
  const clearDestination = () => {
    setDestination(null);
    clearRoute();
  };

  return (
    <Card size="3" className="w-96 absolute! z-10 top-5 right-5">
      <Flex direction="column" gap="4">
        {/* Header */}
        <Box>
          <Text size="5" weight="bold">
            Set Directions
          </Text>
          <Text size="2" color="gray">
            Search for your origin and destination
          </Text>
        </Box>

        {/* Search Type Toggle */}
        <Flex gap="2">
          <Button
            variant={searchType === "origin" ? "solid" : "soft"}
            size="2"
            onClick={() => setSearchType("origin")}
            style={{ flex: 1 }}
          >
            <Cross1Icon width="14" height="14" />
            Origin
          </Button>
          <Button
            variant={searchType === "destination" ? "solid" : "soft"}
            size="2"
            onClick={() => setSearchType("destination")}
            style={{ flex: 1 }}
          >
            <Cross1Icon width="14" height="14" />
            Destination
          </Button>
        </Flex>

        {/* Search Input */}
        <Box>
          <TextField.Root
            placeholder={`Search for ${searchType}...`}
            size="3"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon width="16" height="16" />
            </TextField.Slot>
          </TextField.Root>

          {/* Search Results */}
          {results.length > 0 && searchQuery && (
            <Card size="2" className="mt-2 max-h-48 overflow-y-auto">
              {results.map((r) => (
                <Box
                  key={`${r.lat}-${r.lon}`}
                  className="cursor-pointer hover:bg-gray-50 p-3 transition-colors ease-in-out select-none border-b last:border-b-0"
                  onClick={() => handlePlaceSelect(r)}
                >
                  <Text size="2" weight="medium">
                    {r.display_name}
                  </Text>
                </Box>
              ))}
            </Card>
          )}
        </Box>

        <Separator />

        {/* Selected Places Display */}
        <Box>
          <div className="flex flex-col">
            <Text size="2" weight="bold" color="gray">
              Selected Locations
            </Text>

            {!origin && !destination && (
              <Text size="2" color="gray" className="text-left py-4">
                No locations selected yet
              </Text>
            )}
          </div>

          {origin && (
            <Card size="2" className="mb-2 bg-blue-50 border-blue-200">
              <Flex align="center" justify="between">
                <Flex align="center" gap="2">
                  <Badge color="blue" variant="soft">
                    Origin
                  </Badge>
                  <Text size="2" className="text-blue-800">
                    {origin.display_name}
                  </Text>
                </Flex>
                <Button
                  size="1"
                  variant="ghost"
                  color="red"
                  onClick={clearOrigin}
                >
                  <Cross1Icon width="12" height="12" />
                </Button>
              </Flex>
            </Card>
          )}

          {destination && (
            <Card size="2" className="mb-2 bg-green-50 border-green-200">
              <Flex align="center" justify="between">
                <Flex align="center" gap="2">
                  <Badge color="green" variant="soft">
                    Destination
                  </Badge>
                  <Text size="2" className="text-green-800">
                    {destination.display_name}
                  </Text>
                </Flex>
                <Button
                  size="1"
                  variant="ghost"
                  color="red"
                  onClick={clearDestination}
                >
                  <Cross1Icon width="12" height="12" />
                </Button>
              </Flex>
            </Card>
          )}
        </Box>

        {/* Direction Button */}
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
      </Flex>
    </Card>
  );
};

export default Search;

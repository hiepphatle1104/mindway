import useMapStore from "@/store/mapStore";
import useSearchStore from "@/store/searchStore";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { useEffect } from "react";

const Search = () => {
  const { query, setQuery, searchPlaces, results } = useSearchStore();
  const { setSelectedPlace } = useMapStore();

  // Debounce search to avoid spamming API
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) searchPlaces(query);
    }, 400); // Delay 400ms
    return () => clearTimeout(handler);
  }, [query, searchPlaces]);

  return (
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
  );
};

export default Search;

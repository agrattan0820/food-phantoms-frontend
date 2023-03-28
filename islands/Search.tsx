import { useMemo, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { Button } from "../components/Button.tsx";
import { Kitchen } from "../types/kitchen.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/search.tsx";

interface SearchProps {
  kitchens: Kitchen[];
}

export default function Search({ kitchens }: SearchProps) {
  const [input, setInput] = useState("");

  const handleOnInput = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const { value } = e.currentTarget;
    setInput(value);
  };

  const searchResults = useMemo(() => {
    return kitchens.filter((kitchen) => {
      return kitchen.name.toLowerCase().includes(input);
    });
  }, [kitchens, input]);

  return (
    <form class="group relative max-w-xl z-10">
      <div class="flex items-center border(black 2) rounded-lg px-6 bg-white focus-within:(bg-gray-100)">
        <IconSearch class="relative w-6 h-6" />
        <input
          class="relative px-4 py-3 text-2xl outline-none focus-visible:(bg-gray-100)"
          type="text"
          name="search"
          value={input}
          onInput={handleOnInput}
          disabled={!IS_BROWSER}
        />
        {input !== "" && searchResults.length > 0 && (
          <ul class="absolute -z-10 origin-bottom pt-8 left-0 right-0 top-8 max-h-64 overflow-hidden w-full bg-white rounded-lg border(black 2)">
            {searchResults.map((result, i) => (
              <li key={i} class="hover:bg-gray-100 px-6 py-4">
                {result.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}

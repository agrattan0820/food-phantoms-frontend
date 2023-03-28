import { useMemo, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { Button } from "../components/Button.tsx";
import { Kitchen } from "../types/kitchen.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import IconSearch from "tabler/search.tsx";

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
    <form class="group relative w-full max-w-xl z-10">
      <div class="relative z-10 flex items-center border(black 2) rounded-lg px-6 bg-white">
        <IconSearch class="relative w-6 h-6" />
        <input
          class="relative w-full px-4 py-3 md:text-2xl outline-none"
          type="text"
          name="search"
          value={input}
          onInput={handleOnInput}
          disabled={!IS_BROWSER}
        />
      </div>
      {input !== "" && searchResults.length > 0 && (
        <ul class="absolute pt-8 left-0 right-0 top-8 max-h-64 overflow-hidden w-full bg-white rounded-lg border(black 2)">
          {searchResults.map((result, i) => (
            <li key={i}>
              <a
                href={`/${result.slug}`}
                class="hover:bg-gray-100 text-sm md:text-base block px-6 py-4"
              >
                {result.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

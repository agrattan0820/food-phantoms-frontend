import { useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { Button } from "../components/Button.tsx";
import { Kitchen } from "../types/kitchen.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import IconSearch from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/search.tsx";

interface SearchProps {
  kitchens: Kitchen[];
}

export default function Search({ kitchens }: SearchProps) {
  const [input, setValue] = useState("");

  const handleOnInput = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const { value } = e.currentTarget;
    console.log(value);
    setValue(value);
  };

  return (
    <form class="group flex items-center border(black 2) rounded-lg px-6 max-w-xl hover:(bg-gray-100) focus-within:(ring(2 gray-600))">
      <IconSearch class="w-6 h-6" />
      <input
        class="px-4 py-3 text-2xl outline-none group-hover:(bg-gray-100)"
        type="text"
        name="search"
        value={input}
        onInput={handleOnInput}
        disabled={!IS_BROWSER}
      />
    </form>
  );
}

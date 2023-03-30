import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Input(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      // disabled={!IS_BROWSER || props.disabled}
      class="relative w-full px-4 py-3 md:text-lg outline-none border(2 black) rounded-lg"
    />
  );
}

export function SearchInput(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="relative w-full px-4 py-3 md:text-2xl outline-none search-input"
    />
  );
}

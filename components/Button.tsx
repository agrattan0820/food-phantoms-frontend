import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 flex justify-center items-center gap-0.5 text-sm md:text-base rounded-lg transition border(black 2) hover:bg-gray-100"
    />
  );
}
export function SubmitButton(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="submit"
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 flex justify-center items-center gap-0.5 text-sm md:text-base rounded-lg transition border(black 2) hover:bg-gray-100"
    />
  );
}

export function LinkButton(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 inline-flex justify-center items-center gap-0.5 text-sm md:text-base rounded-lg transition border(black 2) hover:bg-gray-100"
    />
  );
}

import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

export default function Header() {
  return (
    <div class="flex justify-between w-full max-w-screen-lg p-4 mx-auto">
      <h1 class="font-serif text-3xl">Food Phantoms</h1>
      <Button>Submit a Location</Button>
    </div>
  );
}

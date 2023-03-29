import { Button } from "../components/Button.tsx";
import IconPlus from "tabler/plus.tsx";

export default function Header() {
  return (
    <div class="flex justify-between items-center w-full max-w-screen-lg p-4 mx-auto">
      <h1 class="font-serif py-1 text-xl md:text-3xl">
        <a href="/">Food Phantoms</a>
      </h1>
      <Button>
        Add a Location <IconPlus />
      </Button>
    </div>
  );
}

import { Handlers, PageProps } from "$fresh/server.ts";
import { load } from "std/dotenv/mod.ts";

import Header from "../islands/Header.tsx";
import Search from "../islands/Search.tsx";

import { Kitchen } from "../types/kitchen.ts";

export const handler: Handlers<Kitchen[] | null> = {
  async GET(_, ctx) {
    const env = await load();
    const resp = await fetch(
      `${env["API_URL"] ?? Deno.env.get("API_URL")}/kitchens`
    );
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const kitchens: Kitchen[] = await resp.json();
    return ctx.render(kitchens);
  },
};

export default function Home({ data }: PageProps<Kitchen[] | null>) {
  return (
    <>
      <Header />
      <main class="p-4 mx-auto max-w-screen-lg">
        <div class="flex flex-col-reverse items-center gap-6 md:(flex-row justify-between mt-16)">
          <div class="w-full">
            <h2 class="font-serif text-6xl sm:text-8xl mb-4">
              Is This Restaurant a Ghost Kitchen?
            </h2>
            {data && <Search kitchens={data} />}
          </div>
          <img
            src="/food-phantom.svg"
            class="w-32 sm:w-64"
            alt="the food phantom logo: a ghost wearing a chef's hat"
          />
        </div>
      </main>
    </>
  );
}

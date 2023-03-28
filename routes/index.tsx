import Header from "../islands/Header.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Kitchen } from "../types/kitchen.ts";
import Search from "../islands/Search.tsx";
import { load } from "std/dotenv/mod.ts";

export const handler: Handlers<Kitchen[] | null> = {
  async GET(_, ctx) {
    const env = await load();
    const resp = await fetch(`${env["API_URL"]}/kitchens`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const kitchens: Kitchen[] = await resp.json();
    return ctx.render(kitchens);
  },
};

export default function Home({ data }: PageProps<Kitchen[] | null>) {
  console.log(data);

  return (
    <>
      <Header />
      <main class="p-4 mx-auto max-w-screen-lg">
        <div class="mt-16 flex items-center justify-between">
          <div>
            <h2 class="font-serif text-8xl mb-4">
              Is This Restaurant a Ghost Kitchen?
            </h2>
            {data && <Search kitchens={data} />}
          </div>
          <img
            src="/food-phantom.svg"
            class="w-64"
            alt="the food phantom logo: a ghost wearing a chef's hat"
          />
        </div>
      </main>
    </>
  );
}

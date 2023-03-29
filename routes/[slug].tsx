import { Handlers, PageProps } from "$fresh/server.ts";
import { load } from "std/dotenv/mod.ts";
import IconStar from "tabler/star.tsx";

import Header from "../islands/Header.tsx";
import { LinkButton } from "../components/Button.tsx";

import { Kitchen } from "../types/kitchen.ts";
import { Location } from "../types/location.ts";
import { Company } from "../types/company.ts";

interface KitchenBySlugData {
  kitchen: Kitchen;
  locations: Location[];
  runs_in: Company[];
}

const typeMap = {
  virtual: {
    label: "Virtual Kitchen",
    definition:
      "operates out of chain restaurant brick and mortar locations that serve other types of food",
    link: "https://en.wikipedia.org/wiki/Virtual_restaurant",
  },
  ghost: {
    label: "Ghost Kitchen",
    definition:
      "operates out of chain restaurant brick and mortar locations that serve other types of food",
    link: "https://en.wikipedia.org/wiki/Virtual_restaurant",
  },
} as const;

export const handler: Handlers<KitchenBySlugData | null> = {
  async GET(_, ctx) {
    const env = await load();
    try {
      const resp = await fetch(
        `${env["API_URL"] ?? Deno.env.get("API_URL")}/kitchen/${
          ctx.params.slug
        }`
      );
      if (resp.status === 404) {
        return ctx.render(null);
      }
      const kitchen: KitchenBySlugData = await resp.json();
      return ctx.render(kitchen);
    } catch {
      return ctx.renderNotFound();
    }
  },
};

export default function KitchenDetailsPage({
  data,
}: PageProps<KitchenBySlugData | null>) {
  return (
    <>
      <Header />
      <main class="mt-8 p-4 mx-auto max-w-screen-lg">
        {data && (
          <>
            <div class="mb-6 mx-auto md:mx-0 max-w-md">
              {data?.kitchen.logo && (
                <img
                  src={data?.kitchen.logo}
                  class="w-32 sm:w-48"
                  alt="the food phantom logo: a ghost wearing a chef's hat"
                />
              )}
            </div>
            <div class="flex flex-col md:flex-row justify-between items-start gap-8">
              <div class="flex-1 mx-auto max-w-md">
                <h2 class="font-serif text-4xl sm:text-6xl mb-2">
                  {data?.kitchen.name}
                </h2>
                <p class="mb-4">
                  <a
                    class="font-bold hover:underline"
                    href={typeMap[data?.kitchen.type].link}
                  >
                    {typeMap[data?.kitchen.type].label}
                  </a>{" "}
                  - {typeMap[data?.kitchen.type].definition}
                </p>
                {data?.runs_in && data?.runs_in.length > 0 && (
                  <p>
                    Runs out of
                    {data?.runs_in.length === 1 ? (
                      <>
                        {" "}
                        <a
                          href={data?.runs_in[0].website_link}
                          class="font-bold hover:underline"
                        >
                          {data.runs_in[0].name}
                        </a>
                      </>
                    ) : (
                      <>
                        : <br />
                        <ul class="list-disc list-inside">
                          {data.runs_in.map((company, i) => (
                            <li key={i}>
                              <a href={company.website_link}>{company.name}</a>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </p>
                )}
                {data?.kitchen?.parent_id && (
                  <p class="mb-8">
                    Owned by{" "}
                    <a
                      href={data?.kitchen.parent_link ?? ""}
                      class="font-bold hover:underline"
                    >
                      {data?.kitchen.parent_name ?? ""}
                    </a>
                  </p>
                )}
                <div class="flex space-x-4">
                  {data?.kitchen.website_link && (
                    <LinkButton href={data?.kitchen.website_link}>
                      Go to Website
                    </LinkButton>
                  )}
                  {data?.kitchen.doordash_link && (
                    <LinkButton href={data?.kitchen.doordash_link}>
                      Go to Doordash
                    </LinkButton>
                  )}
                </div>
              </div>
              {data?.locations && data?.locations.length > 0 && (
                <div class="rounded-lg border-2 border-black flex-1 mx-auto max-w-xl">
                  <ul class="p-8 space-y-8">
                    {data?.locations.map((location, i) => (
                      <li
                        key={i}
                        class="flex justify-between items-center gap-2"
                      >
                        <p>
                          {location?.address_1}, {location?.city},{" "}
                          {location?.state} {location?.zip_code}
                        </p>
                        <span class="flex">
                          <IconStar class="w-6 h-6 mr-1" />
                          {location?.google_rating.toFixed(1)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}

import { Handlers, PageProps } from "$fresh/server.ts";
import { Kitchen } from "../types/kitchen.ts";

export const handler: Handlers<Kitchen | null> = {
  async GET(_, ctx) {
    const resp = await fetch(
      `${Deno.env.get("API_URL")}/kitchen/${ctx.params.slug}`
    );
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const kitchen: Kitchen = await resp.json();
    return ctx.render(kitchen);
  },
};

export default function KitchenDetailsPage({
  data,
}: PageProps<Kitchen[] | null>) {
  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}

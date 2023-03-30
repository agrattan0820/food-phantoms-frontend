import { Handlers, PageProps } from "$fresh/server.ts";
import { JSX } from "preact";
import { load } from "std/dotenv/mod.ts";

import Header from "../islands/Header.tsx";
import { Input } from "../components/Input.tsx";

import { LinkButton } from "../components/Button.tsx";

const InputLabel = (props: JSX.HTMLAttributes<HTMLLabelElement>) => {
  return <label {...props} class="md:text-lg" />;
};

interface Data {
  success: boolean;
}

export const handler: Handlers<Data | null> = {
  async POST(req, _ctx) {
    const form = await req.formData();

    const env = await load();
    const reqBody = {
      name: form.get("name"),
      doordash_link: form.get("doordash_link"),
      website_link: form.get("website_link") ?? null,
      parent: form.get("parent") ?? null,
    };
    const postLocation = await fetch(
      `${env["API_URL"] ?? Deno.env.get("API_URL")}/add-kitchen`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      }
    );

    const url = new URL(req.url);
    url.href = url.origin + "/";
    url.pathname = "/add-kitchen";

    if (postLocation.ok) {
      url.searchParams.append("success", "true");
      return Response.redirect(url, 303);
    }

    url.searchParams.append("success", "false");
    return Response.redirect(url, 303);
  },
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams;

    if (query && query.toString() !== "") {
      if (query.get("success") === "true") {
        return ctx.render({ success: true });
      } else {
        return ctx.render({ success: false });
      }
    }

    return ctx.render(null);
  },
};

export default function Home({ data }: PageProps<Data | null>) {
  return (
    <>
      <Header />
      <main class="mt-8 p-4 mx-auto max-w-md sm:max-w-xl">
        {data && data.success ? (
          <>
            <h2 class="font-serif text-3xl sm:text-6xl mt-8 mb-2">
              Kitchen Sumbitted! 🎉
            </h2>
            <p class="mb-4 max-w-lg">
              Our team will review the location before approving it and adding
              it to our database of ghost kitchens.
            </p>
            <LinkButton href="/">Back to Homepage</LinkButton>
          </>
        ) : data && !data.success ? (
          <>
            <h2 class="font-serif text-5xl mt-8 mb-2">
              Unable to Submit Kitchen 🥲
            </h2>
            <p class="mb-4">
              Something wrong must've happened, try submitting again or coming
              back another time.
            </p>
            <LinkButton href="/">Back to Homepage</LinkButton>
          </>
        ) : (
          <>
            <h2 class="font-serif text-6xl mb-8">Know a Ghost Kitchen?</h2>
            <form method="POST" class="space-y-10">
              <div>
                <InputLabel for="name">Name of Ghost Kitchen*</InputLabel>
                <Input id="name" name="name" type="text" required />
              </div>
              <div>
                <InputLabel for="doordash_link">DoorDash Link*</InputLabel>
                <Input
                  id="doordash_link"
                  name="doordash_link"
                  type="text"
                  required
                />
              </div>
              <div>
                <InputLabel for="website_link">Website Link</InputLabel>
                <Input id="website_link" name="website_link" type="text" />
              </div>
              <div>
                <InputLabel for="parent">Owned and Operated By</InputLabel>
                <Input id="parent" name="parent" type="text" />
              </div>
              <input
                type="submit"
                class="px-2 py-1 flex justify-center items-center gap-0.5 text-sm md:text-base rounded-lg transition border(black 2) hover:bg-gray-100"
              />
            </form>
          </>
        )}
      </main>
    </>
  );
}

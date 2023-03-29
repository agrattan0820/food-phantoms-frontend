import { AppProps } from "$fresh/server.ts";
import { Head, asset } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <html data-custom="data">
      <Head>
        <title>Food Phantoms</title>
        <link rel="stylesheet" href={asset("/global.css")} />
      </Head>
      <div class="font-sans">
        <Component />
      </div>
    </html>
  );
}

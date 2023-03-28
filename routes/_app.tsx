import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <html data-custom="data">
      <Head>
        <title>Food Phantoms</title>
      </Head>
      <div class="font-sans">
        <Component />
      </div>
    </html>
  );
}

import { PageProps } from "$fresh/server.ts";

export default function Kitchen(props: PageProps) {
  return <div>Hello {props.params.slug}</div>;
}

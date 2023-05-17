import { List } from "~/components/List";
import { useRouteData } from "solid-start";
import { getItems } from "~/get-items";
import { Show } from "solid-js";
import { createServerData$ } from "solid-start/server";

export function routeData() {
  return createServerData$(() => {
    return getItems();
  });
}

export default function Home() {
  const items = useRouteData<typeof routeData>();

  // console.log(items2());

  // const [items] = createSignal({
  //   data: {
  //     listItems: {
  //       data: [
  //         {
  //           id: "just some id",
  //           name: "my item",
  //         },
  //       ],
  //     },
  //   },
  // });

  return (
    <main class="bg-slate-200 dark:bg-slate-950 flex min-h-screen flex-col items-center p-4 text-black dark:text-white">
      <Show when={items()} fallback={<p>loading . . .</p>}>
        {(items) => <List items={items().data.listItems.data} />}
      </Show>
    </main>
  );
}

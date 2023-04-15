import { List } from "~/components/List";
import { ItemsWithId } from "~/constants";

export default function Home() {
  return (
    <main class="bg-slate-200 dark:bg-slate-950 flex min-h-screen flex-col items-center p-4 text-black dark:text-white">
      <List items={ItemsWithId} />
    </main>
  );
}

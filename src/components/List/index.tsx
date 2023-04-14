import { ListItem } from "~/components/ListItem";
import type { Item } from "~/types";
import { createSignal, Component, For, createEffect } from "solid-js";
import {
  BsSortAlphaDown,
  BsSortAlphaDownAlt,
  BsSortNumericDown,
  BsSortNumericDownAlt,
} from "solid-icons/bs";
import { sort, createNewSortInstance } from "fast-sort";
import { isNotNil } from "ramda";

const naturalSort = createNewSortInstance({
  comparer: new Intl.Collator(undefined, { numeric: true, sensitivity: "base" })
    .compare,
});

const SORT_STYLES = {
  ByName: "by-name",
  ByPrice: "by-price",
} as const;

type SortStyles = typeof SORT_STYLES[keyof typeof SORT_STYLES];

const SORT_DIRECTION = {
  Ascendend: "ascendent",
  Descendent: "descendent",
} as const;

type SortDirection = typeof SORT_DIRECTION[keyof typeof SORT_DIRECTION];

type ListProps = {
  items: Item[];
};

export const List: Component<ListProps> = ({ items }) => {
  const [sortStyle, setSortStyle] = createSignal<SortStyles>(
    SORT_STYLES.ByName
  );
  const [sortDirection, setSortDirection] = createSignal<SortDirection>(
    SORT_DIRECTION.Ascendend
  );
  const [sortedItems, setSortedItems] = createSignal(
    naturalSort(items).asc((i) => i.name)
  );

  createEffect(() => {
    if (sortStyle() === SORT_STYLES.ByName) {
      if (sortDirection() === SORT_DIRECTION.Descendent) {
        setSortedItems(naturalSort(items).desc((i) => i.name));
      } else {
        setSortedItems(naturalSort(items).asc((i) => i.name));
      }
    } else {
      if (sortDirection() === SORT_DIRECTION.Descendent) {
        setSortedItems(
          sort(items).desc((i) => (isNotNil(i.price) ? i.price : undefined))
        );
      } else {
        setSortedItems(
          sort(items).asc((i) => (isNotNil(i.price) ? i.price : undefined))
        );
      }
    }
  }, [sortStyle, sortDirection, items]);

  const handleToggleSorting = (style: SortStyles) => () => {
    setSortDirection((old) => {
      console.log(old, SORT_DIRECTION.Ascendend);
      if (sortStyle() !== style) {
        return SORT_DIRECTION.Ascendend;
      }
      if (old === SORT_DIRECTION.Ascendend) {
        return SORT_DIRECTION.Descendent;
      } else {
        return SORT_DIRECTION.Ascendend;
      }
    });
    setSortStyle(style);
  };

  return (
    <div class="flex flex-col gap-4 w-full max-w-screen-sm">
      <div class="flex gap-2 items-center">
        <h2>Ordenar por:</h2>
        <button
          class="flex gap-1 items-center justify-center rounded bg-slate-300 dark:bg-slate-900 p-2 border-slate-400 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 border border-solid"
          onClick={handleToggleSorting(SORT_STYLES.ByName)}
        >
          <div>Nome</div>
          <div class="flex items-center justify-center w-4 text-lg">
            {sortStyle() === SORT_STYLES.ByName ? (
              sortDirection() === SORT_DIRECTION.Ascendend ? (
                <BsSortAlphaDown />
              ) : (
                <BsSortAlphaDownAlt />
              )
            ) : null}
          </div>
        </button>
        <button
          class="flex gap-1 items-center justify-center rounded bg-slate-300 dark:bg-slate-900 p-2 border-slate-400 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 border border-solid"
          onClick={handleToggleSorting(SORT_STYLES.ByPrice)}
        >
          <div>Preço</div>
          <div class="flex items-center justify-center w-4 text-lg">
            {sortStyle() === SORT_STYLES.ByPrice ? (
              sortDirection() === SORT_DIRECTION.Ascendend ? (
                <BsSortNumericDown />
              ) : (
                <BsSortNumericDownAlt />
              )
            ) : null}
          </div>
        </button>
      </div>
      <div class="flex flex-col gap-4">
        <For each={sortedItems()}>{(item, i) => <ListItem {...item} />}</For>
      </div>
    </div>
  );
};

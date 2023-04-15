import type { Component } from "solid-js";
import type { Item } from "~/types";
import { RiMediaImage2Line } from "solid-icons/ri";
import { RiSystemExternalLinkLine } from "solid-icons/ri";
import { isNotNil } from "ramda";

export const ListItem: Component<Item> = ({ name, url, images, price }) => {
  return (
    <div class="rounded bg-slate-300 dark:bg-slate-900 p-4 border-slate-400 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 border border-solid grid gap-4 grid-cols-[auto_1fr]">
      <div class="flex justify-center items-center rounded dark:bg-slate-800 h-32 w-32">
        {images.length === 0 ? <RiMediaImage2Line /> : null}
      </div>
      <div class="flex gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1 justify-between">
          <h2 class="text-lg">{name}</h2>
          <h3>
            {isNotNil(price)
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "BRL",
                }).format(price)
              : "ainda não sabemos"}
          </h3>
        </div>
        <div>
          {isNotNil(url) ? (
            <a
              target="_blank"
              rel="noreferrer nofollow"
              href={url}
              class=" text-2xl"
            >
              <RiSystemExternalLinkLine />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

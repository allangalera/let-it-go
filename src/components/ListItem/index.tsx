import { Component, For, createMemo, createSignal } from "solid-js";
import type { ItemWithID } from "~/types";
import {
  RiMediaImage2Line,
  RiSystemArrowLeftSFill,
  RiSystemArrowRightSFill,
} from "solid-icons/ri";
import { RiSystemExternalLinkLine } from "solid-icons/ri";
import { isEmpty, isNil, isNotNil } from "ramda";
import { Image, Button } from "@kobalte/core";
import { createSlider } from "solid-slider";

export const ListItem: Component<ItemWithID> = ({
  id,
  name,
  url,
  images,
  price,
}) => {
  const [slider, { current, next, prev, moveTo }] = createSlider();

  const isFirst = createMemo(() => current() === 0);
  const isLast = createMemo(() => {
    if (isNil(images)) return false;
    console.log(name, current() === images.length - 1);
    return current() === images.length - 1;
  });
  return (
    <div class="rounded bg-slate-300 dark:bg-slate-900 p-4 border-slate-400 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 border border-solid flex flex-col gap-4 grid-cols-[auto_1fr]">
      {isNotNil(images) && !isEmpty(images) ? (
        <div class="rounded dark:bg-slate-800 w-full aspect-square relative">
          {isFirst() ? null : (
            <Button.Root
              class="absolute z-10 top-[50%] translate-y-[-50%] translate-x-1 left-0 p-2 bg-slate-900 rounded opacity-50"
              onClick={prev}
            >
              <RiSystemArrowLeftSFill />
            </Button.Root>
          )}
          {isLast() ? null : (
            <Button.Root
              class="absolute z-10 top-[50%] translate-y-[-50%] translate-x-[-4px] right-0 p-2 bg-slate-900 rounded opacity-50"
              onClick={next}
            >
              <RiSystemArrowRightSFill />
            </Button.Root>
          )}
          <div
            use:slider
            class="flex relative aspect-square overflow-hidden items-center rounded w-full h-full"
            style={{
              "grid-auto-columns": `repeat(${images.length}, 100%)`,
            }}
          >
            <For each={images}>
              {(image, i) => (
                <div
                  id={`${id}-${i()}`}
                  class="flex items-center justify-center max-h-full w-full h-full"
                >
                  <Image.Root class="max-h-full flex">
                    <Image.Img
                      class="max-h-full object-contain"
                      src={image}
                      alt={name}
                    />
                    <Image.Fallback>
                      <RiMediaImage2Line />
                    </Image.Fallback>
                  </Image.Root>
                </div>
              )}
            </For>
          </div>
        </div>
      ) : null}
      <div class="flex gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1 justify-between">
          <h2 class="text-lg">{name}</h2>
          <h3>
            {isNotNil(price)
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "BRL",
                }).format(price)
              : "valor ainda não definido"}
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

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

export const ListItem: Component<ItemWithID> = ({
  id,
  name,
  url,
  images,
  price,
}) => {
  const [currentImage, setCurrentImage] = createSignal(0);

  const isFirst = createMemo(() => currentImage() === 0);
  const isLast = createMemo(() => {
    if (isNil(images)) return false;
    console.log(name, currentImage() === images.length - 1);
    return currentImage() === images.length - 1;
  });

  const prev = () => {
    if (isNil(images)) return;
    const prevImg = Math.max(currentImage() - 1, 0);
    document.querySelector(`#${id}-${prevImg}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    });
    setCurrentImage(prevImg);
  };
  const next = () => {
    if (isNil(images)) return;
    const nextImg = Math.min(currentImage() + 1, images.length - 1);
    document.querySelector(`#${id}-${nextImg}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "end",
    });
    setCurrentImage(nextImg);
  };
  return (
    <div class="rounded bg-slate-300 dark:bg-slate-900 p-4 border-slate-400 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 border border-solid flex flex-col gap-4 grid-cols-[auto_1fr]">
      {isNotNil(images) && !isEmpty(images) ? (
        <div class="rounded dark:bg-slate-800 w-full aspect-square relative">
          {isFirst() ? null : (
            <Button.Root
              class="absolute top-[50%] translate-y-[-50%] translate-x-1 left-0 p-2 bg-slate-900 rounded opacity-50"
              onClick={prev}
            >
              <RiSystemArrowLeftSFill />
            </Button.Root>
          )}
          {isLast() ? null : (
            <Button.Root
              class="absolute top-[50%] translate-y-[-50%] translate-x-[-4px] right-0 p-2 bg-slate-900 rounded opacity-50"
              onClick={next}
            >
              <RiSystemArrowRightSFill />
            </Button.Root>
          )}
          <div
            class="h-full overflow-x-auto overflow-y-hidden whitespace-nowrap snap-x scroll-smooth grid grid-rows-1"
            style={{
              "grid-template-columns": `repeat(${images.length}, 100%)`,
            }}
          >
            <For each={images}>
              {(image, i) => (
                <div
                  id={`${id}-${i()}`}
                  class="w-full h-full flex items-center justify-center snap-center"
                >
                  <Image.Root class="flex max-h-full">
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

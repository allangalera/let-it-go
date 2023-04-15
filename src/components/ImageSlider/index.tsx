import { Component, For, createMemo, createSignal } from "solid-js";
import { createSlider } from "solid-slider";
import { Image, Button, Dialog } from "@kobalte/core";
import {
  RiMediaFullscreenLine,
  RiMediaImage2Line,
  RiSystemArrowLeftSFill,
  RiSystemArrowRightSFill,
  RiSystemCloseLine,
} from "solid-icons/ri";
import { isNil } from "ramda";
import { DialogImageSlider } from "~/components/DialogImageSlider";

type ImageSliderProps = {
  id: string;
  images: string[];
  name: string;
};

export const ImageSlider: Component<ImageSliderProps> = ({
  id,
  images,
  name,
}) => {
  const [isDialogOpen, setIsDialogOpen] = createSignal(false);
  const [slider, { current, next, prev, moveTo }] = createSlider();

  const isFirst = createMemo(() => current() === 0);
  const isLast = createMemo(() => {
    if (isNil(images)) return false;
    return current() === images.length - 1;
  });

  return (
    <>
      <DialogImageSlider
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        id={id}
        name={name}
        images={images}
      />
      <div class="rounded dark:bg-slate-800 w-full aspect-square relative">
        {isFirst() ? null : (
          <Button.Root
            class="absolute z-10 top-[50%] translate-y-[-50%] translate-x-1 left-0 p-1 bg-slate-900 rounded opacity-50"
            onClick={prev}
          >
            <RiSystemArrowLeftSFill class="text-4xl" />
          </Button.Root>
        )}
        {isLast() ? null : (
          <Button.Root
            class="absolute z-10 top-[50%] translate-y-[-50%] translate-x-[-4px] right-0 p-1 bg-slate-900 rounded opacity-50"
            onClick={next}
          >
            <RiSystemArrowRightSFill class="text-4xl" />
          </Button.Root>
        )}
        <Button.Root
          class="absolute z-10 bottom-0 right-0 p-1"
          onClick={() => setIsDialogOpen(true)}
        >
          <RiMediaFullscreenLine class="text-4xl" />
        </Button.Root>
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
    </>
  );
};

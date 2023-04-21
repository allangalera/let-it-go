import { Component, For, createMemo, createSignal } from "solid-js";
import { createSlider } from "solid-slider";
import { Button } from "@kobalte/core";
import {
  RiMediaFullscreenLine,
  RiSystemArrowLeftSFill,
  RiSystemArrowRightSFill,
} from "solid-icons/ri";
import { isNil } from "ramda";
import { DialogImageSlider } from "~/components/DialogImageSlider";
import { Image } from "~/components/Image";

type ImageSliderProps = {
  id: string;
  images: string[];
  name: string;
};

export const ImageSlider: Component<ImageSliderProps> = (props) => {
  const [isDialogOpen, setIsDialogOpen] = createSignal(false);
  const [slider, { current, next, prev, moveTo }] = createSlider();

  const isFirst = createMemo(() => current() === 0);
  const isLast = createMemo(() => {
    if (isNil(props.images)) return false;
    return current() === props.images.length - 1;
  });

  return (
    <>
      <DialogImageSlider
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        id={props.id}
        name={props.name}
        images={props.images}
      />
      <div class="rounded dark:bg-slate-800 w-full aspect-square relative">
        <div
          use:slider
          class="flex relative aspect-square overflow-hidden items-center rounded w-full h-full"
          style={{
            "grid-auto-columns": `repeat(${props.images.length}, 100%)`,
          }}
        >
          <For each={props.images}>
            {(image, i) => (
              <div
                id={`${props.id}-${i()}`}
                class="flex items-center justify-center max-h-full w-full h-full"
              >
                <Image src={image} alt={props.name} />
              </div>
            )}
          </For>
        </div>
        {isFirst() ? null : (
          <Button.Root
            class="absolute top-[50%] translate-y-[-50%] translate-x-1 left-0 p-1 bg-slate-900 rounded opacity-50"
            onClick={prev}
            aria-label="Previous image"
            title="Previous"
          >
            <RiSystemArrowLeftSFill class="text-4xl" />
          </Button.Root>
        )}
        {isLast() ? null : (
          <Button.Root
            class="absolute top-[50%] translate-y-[-50%] translate-x-[-4px] right-0 p-1 bg-slate-900 rounded opacity-50"
            onClick={next}
            aria-label="Next image"
            title="Next"
          >
            <RiSystemArrowRightSFill class="text-4xl" />
          </Button.Root>
        )}
        <Button.Root
          class="absolute bottom-0 right-0 p-1"
          onClick={() => setIsDialogOpen(true)}
          aria-label="Maximize image slider"
          title="Maximize"
        >
          <RiMediaFullscreenLine class="text-4xl" />
        </Button.Root>
      </div>
    </>
  );
};

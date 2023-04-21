import { Button, Dialog } from "@kobalte/core";
import {
  RiSystemArrowLeftSFill,
  RiSystemArrowRightSFill,
  RiSystemCloseLine,
} from "solid-icons/ri";
import { Accessor, Component, For, createEffect, createMemo } from "solid-js";
import { createSlider } from "solid-slider";
import { Image } from "~/components/Image";

type DialogImageSliderProps = {
  isOpen: Accessor<boolean>;
  onOpenChange: (isOpen: boolean) => void;
  id: string;
  images: string[];
  name: string;
};

export const DialogImageSlider: Component<DialogImageSliderProps> = (props) => {
  const [slider, { current, next, prev, moveTo }] = createSlider();

  createEffect(() => {
    if (props.isOpen()) moveTo(0);
  });

  const isFirst = createMemo(() => current() === 0);
  const isLast = createMemo(() => {
    return current() === props.images.length - 1;
  });

  return (
    <Dialog.Root isOpen={props.isOpen()} onOpenChange={props.onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed w-[100vw] h-[100svh] top-0 left-0 bg-slate-950/20 z-20" />
        <div class="text-black dark:text-white fixed w-[100vw] h-[100svh] top-0 left-0 flex justify-center items-center z-20 p-1">
          <Dialog.Content class="relative bg-slate-300 dark:bg-slate-900 p-2 border-slate-400 dark:border-slate-800 h-full w-full flex flex-col">
            <div class="flex justify-end">
              <Dialog.CloseButton>
                <RiSystemCloseLine class="text-4xl" />
              </Dialog.CloseButton>
            </div>
            <div class="rounded dark:bg-slate-800 relative h-full max-h-[96%]">
              <div
                use:slider
                class="flex relative overflow-hidden items-center rounded h-full w-full ]"
              >
                <For each={props.images}>
                  {(image, i) => (
                    <div
                      id={`${props.id}-${i()}`}
                      class="shrink-0 basis-full h-full flex justify-center"
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
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

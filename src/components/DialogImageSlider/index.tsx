import { Button, Dialog } from "@kobalte/core";
import { isNil } from "ramda";
import {
  RiSystemArrowLeftSFill,
  RiSystemArrowRightSFill,
  RiSystemCloseLine,
} from "solid-icons/ri";
import {
  Accessor,
  Component,
  For,
  createEffect,
  createMemo,
  onMount,
} from "solid-js";
import { createSlider } from "solid-slider";

type DialogImageSliderProps = {
  isOpen: Accessor<boolean>;
  onOpenChange: (isOpen: boolean) => void;
  id: string;
  images: string[];
  name: string;
};

export const DialogImageSlider: Component<DialogImageSliderProps> = ({
  isOpen,
  onOpenChange,
  id,
  name,
  images,
}) => {
  const [slider, { current, next, prev, moveTo }] = createSlider();

  createEffect(() => {
    if (isOpen()) moveTo(0);
  });

  const isFirst = createMemo(() => current() === 0);
  const isLast = createMemo(() => {
    console.log(name, current() === images.length - 1);
    return current() === images.length - 1;
  });

  return (
    <Dialog.Root isOpen={isOpen()} onOpenChange={onOpenChange}>
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
              <div
                use:slider
                class="flex relative overflow-hidden items-center rounded h-full w-full ]"
              >
                <For each={images}>
                  {(image, i) => (
                    <div
                      id={`${id}-${i()}`}
                      class="shrink-0 basis-full h-full flex justify-center"
                    >
                      <img class="object-contain" src={image} alt={name} />
                      {/* <Image.Root class="max-h-full flex">
                      <Image.Img
                        class="max-h-full object-contain"
                        src={image}
                        alt={name}
                      />
                      <Image.Fallback>
                        <RiMediaImage2Line />
                      </Image.Fallback>
                    </Image.Root> */}
                    </div>
                  )}
                </For>
              </div>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

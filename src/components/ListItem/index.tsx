import { Component } from "solid-js";
import type { Item } from "~/types";
import { RiSystemExternalLinkLine } from "solid-icons/ri";
import { isEmpty, isNotNil } from "ramda";
import { ImageSlider } from "~/components/ImageSlider";
import { showDate } from "~/utils";

export const ListItem: Component<Item> = ({
  id,
  name,
  url,
  images,
  price,
  originalPrice,
  dateToPick,
}) => {
  return (
    <>
      <div class="rounded bg-slate-300 dark:bg-slate-900 p-4 border-slate-400 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 border border-solid flex flex-col gap-4 grid-cols-[auto_1fr]">
        {isNotNil(images) && !isEmpty(images) ? (
          <ImageSlider images={images} id={id} name={name} />
        ) : null}
        <div class="flex gap-2 flex-1">
          <div class="flex flex-col gap-2 flex-1 justify-between">
            <div class="flex justify-between gap-4">
              <h2 class="text-lg font-bold">{name}</h2>
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
            {isNotNil(dateToPick) ? (
              <div class="flex justify-between">
                <h3>Retirada {showDate(dateToPick)}</h3>
              </div>
            ) : null}
            <div class="flex justify-between">
              <h3 class="text-slate-500">
                {isNotNil(originalPrice) ? (
                  <>
                    Valor pago:{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "BRL",
                    }).format(originalPrice)}
                  </>
                ) : null}
              </h3>
              <h3>
                {isNotNil(price)
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "BRL",
                    }).format(price)
                  : "valor ainda não definido"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

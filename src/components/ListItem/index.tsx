import { Component } from "solid-js";
import type { Item } from "~/types";
import { RiSystemExternalLinkLine } from "solid-icons/ri";
import { isEmpty, isNotNil } from "ramda";
import { ImageSlider } from "~/components/ImageSlider";
import { showDate } from "~/utils";

export const ListItem: Component<Item> = (props) => {
  return (
    <>
      <div class="rounded bg-slate-300 dark:bg-slate-900 p-4 border-slate-400 dark:border-slate-800 hover:border-slate-500 dark:hover:border-slate-700 border border-solid flex flex-col gap-4 grid-cols-[auto_1fr]">
        {isNotNil(props.images) && !isEmpty(props.images) ? (
          <ImageSlider images={props.images} id={props.id} name={props.name} />
        ) : null}
        <div class="flex gap-2 flex-1">
          <div class="flex flex-col gap-2 flex-1 justify-between">
            <div class="flex justify-between gap-4">
              <h2 class="text-lg font-bold">{props.name}</h2>
              <div>
                {isNotNil(props.url) ? (
                  <a
                    target="_blank"
                    rel="noreferrer nofollow"
                    href={props.url}
                    class=" text-2xl"
                  >
                    <RiSystemExternalLinkLine />
                  </a>
                ) : null}
              </div>
            </div>
            {isNotNil(props.dateToPick) ? (
              <div class="flex justify-between">
                <h3>Retirada {showDate(props.dateToPick)}</h3>
              </div>
            ) : null}
            <div class="flex justify-between">
              <h3 class="text-slate-500">
                {isNotNil(props.originalPrice) ? (
                  <>
                    Valor pago:{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "BRL",
                    }).format(props.originalPrice)}
                  </>
                ) : null}
              </h3>
              <h3>
                {isNotNil(props.price)
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "BRL",
                    }).format(props.price)
                  : "valor ainda não definido"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

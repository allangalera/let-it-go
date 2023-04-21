import { Component } from "solid-js";

type ImageProps = {
  src: string;
  alt: string;
};

const SUPPORTED_IMAGE_RESIZE_WIDTHS = [100, 300, 500, 750, 1000, 1500, 2500];

export const Image: Component<ImageProps> = (props) => {
  return (
    <picture class="max-h-full flex justify-center">
      {SUPPORTED_IMAGE_RESIZE_WIDTHS.reverse().map((size) => (
        <source
          media={`(max-width: ${size}px)`}
          srcset={`${props.src}?width=${size}`}
        />
      ))}
      <img class="max-h-full object-contain" src={props.src} alt={props.alt} />
    </picture>
  );
};

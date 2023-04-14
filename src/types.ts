type Option<T> = T | null | undefined;

export type Item = {
  name: string;
  url: Option<string>;
  images: Array<string>;
  price?: Option<number>;
};

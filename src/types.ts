export type Item = {
  name: string;
  url?: string;
  images?: string[];
  price?: number;
};

export type ID = {
  id: string;
};

export type ItemWithID = Item & ID;

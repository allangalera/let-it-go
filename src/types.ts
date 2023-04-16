type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type YYYY = `2023`;
type DD31 = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`;
type DD30 = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0}`;
type DDMM = `${DD30}/0${4 | 6 | 9}` | `${DD31}/0${5 | 7 | 8}`;
type RawDateString = `${DDMM}/${YYYY}`;

export type Item = {
  name: string;
  url?: string;
  images?: string[];
  price?: number;
  originalPrice?: number;
  dateToPick?: RawDateString;
};

export type ID = {
  id: string;
};

export type ItemWithID = Item & ID;

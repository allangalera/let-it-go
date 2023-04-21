import { Item } from "~/types";
import { z } from "zod";

export const EnvVars = z.object({
  WEBINY_API_URL: z.string(),
  WEBINY_API_KEY: z.string(),
});

export type EnvVars = z.infer<typeof EnvVars>;

const document = `
  {
    listItems(limit: 100) {
      data {
        id
        name
        url
        originalPrice
        price
        dateToPick
        images
      }
    }
  }
`;

type Data = {
  data: {
    listItems: {
      data: Item[];
    };
  };
};

type GetItemsParams = {
  env: EnvVars;
};

export const getItems = async ({ env }: GetItemsParams) => {
  const response = await fetch(env.WEBINY_API_URL, {
    method: "POST",
    body: JSON.stringify({
      query: document,
    }),
    headers: {
      Authorization: `Bearer ${env.WEBINY_API_KEY}`,
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });

  const data = await response.json();

  return data as Data;
};

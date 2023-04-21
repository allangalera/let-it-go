import { Item } from "~/types";
import { z } from "zod";
import got from "got";

const envVar = z.object({
  WEBINY_API_URL: z.string(),
  WEBINY_API_KEY: z.string(),
});

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

const ENV_VAR = envVar.parse(process.env);

const { WEBINY_API_URL, WEBINY_API_KEY } = ENV_VAR;

export const getItems = async () => {
  const response = await got
    .post(WEBINY_API_URL, {
      json: {
        query: document,
      },
      headers: {
        Authorization: `Bearer ${WEBINY_API_KEY}`,
      },
    })
    .json();

  return response as Data;
};

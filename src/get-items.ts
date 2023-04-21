import { gql, GraphQLClient } from "graphql-request";
import { Item } from "~/types";

const graphQLClient = new GraphQLClient(
  "https://dl01g55kyi397.cloudfront.net/cms/read/en-US",
  {
    headers: {
      authorization: `Bearer ${process.env.WEBINY_API_KEY}`,
    },
  }
);

const document = gql`
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
  listItems: {
    data: Item[];
  };
};

export const getItems = () => {
  return graphQLClient.request<Data>(document);
};

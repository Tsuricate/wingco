import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const previewClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHCMS_ENDPOINT,
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_PREVIEW_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URI = 'https://api-sa-east-1.graphcms.com/v2/cl4qqiub002lb01z176ko6z77/master';

export const apolloClient = new ApolloClient({
  uri: API_URI,
  cache: new InMemoryCache()
});

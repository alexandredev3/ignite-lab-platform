import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URI = import.meta.env.VITE_API_URI;
const API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

export const apolloClient = new ApolloClient({
  uri: API_URI,
  headers: {
    'Authorization': `Bearer ${API_ACCESS_TOKEN}`
  },
  cache: new InMemoryCache()
});

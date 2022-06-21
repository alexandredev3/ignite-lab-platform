import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URI = 'https://api-sa-east-1.graphcms.com/v2/cl4ljcdt56mom01yrdswgf7n9/master';

export const apolloClient = new ApolloClient({
  uri: API_URI,
  cache: new InMemoryCache()
});

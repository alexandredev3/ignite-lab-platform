import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import { apolloClient } from "./lib/apollo";
import { Router } from "./router";

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <Router />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;

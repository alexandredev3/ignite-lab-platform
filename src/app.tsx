import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import { apolloClient } from "./lib/apollo";
import { Router } from "./router";

import 'react-toastify/dist/ReactToastify.css';
import "./styles/toast.css";

export function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <Router />
        <ToastContainer icon={false} autoClose={3000} />
      </ApolloProvider>
    </BrowserRouter>
  );
}
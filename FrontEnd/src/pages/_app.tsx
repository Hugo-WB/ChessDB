import "../styles/globals.css";
import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

let MyApp = ({ Component, pageProps }: AppProps) => {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;

import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apollo";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

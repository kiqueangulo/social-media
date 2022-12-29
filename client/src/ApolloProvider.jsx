// import ApolloClient from "apollo-client"
import { ApolloClient } from "@apollo/client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { createHttpLink } from "@apollo/react-hooks"
import { ApolloProvider } from "@apollo/react-hooks"

import App from "./App"

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

function Apollo() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

export default Apollo

import { ApolloClient, InMemoryCache } from "@apollo/client"
import { createHttpLink, ApolloProvider } from "@apollo/react-hooks"

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

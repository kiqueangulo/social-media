import { ApolloClient, InMemoryCache } from "@apollo/client"
import { createHttpLink, ApolloProvider } from "@apollo/react-hooks"
import { setContext } from "apollo-link-context"

import App from "./App"

const httpLink = createHttpLink({
  uri: "http://localhost:5000",
})

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken")

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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

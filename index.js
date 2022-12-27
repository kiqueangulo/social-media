const { ApolloServer } = require("apollo-server")
const gql = require("graphql-tag")
const mongoose = require("mongoose")

const { MONGODB_URI } = require("./config.js")

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`

const resolvers = {
  Query: {
    sayHi: () => "Hello World!",
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

mongoose
  .set("strictQuery", false)
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MONGODB")

    return server
      .listen({ port: 5000 })
      .then(res => console.log(`Server running at ${res.url}`))
  })

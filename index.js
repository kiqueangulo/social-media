const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")
const { MONGODB_URI } = require("./config")

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
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

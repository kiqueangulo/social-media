const userResolvers = require("./users")
const postResolvers = require("./posts")
const commentResolvers = require("./comments")

module.exports = {
  Post: {
    commentCount: parent => parent.comments.length,
    likeCount: parent => parent.likes.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
}

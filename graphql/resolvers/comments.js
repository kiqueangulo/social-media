const { UserInputError, AuthenticationError } = require("apollo-server")

const Post = require("../../models/Post")
const checkAuth = require("../../utils/checkAuth")

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context)

      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        })
      }

      const post = await Post.findById(postId)

      if (!post) {
        throw new UserInputError("Post not found")
      }

      post.comments.unshift({ body, username, createdAt: new Date().toISOString() })

      await post.save()

      return post
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context)

      const post = await Post.findById(postId)

      if (!post) {
        throw new UserInputError("Post not found")
      }

      const commentIndex = post.comments.findIndex(comment => comment.id === commentId)

      if (post.comments[commentIndex].username !== username) {
        throw new AuthenticationError("Action not allowed")
      }

      post.comments.splice(commentIndex, 1)

      await post.save()

      return post
    },
  },
}

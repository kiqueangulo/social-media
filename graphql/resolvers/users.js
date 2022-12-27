const User = require("../../models/User")

module.exports = {
  Mutation: {
    register(_, args, context, info) {
      // TODO: Validate user data
      // TODO: Make sure user doesn't already exist
      // TODO: Hash password and create auth token
    },
  },
}

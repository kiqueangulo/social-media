const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { SECRET_KEY } = require("../../config")
const User = require("../../models/User")

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data
      // TODO: Make sure user doesn't already exist
      // TODO: Hash password and create auth token
      password = await bcrypt.hash(password, 12)

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      })

      const result = await newUser.save()

      const token = jwt.sign(
        {
          id: result.id,
          email: result.email,
          username: result.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      )

      return {
        ...result._doc,
        id: result.id,
        token,
      }
    },
  },
}

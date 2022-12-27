const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserInputError } = require("apollo-server")

const { validateRegisterInput } = require("../../utils/validators")
const User = require("../../models/User")
const { SECRET_KEY } = require("../../config")

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )

      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }

      // Make sure user doesn't already exist
      const user = await User.findOne({ username })

      if (user) {
        throw new UserInputError("Username taken", {
          errors: { username: "This username is taken" },
        })
      }

      // Hash password and create auth token
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

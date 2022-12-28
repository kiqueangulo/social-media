const bcrypt = require("bcrypt")
const { UserInputError } = require("apollo-server")

const { validateRegisterInput, validateLoginInput } = require("../../utils/validators")
const { generateToken } = require("../../utils/jwt")
const User = require("../../models/User")

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

      const token = generateToken(result)

      return {
        ...result._doc,
        id: result._id,
        token,
      }
    },
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password)

      if (!valid) {
        throw new UserInputError("Errors", { errors })
      }

      const user = await User.findOne({ username })

      if (!user) {
        errors.general = "User not found"
        throw new UserInputError("User not found", { errors })
      }

      const match = bcrypt.compare(password, user.password)

      if (!match) {
        errors.general = "Wrong credentials"
        throw new UserInputError("Wrong credentials", { errors })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    },
  },
}

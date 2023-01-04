import React, { useState, useContext } from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { AuthContext } from "../context/auth"
import { useForm } from "../utils/hooks"

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`

function Register(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})

  const { changeValue, handleSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [addUser] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData)

      // TODO: Fix this functionality to redirect after registering
      props.history.push("/")
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values,
  })

  function registerUser() {
    addUser()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <h1>Register</h1>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={values.username}
            onChange={changeValue}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={changeValue}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={changeValue}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={changeValue}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {Object.keys(errors).length > 0 && (
        <div>
          <ul>
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Register

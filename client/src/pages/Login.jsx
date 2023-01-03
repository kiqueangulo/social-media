import React, { useState } from "react"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

import { useForm } from "../utils/hooks"

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`

function Login(props) {
  const [errors, setErrors] = useState({})

  const { changeValue, handleSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  })

  const [loginUser] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result)
      // TODO: Fix this functionality to redirect after registering
      props.history.push("/")
    },
    onError(err) {
      console.log(err.graphQLErrors[0])
      setErrors(err.graphQLErrors[0].extensions.errors)
    },
    variables: values,
  })

  function loginUserCallback() {
    loginUser()
  }

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate>
        <h1>Login</h1>

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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={changeValue}
          />
        </div>

        <button type="submit">Login</button>
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

export default Login

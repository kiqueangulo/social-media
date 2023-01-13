import React, { useContext } from "react"
import { Route, Navigate } from "react-router-dom"

import { AuthContext } from "../context/auth"

// TODO: Figure out why this security component does not work
function AuthRoute({ element: Component, ...rest }) {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Route
        {...rest}
        render={props => (user ? <Navigate replace to="/" /> : <Component {...props} />)}
      />
    </>
  )
}

export default AuthRoute

import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../context/auth"

function Navbar() {
  const { user, logout } = useContext(AuthContext)

  const menuBar = user ? (
    <div>
      <ul>
        <li>
          <Link to="/">{user.username}</Link>
        </li>
        <li>
          <Link onClick={logout}>Logout</Link>
        </li>
      </ul>
    </div>
  ) : (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  )

  return menuBar
}

export default Navbar

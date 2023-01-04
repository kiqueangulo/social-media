import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { AuthProvider } from "./context/auth"
import AuthRoute from "./utils/AuthRoute"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <AuthRoute exact path="/login" element={<Login />} />
          <AuthRoute exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

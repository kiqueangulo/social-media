import { BrowserRouter as Router, Route } from "react-router-dom"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

import "semantic-ui-css/semantic.min.css"
import "./App.css"

function App() {
  return (
    <Router>
      <Route exact path="/" element={Home} />
      <Route exact path="/login" element={Login} />
      <Route exact path="/register" element={Register} />
    </Router>
  )
}

export default App

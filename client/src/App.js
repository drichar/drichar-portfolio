import React, { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import Routes from './Routes'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const userHasAuthenticated = (authenticated) => {
    setIsAuthenticated(authenticated)
  }

  const childProps = {
    isAuthenticated,
    userHasAuthenticated
  }

  const handleLogout = (event) => {
    userHasAuthenticated(false)
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <LinkContainer to="/">
          <Navbar.Brand>drichar.dev</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            {isAuthenticated
              ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              : <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes childProps={childProps} />
    </div>
  )
}

export default App

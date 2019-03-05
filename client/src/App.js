import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Auth } from 'aws-amplify'
import { Navbar, Nav } from 'react-bootstrap'
import Routes from './Routes'
import './App.css'

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)

  const authenticate = async () => {
    try {
      await Auth.currentSession()
      userHasAuthenticated(true)
    } catch (err) {
      if (err !== 'No current user') {
        alert(err)
      }
    }

    setIsAuthenticating(false)
  }

  useEffect(() => {
    authenticate()
  })

  const userHasAuthenticated = (authenticated) => {
    setIsAuthenticated(authenticated)
  }

  const childProps = {
    isAuthenticated,
    userHasAuthenticated
  }

  const handleLogout = async (event) => {
    await Auth.signOut()
    
    userHasAuthenticated(false)

    props.history.push('/login');
  }

  return (
    !isAuthenticating &&
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

export default withRouter(App)

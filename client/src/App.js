import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav } from 'react-bootstrap'
import Routes from './Routes'
import './App.css'

class App extends Component {
  renderNavbar() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <LinkContainer to="/">
          <Navbar.Brand>drichar.dev</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

  render() {
    return (
      <div>
        { this.renderNavbar() }
        <Routes />
      </div>
    )
  }
}

export default App

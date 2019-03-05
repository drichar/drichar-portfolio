import React, { Component } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar } from 'react-bootstrap'
import Routes from './Routes'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>drichar.dev</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Navbar>
        <Routes />
      </div>
    )
  }
}

export default App

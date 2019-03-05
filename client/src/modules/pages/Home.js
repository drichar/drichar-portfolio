import React, { Component } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Jumbotron fluid>
          <Container>
            <h1>Doug's Portfolio</h1>
            <p>This is an app to manage portfolio items.</p>
          </Container>
        </Jumbotron>
      </div>
    )
  }
}

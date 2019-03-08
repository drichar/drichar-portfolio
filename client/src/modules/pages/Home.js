import React, { useState, useEffect } from 'react'
import { Jumbotron, Container, ListGroup, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { API } from 'aws-amplify'
import './Home.css'

function Home(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])

  const getProjects = async () => {
    if (!props.isAuthenticated) {
      return
    }

    try {
      const results = await API.get('projects', '/projects')
      setProjects(results)
    } catch (err) {
      alert(err)
    }

    setIsLoading(false)
  }

  useEffect(
    () => {
      getProjects()
    },
    [props.isAuthenticated]
  )

  const renderProjectsList = (projects) => {
    return [{}].concat(projects).map((project, i) =>
      i > 0 &&
      <LinkContainer key={project.projectid} to={`/projects/${project.projectid}`}>
        <ListGroup.Item action>
          {project.name}
        </ListGroup.Item>
      </LinkContainer>
    );
  }

  const renderLander = () => {
    return (
      <div className="lander">
        <Jumbotron fluid>
          <Container>
            <h1>Manage Portfolio</h1>
            <LinkContainer to="/login">
              <Button variant="primary" size="lg" as="button">Login</Button>
            </LinkContainer>
          </Container>
        </Jumbotron>
      </div>
    )
  }

  const renderProjects = () => {
    return (
      <div className="projects">
        <Container>
          <h1 className="home-title">Projects</h1>
          <LinkContainer key="new" to="/projects/new">
            <Button variant="primary" size="lg" as="button">Create a new project</Button>
          </LinkContainer>
          <ListGroup>
            {!isLoading && renderProjectsList(projects)}
          </ListGroup>
        </Container>
      </div>
    )
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderProjects() : renderLander()}
    </div>
  )
}

export default Home

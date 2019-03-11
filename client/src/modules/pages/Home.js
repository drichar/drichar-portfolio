import React, { useState, useEffect } from 'react'
import { Container, ListGroup, Button } from 'react-bootstrap'
import Spinner from '../components/Spinner'
import { LinkContainer } from 'react-router-bootstrap'
import { API } from 'aws-amplify'
import './Home.css'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const spinner = <Spinner size="lg" color="secondary" margin="5" centered />;

  const getProjects = async () => {
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
    []
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

  return (
    <div className="Home">
      <Container>
        <h1 className="home-title">Projects</h1>
        <LinkContainer key="new" to="/projects/new">
          <Button variant="primary" size="lg" as="button">Create a new project</Button>
        </LinkContainer>
        <ListGroup>
          {isLoading ? spinner : renderProjectsList(projects)}
        </ListGroup>
      </Container>
    </div>
  )
}

export default Home

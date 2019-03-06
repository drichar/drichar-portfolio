import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { API } from 'aws-amplify'
import { s3Upload } from '../../libs/awsLib';
import config from '../../config'
import './NewProject.css'

function NewProject(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)

  const isSubmitDisabled = () => {
    return !name.length || !description.length > 0 || !file || isLoading
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`)
      return
    }

    setIsLoading(true)

    try {
      const image = file ? await s3Upload(file) : null

      await createProject({
        name,
        description,
        url,
        image
      })
      props.history.push('/')
    } catch (err) {
      alert(err)
      setIsLoading(false)
    }
  }

  const createProject = (project) => {
    return API.post('projects', '/projects', {
      body: project
    })
  }

  return (
    <div className="NewProject">
      <h1 className="new-project-title">New Project</h1>
      <Form className="new-project-form" onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            className="new-project-textarea"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="url">
          <Form.Label>URL <small>Optional</small></Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={event => setFile(event.target.files[0])}
          />
        </Form.Group>
        <Button
          size="lg"
          block
          type="submit"
          disabled={isSubmitDisabled()}
        >
          {isLoading ? 'Creating…' : 'Create Project'}
        </Button>
      </Form>
    </div>
  )
}

export default NewProject

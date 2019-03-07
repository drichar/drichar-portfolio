import React, { useState, useEffect } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import { API, Storage } from 'aws-amplify'
import { s3Upload } from '../../libs/awsLib';
import config from '../../config';
import './Projects.css'

function Projects(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [project, setProject] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  const showProject = async () => {
    try {
      let storageUrl
      const result = await API.get('projects', `/projects/${props.match.params.id}`)
      const { image } = result

      if (image) {
        storageUrl = await Storage.get(image)
        setImageUrl(storageUrl)
      }

      setProject(result)
      setName(result.name)
      setDescription(result.description)
      setUrl(result.url)
    } catch (err) {
      alert(err)
    }
  }

  useEffect(
    () => {
      showProject()
    },
    []
  )

  const isSaveBtnDisabled = () => {
    return !name.length || !description.length > 0 || isLoading || isDeleting
  }

  const isDeleteBtnDisabled = () => {
    return isDeleting || isLoading
  }

  const formatFilename = (str) => {
    return str.replace(/^\w+-/, '')
  }

  const saveProject = (project) => {
    return API.put('projects', `/projects/${props.match.params.id}`, {
      body: project
    })
  }

  const handleSubmit = async (event) => {
    let newImage

    event.preventDefault()

    if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`)
      return
    }

    setIsLoading(true)

    try {
      if (file) {
        newImage = await s3Upload(file)
      }

      await saveProject({
        name,
        description,
        url,
        image: newImage || project.image
      })
      props.history.push('/')
    } catch (err) {
      alert(err)
      setIsLoading(false)
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    const confirmed = window.confirm(
      'Are you sure you want to delete this project?'
    )

    if (!confirmed) {
      return
    }

    setIsDeleting(true)
  }

  return (
    <div className="Projects">
      <h1 className="projects-title">Edit Project</h1>
      {project && 
        <Form onSubmit={handleSubmit}>
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
              className="project-textarea"
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
          {project.image && 
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <p>
                <a target="_blank" rel="noopener noreferrer" href={imageUrl}>
                  <Image src={imageUrl} fluid alt={formatFilename(project.image)} />
                </a>
              </p>
            </Form.Group>
          }
          <Form.Group controlId="file">
            {!project.image &&
              <Form.Label>Image</Form.Label>
            }
            <Form.Control
              type="file"
              onChange={event => setFile(event.target.files[0])}
            />
          </Form.Group>

          <div className="save-delete-grid">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={isSaveBtnDisabled()}
            >
              {isLoading ? 'Saving…' : 'Save'}
            </Button>
            <Button
              variant="danger"
              size="lg"
              disabled={isDeleteBtnDisabled()}
              onClick={handleDelete}
            >
              {isDeleting ? 'Deleting…' : 'Delete'}
            </Button>
          </div>
          
        </Form>
      }
    </div>
  )
}

export default Projects

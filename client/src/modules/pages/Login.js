import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import './Login.css'

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isSubmitDisabled = () => {
    return (!email.length > 0 && !password.length > 0) || isLoading
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    setIsLoading(true)

    try {
      await Auth.signIn(email, password)
      props.userHasAuthenticated(true)
      props.history.push('/')
    } catch (err) {
      alert(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="Enter Email"
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button
          size="lg"
          block
          type="submit"
          disabled={isSubmitDisabled()}
        >
          {isLoading ? 'Logging in…' : 'Login'}
        </Button>
      </Form>
    </div>
  )
}

export default Login

import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthenticatedRoute from './modules/components/AuthenticatedRoute'
import UnauthenticatedRoute from './modules/components/UnauthenticatedRoute'
import Home from './modules/pages/Home'
import Login from './modules/pages/Login'
import NotFound from './modules/pages/NotFound'
import NewProject from './modules/pages/NewProject'
import Projects from './modules/pages/Projects'

export default ({ childProps }) =>
  <Switch>
    <Route path="/" exact render={() => (
      childProps.isAuthenticated ? (
        <Home />
      ) : (
        <Redirect to="/login" />
      )
    )} />
    
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <AuthenticatedRoute path="/projects/new" exact component={NewProject} props={childProps} />
    <AuthenticatedRoute path="/projects/:id" exact component={Projects} props={childProps} />

    { /* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>

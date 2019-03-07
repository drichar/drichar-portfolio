import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppliedRoute from './modules/components/AppliedRoute'
import Home from './modules/pages/Home'
import Login from './modules/pages/Login'
import NotFound from './modules/pages/NotFound'
import NewProject from './modules/pages/NewProject'
import Projects from './modules/pages/Projects'

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/projects/new" exact component={NewProject} props={childProps} />
    <AppliedRoute path="/projects/:id" exact component={Projects} props={childProps} />
    { /* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>

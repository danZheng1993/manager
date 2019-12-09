import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import ClientsList from './ClientsList'
import ClientView from './ClientView'

export default () => (
  <div>
    <Route path='/clients' exact component={ClientsList} />
    <Route path='/clients/view/:id' component={ClientView} />
  </div>
)

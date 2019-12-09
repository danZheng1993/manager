import React from 'react'
import { Route } from 'react-router-dom'
import JobsList from './JobsList'
import JobView from './JobView'

export default () => (
  <div>
    <Route path='/jobs' exact component={JobsList} />
    <Route path='/jobs/view/:id' component={JobView} />
  </div>
)

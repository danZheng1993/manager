import React from 'react'
import { Route } from 'react-router-dom'
import DataBaseList from './DatabaseList'

export default () => (
  <div>
    <Route path='/databases' exact component={DataBaseList} />
  </div>
)

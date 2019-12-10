import React from 'react'
import { Route } from 'react-router-dom'
import NewsEdit from './NewsEdit'
import NewsList from './NewsList'

export default () => (
  <div>
    <Route path='/news' exact component={NewsList} />
    <Route path='/news/edit/:id' component={NewsEdit} />
    <Route path='/news/new' component={NewsEdit} />
  </div>
)

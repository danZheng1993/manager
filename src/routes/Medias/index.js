import React from 'react'
import { Route } from 'react-router-dom'
import MediaEdit from './MediaEdit'
import MediasList from './MediasList'

export default () => (
  <div>
    <Route path='/medias' exact component={MediasList} />
    <Route path='/medias/edit/:id' component={MediaEdit} />
    <Route path='/medias/new' component={MediaEdit} />
  </div>
)

import React from 'react'
import { Route } from 'react-router-dom'
import MediasList from './MediasList'
import MediaView from './MediaView'
import MediaEdit from './MediaEdit'

export default () => (
  <div>
    <Route path='/medias' exact component={MediasList} />
    <Route path='/medias/view/:id' component={MediaView} />
    <Route path='/medias/edit/:id' component={MediaEdit} />
  </div>
)

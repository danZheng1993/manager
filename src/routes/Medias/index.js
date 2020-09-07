import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import MediasList from './MediasList'
import MediaView from './MediaView'
import MediaEdit from './MediaEdit'
import { CustomRoute } from '../CustomRoute';

export default () => (
  <div>
    <CustomRoute path='/medias' exact component={MediasList} checkPath='/medias' />
    <CustomRoute path='/medias/view/:id' component={MediaView} checkPath='/medias' />
    <CustomRoute path='/medias/edit/:id' component={MediaEdit} checkPath='/medias' />
  </div>
);

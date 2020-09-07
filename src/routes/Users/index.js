import React from 'react'
import { Route } from 'react-router-dom'
import UserEdit from './UserEdit'
import UsersList from './UsersList'
import { CustomRoute } from '../CustomRoute';

export default () => (
  <div>
    <CustomRoute path='/users' exact component={UsersList} checkPath='/users' />
    <CustomRoute path='/users/edit/:id' component={UserEdit} checkPath='/users' />
    <CustomRoute path='/users/new' component={UserEdit} checkPath='/users' />
  </div>
)

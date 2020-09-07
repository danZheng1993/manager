import React from 'react'
import NewsEdit from './NewsEdit'
import NewsList from './NewsList'
import { CustomRoute } from '../CustomRoute';

export default () => (
  <div>
    <CustomRoute path='/news' exact component={NewsList} checkPath='/news' />
    <CustomRoute path='/news/edit/:id' component={NewsEdit} checkPath='/news' />
    <CustomRoute path='/news/new' component={NewsEdit} checkPath='/news/new' />
  </div>
)

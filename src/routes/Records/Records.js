import React from 'react'
import RecordEdit from '../RecordEdit'
import RecordsList from '../RecordsList'
import { CustomRoute } from '../CustomRoute';

export default () => (
  <div>
    <CustomRoute path='/records' exact component={RecordsList} checkPath='/records' />
    <CustomRoute path='/records/edit/:id' component={RecordEdit} checkPath='/records' />
    <CustomRoute path='/records/new' component={RecordEdit} checkPath='/records' />
  </div>
)

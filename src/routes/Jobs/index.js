import React from 'react'
import JobsList from './JobsList'
import JobView from './JobView'
import { CustomRoute } from '../CustomRoute';

export default () => (
  <div>
    <CustomRoute path='/jobs' exact component={JobsList} checkPath='/jobs' />
    <CustomRoute path='/jobs/view/:id' component={JobView} checkPath='/jobs' />
  </div>
);

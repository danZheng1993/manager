import React from 'react'
import ClientsList from './ClientsList'
import ClientView from './ClientView'
import { CustomRoute } from '../CustomRoute'

export default () => {
  return (
    <div>
      <CustomRoute path='/clients' exact component={ClientsList} checkPath='/clients' />
      <CustomRoute path='/clients/view/:id' component={ClientView} />
    </div>
  );
}


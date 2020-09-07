import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import ContractsList from './ContractsList'
import ContractView from './ContractView'
import { CustomRoute } from '../CustomRoute'

export default () => {
  return (
    <div>
      <CustomRoute path='/contracts' exact component={ContractsList} checkPath='/contracts' />
      <CustomRoute path='/contracts/view/:id' component={ContractView} checkPath='/contracts' />
    </div>
  );
}


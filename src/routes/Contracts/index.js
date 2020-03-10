import React from 'react'
import { Route } from 'react-router-dom'
import ContractsList from './ContractsList'
import ContractView from './ContractView'

export default () => (
  <div>
    <Route path='/contracts' exact component={ContractsList} />
    <Route path='/contracts/view/:id' component={ContractView} />
  </div>
)

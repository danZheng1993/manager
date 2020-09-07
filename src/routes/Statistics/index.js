import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Transaction from './Transaction'
import Search from './Search'
import { CustomRoute } from '../CustomRoute'

export default () => (
  <div>
    <Route path='/statistics' exact render={() => <Redirect to="/statistics/transaction" />}/>
    <CustomRoute path='/statistics/transaction' component={Transaction} checkPath='/statistics/transaction' />
    <CustomRoute path='/statistics/search' component={Search} checkPath='/statistics/search' />
  </div>
)

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Transaction from './Transaction'

export default () => (
  <div>
    <Route path='/statistics' exact render={() => <Redirect to="/statistics/transaction" />}/>
    <Route path='/statistics/transaction' component={Transaction} />
  </div>
)

import React from 'react'
import { Route } from 'react-router-dom'
import SupportItemEdit from './edit';
import SupportItemList from './list';

export default () => (
  <div>
    <Route path='/customer_support' exact component={SupportItemList} />
    <Route path='/customer_support/edit/:id' component={SupportItemEdit} />
    <Route path='/customer_support/new' component={SupportItemEdit} />
  </div>
)
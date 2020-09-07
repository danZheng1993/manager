import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import SupportItemEdit from './edit';
import SupportItemList from './list';
import { CustomRoute } from '../CustomRoute';

export default () => {
  return (
    <div>
      <CustomRoute path='/customer_support' exact component={SupportItemList} checkPath='/customer_support' />
      <CustomRoute path='/customer_support/edit/:id' component={SupportItemEdit} checkPath='/customer_support' />
      <CustomRoute path='/customer_support/new' component={SupportItemEdit} checkPath='/customer_support' />
    </div>
  );
}

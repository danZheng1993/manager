import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import InvoicesList from './InvoicesList'
import InvoiceView from './InvoiceView'
import InvoicePendingList from './InvoicePendingList'
import { CustomRoute } from '../CustomRoute';

export default () => (
  <div>
    <CustomRoute path='/invoices' exact component={InvoicesList} checkPath='/invoices' />
    <CustomRoute path='/invoices/view/:id' component={InvoiceView} checkPath='/invoices' />
    <CustomRoute path='/invoices/pending' component={InvoicePendingList} checkPath='/invoices/pending' />
  </div>
)


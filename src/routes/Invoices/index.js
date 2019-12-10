import React from 'react'
import { Route } from 'react-router-dom'
import InvoicesList from './InvoicesList'
import InvoiceView from './InvoiceView'
import InvoicePendingList from './InvoicePendingList'

export default () => (
  <div>
    <Route path='/invoices' exact component={InvoicesList} />
    <Route path='/invoices/pending' component={InvoicePendingList} />
    <Route path='/invoices/view/:id' component={InvoiceView} />
  </div>
)

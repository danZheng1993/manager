import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Awards from './Awards'
import Partners from './Partners'
import ProvidersList from './ProvidersList'
import ProvidersPendingList from './ProvidersPendingList'
import ProviderView from './ProviderView'
import ProviderEdit from './ProviderEdit'

export default () => (
  <div>
    <Route path='/providers' exact render={() => <Redirect to="/providers/allowed" />}/>
    <Route path='/providers/allowed' component={ProvidersList} />
    <Route path='/providers/awards' component={Awards} />
    <Route path='/providers/partners' component={Partners} />
    <Route path='/providers/pending' exact component={ProvidersPendingList} />
    <Route path='/providers/pending/check/:id' component={ProviderEdit} />
    <Route path='/providers/view/:id' component={ProviderView} />
    <Route path='/providers/edit/:id' component={ProviderEdit} />
  </div>
)

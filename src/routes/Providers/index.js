import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Awards from './Awards'
import Partners from './Partners'
import ProvidersList from './ProvidersList'
import ProvidersPendingList from './ProvidersPendingList'
import ProviderView from './ProviderView'
import ProviderEdit from './ProviderEdit'
import MyMediaList from '../Medias/MyMediaList'
import { CustomRoute } from '../CustomRoute';

export default () => (
  <div>
    <CustomRoute path='/providers' exact render={() => <Redirect to="/providers/allowed" />} checkPath='/providers/allowed' />
    <CustomRoute path='/providers/allowed' exact component={ProvidersList} checkPath='/providers/allowed' />
    <CustomRoute path='/providers/awards' component={Awards} checkPath='/providers/awards' />
    <CustomRoute path='/providers/partners' component={Partners} checkPath='/providers/partners' />
    <CustomRoute path='/providers/pending' exact component={ProvidersPendingList} checkPath='/providers/pending' />
    <CustomRoute path='/providers/pending/check/:id' component={ProviderEdit} checkPath='/providers/pending' />
    <CustomRoute path='/providers/view/:id' component={ProviderView} checkPath='/providers/allowed' />
    <CustomRoute path='/providers/medias/:id' component={MyMediaList} checkPath='/providers/allowed' />
  </div>
)

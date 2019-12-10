import React from 'react'
import { Route } from 'react-router-dom'
import BannerEdit from './BannerEdit'
import BannersList from './BannersList'

export default () => (
  <div>
    <Route path='/banners' exact component={BannersList} />
    <Route path='/banners/edit/:id' component={BannerEdit} />
    <Route path='/banners/new' component={BannerEdit} />
  </div>
)

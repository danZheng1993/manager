import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import BannerEdit from './BannerEdit'
import BannersList from './BannersList'
import { CustomRoute } from '../CustomRoute';

export default () => {
  return (
    <div>
      <CustomRoute path='/banners' exact component={BannersList} checkPath='/banners' />
      <CustomRoute path='/banners/edit/:id' component={BannerEdit} checkPath='/banners' />
      <CustomRoute path='/banners/new' component={BannerEdit} checkPath='/banners/new' />
    </div>
  );
}

import React from 'react'
import { Route } from 'react-router-dom'
import Splash from './Splash';
import MainSettings from './Settings';
import { CustomRoute } from '../CustomRoute';

export default () => {
  return (
    <div>
      <CustomRoute path='/settings/splash' exact component={Splash} checkPath='/settings/splash' />
      <Route path='/settings/main' exact component={MainSettings} checkPath='/settings/main' />
    </div>
  )
};

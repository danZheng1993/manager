import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import DataBaseList from './DatabaseList'
import { CustomRoute } from '../CustomRoute';

export default () => {
  return (
    <div>
      <CustomRoute path='/databases' exact component={DataBaseList} checkPath='/databases' />
    </div>
  );
}

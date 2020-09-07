import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isVisibleRoute } from '../utils'

export const CustomRoute = ({ checkPath, ...rest }) => {
  if (isVisibleRoute(checkPath)){
    return <Route {...rest} />;
  }
  return <Redirect to="/dashboard" />;
}
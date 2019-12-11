import React from 'react'
import { Route } from 'react-router-dom'
import Splash from './Splash'
import Settings from './Settings'

export default () => (
  <div>
    <Route path='/settings' exact component={Splash} />
    <Route path='/settings/main' component={Settings} />
  </div>
)

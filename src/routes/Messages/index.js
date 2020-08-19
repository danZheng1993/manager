import React from 'react'
import { Route } from 'react-router-dom'
import NewMessage from './NewsEdit'
import MessageList from './MessageList'

export default () => (
  <div>
    <Route path='/message' exact component={MessageList} />
    <Route path='/message/new' component={NewMessage} />
  </div>
)

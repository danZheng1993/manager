import React from 'react'
import NewMessage from './NewMessage'
import MessageList from './MessageList'
import { CustomRoute } from '../CustomRoute';

export default () => (
  <div>
    <CustomRoute path='/message' exact component={MessageList} checkPath='/message' />
    <CustomRoute path='/message/new' component={NewMessage} checkPath='/message' />
  </div>
);

import { takeLatest } from 'redux-saga/effects'
import { GET_CHAT, GET_CHATS, CREATE_CHAT, UPDATE_CHAT, DELETE_CHAT }
  from '../modules/chat'
import apiCall from '../api/apiCall'
import {handleError, createNotification} from '../../helpers'

const doGetChat = apiCall({
  type: GET_CHAT,
  method: 'get',
  path: ({ payload }) => `/chats/${payload.params.to}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetChats = apiCall({
  type: GET_CHATS,
  method: 'get',
  path: () => `/chats/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateChat = apiCall({
  type: CREATE_CHAT,
  method: 'post',
  path: () => `/chats/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateChat = apiCall({
  type: UPDATE_CHAT,
  method: 'put',
  path: ({ payload }) => `/chats/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteChat = apiCall({
  type: DELETE_CHAT,
  method: 'delete',
  path: ({ payload }) => `/chats/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_CHAT, doGetChat)
  yield takeLatest(GET_CHATS, doGetChats)
  yield takeLatest(CREATE_CHAT, doCreateChat)
  yield takeLatest(UPDATE_CHAT, doUpdateChat)
  yield takeLatest(DELETE_CHAT, doDeleteChat)
}

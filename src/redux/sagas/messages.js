import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_MESSAGE, GET_MESSAGES, CREATE_MESSAGE, DELETE_MESSAGE }
  from '../modules/messages'
import apiCall from '../api/apiCall'
import {handleError, createNotification} from '../../helpers'

const doGetMessage = apiCall({
  type: GET_MESSAGE,
  method: 'get',
  path: ({ payload }) => `/messages/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetMessages = apiCall({
  type: GET_MESSAGES,
  method: 'get',
  path: () => `/messages/`,
  payloadOnSuccess: (res, { payload }) => ({
    messages: res.messages,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',]),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateMessages = apiCall({
  type: CREATE_MESSAGE,
  method: 'post',
  path: () => `/messages/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteMessages = apiCall({
  type: DELETE_MESSAGE,
  method: 'delete',
  path: ({ payload }) => `/messages/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_MESSAGE, doGetMessage)
  yield takeLatest(GET_MESSAGES, doGetMessages)
  yield takeLatest(CREATE_MESSAGE, doCreateMessages)
  yield takeLatest(DELETE_MESSAGE, doDeleteMessages)
}

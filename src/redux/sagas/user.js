import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_USER, GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER, GET_USER_REPORT, SEARCH_USER }
  from '../modules/user'
import apiCall from '../api/apiCall'
import {createNotification, handleError} from '../../helpers'
const doGetUser = apiCall({
  type: GET_USER,
  method: 'get',
  path: ({ payload }) => `/users/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetUsers = apiCall({
  type: GET_USERS,
  method: 'get',
  path: () => `/users/`,
  payloadOnSuccess: (res, { payload }) => ({
    users: res.users,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',]),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateUser = apiCall({
  type: CREATE_USER,
  method: 'post',
  path: () => `/users/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateUser = apiCall({
  type: UPDATE_USER,
  method: 'patch',
  path: ({ payload }) => `/users/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteUser = apiCall({
  type: DELETE_USER,
  method: 'delete',
  path: ({ payload }) => `/users/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetUserReport = apiCall({
  type: GET_USER_REPORT,
  method: 'get',
  path: ({ payload }) => `/users/${payload.id}/report`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doSearchUser = apiCall({
  type: SEARCH_USER,
  method: 'post',
  path: () => `/users/search/`,
  payloadOnSuccess: (res, { payload }) => ({
    ...res,
    ...pick(get(payload, 'params', {}), ['from', 'to', 'page', 'page_size']),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})
export default function* rootSaga () {
  yield takeLatest(GET_USER, doGetUser)
  yield takeLatest(GET_USERS, doGetUsers)
  yield takeLatest(CREATE_USER, doCreateUser)
  yield takeLatest(UPDATE_USER, doUpdateUser)
  yield takeLatest(DELETE_USER, doDeleteUser)
  yield takeLatest(SEARCH_USER, doSearchUser)
  yield takeLatest(GET_USER_REPORT, doGetUserReport)
}

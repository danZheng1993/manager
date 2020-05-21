import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_DATABASES, CREATE_DATABASE, DELETE_DATABASE, RESTORE_DATABASE }
  from '../modules/database'
import apiCall from '../api/apiCall'
import {handleError, createNotification} from '../../helpers'

const doGetDatabases = apiCall({
  type: GET_DATABASES,
  method: 'get',
  path: () => `/databases/`,
  payloadOnSuccess: (res, { payload }) => ({
    databases: res.databases,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',]),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateDatabase = apiCall({
  type: CREATE_DATABASE,
  method: 'post',
  path: () => `/databases/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteDatabase = apiCall({
  type: DELETE_DATABASE,
  method: 'delete',
  path: ({ payload }) => `/databases/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doRestoreDatabase = apiCall({
  type: RESTORE_DATABASE,
  method: 'put',
  path: ({ payload }) => `/databases/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_DATABASES, doGetDatabases)
  yield takeLatest(CREATE_DATABASE, doCreateDatabase)
  yield takeLatest(RESTORE_DATABASE, doRestoreDatabase)
  yield takeLatest(DELETE_DATABASE, doDeleteDatabase)
}

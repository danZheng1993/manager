import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_LOG, GET_LOGS, CREATE_LOG, UPDATE_LOG, DELETE_LOG }
  from '../modules/log'
import apiCall from '../api/apiCall'
import {handleError, createNotification} from '../../helpers'

const doGetLog = apiCall({
  type: GET_LOG,
  method: 'get',
  path: ({ payload }) => `/logs/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetLogs = apiCall({
  type: GET_LOGS,
  method: 'get',
  path: () => `/logs/`,
  payloadOnSuccess: (res, { payload }) => ({
    logs: res.logs,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',]),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateLog = apiCall({
  type: CREATE_LOG,
  method: 'post',
  path: () => `/logs/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateLog = apiCall({
  type: UPDATE_LOG,
  method: 'put',
  path: ({ payload }) => `/logs/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteLog = apiCall({
  type: DELETE_LOG,
  method: 'delete',
  path: ({ payload }) => `/logs/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_LOG, doGetLog)
  yield takeLatest(GET_LOGS, doGetLogs)
  yield takeLatest(CREATE_LOG, doCreateLog)
  yield takeLatest(UPDATE_LOG, doUpdateLog)
  yield takeLatest(DELETE_LOG, doDeleteLog)
}

import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_LOG, GET_LOGS, CREATE_LOG, UPDATE_LOG, DELETE_LOG }
  from '../modules/log'
import apiCall from '../api/apiCall'

const doGetLog = apiCall({
  type: GET_LOG,
  method: 'get',
  path: ({ payload }) => `/logs/${payload.id}/`
})

const doGetLogs = apiCall({
  type: GET_LOGS,
  method: 'get',
  path: () => `/logs/`,
  payloadOnSuccess: (res, { payload }) => ({
    ...res,
    payload
  })
})

const doCreateLog = apiCall({
  type: CREATE_LOG,
  method: 'post',
  path: () => `/logs/`
})

const doUpdateLog = apiCall({
  type: UPDATE_LOG,
  method: 'put',
  path: ({ payload }) => `/logs/${payload.id}/`
})

const doDeleteLog = apiCall({
  type: DELETE_LOG,
  method: 'delete',
  path: ({ payload }) => `/logs/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_LOG, doGetLog)
  yield takeLatest(GET_LOGS, doGetLogs)
  yield takeLatest(CREATE_LOG, doCreateLog)
  yield takeLatest(UPDATE_LOG, doUpdateLog)
  yield takeLatest(DELETE_LOG, doDeleteLog)
}

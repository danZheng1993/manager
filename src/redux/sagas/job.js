import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_JOB, GET_JOBS, CREATE_JOB, UPDATE_JOB, DELETE_JOB }
  from '../modules/job'
import apiCall from '../api/apiCall'
import {handleError, createNotification} from '../../helpers'

const doGetJob = apiCall({
  type: GET_JOB,
  method: 'get',
  path: ({ payload }) => `/jobs/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetJobs = apiCall({
  type: GET_JOBS,
  method: 'get',
  path: () => `/jobs/`,
  payloadOnSuccess: (res, { payload }) => ({
    jobs: res.jobs,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',])
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateJob = apiCall({
  type: CREATE_JOB,
  method: 'post',
  path: () => `/jobs/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateJob = apiCall({
  type: UPDATE_JOB,
  method: 'put',
  path: ({ payload }) => `/jobs/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteJob = apiCall({
  type: DELETE_JOB,
  method: 'delete',
  path: ({ payload }) => `/jobs/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_JOB, doGetJob)
  yield takeLatest(GET_JOBS, doGetJobs)
  yield takeLatest(CREATE_JOB, doCreateJob)
  yield takeLatest(UPDATE_JOB, doUpdateJob)
  yield takeLatest(DELETE_JOB, doDeleteJob)
}

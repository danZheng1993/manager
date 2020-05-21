import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_AWARD, GET_AWARDS, CREATE_AWARD, UPDATE_AWARD, DELETE_AWARD }
  from '../modules/award'
import apiCall from '../api/apiCall'
import {createNotification, handleError} from '../../helpers'
const doGetAward = apiCall({
  type: GET_AWARD,
  method: 'get',
  path: ({ payload }) => `/awards/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetAwards = apiCall({
  type: GET_AWARDS,
  method: 'get',
  path: () => `/awards/`,
  payloadOnSuccess: (res, { payload }) => ({
    awards: res.awards,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',]),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateAward = apiCall({
  type: CREATE_AWARD,
  method: 'post',
  path: () => `/awards/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateAward = apiCall({
  type: UPDATE_AWARD,
  method: 'put',
  path: ({ payload }) => `/awards/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteAward = apiCall({
  type: DELETE_AWARD,
  method: 'delete',
  path: ({ payload }) => `/awards/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_AWARD, doGetAward)
  yield takeLatest(GET_AWARDS, doGetAwards)
  yield takeLatest(CREATE_AWARD, doCreateAward)
  yield takeLatest(UPDATE_AWARD, doUpdateAward)
  yield takeLatest(DELETE_AWARD, doDeleteAward)
}

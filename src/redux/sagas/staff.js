import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_STAFF, GET_STAFFS, CREATE_STAFF, UPDATE_STAFF, DELETE_STAFF }
  from '../modules/staff'
import apiCall from '../api/apiCall'
import {createNotification, handleError} from '../../helpers'

const doGetStaff = apiCall({
  type: GET_STAFF,
  method: 'get',
  path: ({ payload }) => `/staff/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetStaffs = apiCall({
  type: GET_STAFFS,
  method: 'get',
  path: () => `/staff/`,
  payloadOnSuccess: (res, { payload }) => ({
    staffs: res.staffs,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size']),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateStaff = apiCall({
  type: CREATE_STAFF,
  method: 'post',
  path: () => `/staff/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateStaff = apiCall({
  type: UPDATE_STAFF,
  method: 'put',
  path: ({ payload }) => `/staff/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteStaff = apiCall({
  type: DELETE_STAFF,
  method: 'delete',
  path: ({ payload }) => `/staff/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_STAFF, doGetStaff)
  yield takeLatest(GET_STAFFS, doGetStaffs)
  yield takeLatest(CREATE_STAFF, doCreateStaff)
  yield takeLatest(UPDATE_STAFF, doUpdateStaff)
  yield takeLatest(DELETE_STAFF, doDeleteStaff)
}

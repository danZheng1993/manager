import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_DEPARTMENT, GET_DEPARTMENTS, CREATE_DEPARTMENT, UPDATE_DEPARTMENT, DELETE_DEPARTMENT }
  from '../modules/department'
import apiCall from '../api/apiCall'
import {createNotification, handleError} from '../../helpers'

const doGetDepartment = apiCall({
  type: GET_DEPARTMENT,
  method: 'get',
  path: ({ payload }) => `/department/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetDepartments = apiCall({
  type: GET_DEPARTMENTS,
  method: 'get',
  path: () => `/department/`,
  payloadOnSuccess: (res, { payload }) => ({
    supportItems: res.supportItems,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size']),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateDepartment = apiCall({
  type: CREATE_DEPARTMENT,
  method: 'post',
  path: () => `/department/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateDepartment = apiCall({
  type: UPDATE_DEPARTMENT,
  method: 'put',
  path: ({ payload }) => `/department/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteDepartment = apiCall({
  type: DELETE_DEPARTMENT,
  method: 'delete',
  path: ({ payload }) => `/department/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_DEPARTMENT, doGetDepartment)
  yield takeLatest(GET_DEPARTMENTS, doGetDepartments)
  yield takeLatest(CREATE_DEPARTMENT, doCreateDepartment)
  yield takeLatest(UPDATE_DEPARTMENT, doUpdateDepartment)
  yield takeLatest(DELETE_DEPARTMENT, doDeleteDepartment)
}

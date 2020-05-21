import { takeLatest } from 'redux-saga/effects'
import { GET_SUBCATEGORY, GET_SUBCATEGORYS, CREATE_SUBCATEGORY, UPDATE_SUBCATEGORY, DELETE_SUBCATEGORY }
  from '../modules/subcategory'
import apiCall from '../api/apiCall'
import {createNotification, handleError} from '../../helpers'

const doGetSubcategory = apiCall({
  type: GET_SUBCATEGORY,
  method: 'get',
  path: ({ payload }) => `/subcategorys/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetSubcategorys = apiCall({
  type: GET_SUBCATEGORYS,
  method: 'get',
  path: () => `/subcategorys/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateSubcategory = apiCall({
  type: CREATE_SUBCATEGORY,
  method: 'post',
  path: () => `/subcategorys/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateSubcategory = apiCall({
  type: UPDATE_SUBCATEGORY,
  method: 'put',
  path: ({ payload }) => `/subcategorys/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteSubcategory = apiCall({
  type: DELETE_SUBCATEGORY,
  method: 'delete',
  path: ({ payload }) => `/subcategorys/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_SUBCATEGORY, doGetSubcategory)
  yield takeLatest(GET_SUBCATEGORYS, doGetSubcategorys)
  yield takeLatest(CREATE_SUBCATEGORY, doCreateSubcategory)
  yield takeLatest(UPDATE_SUBCATEGORY, doUpdateSubcategory)
  yield takeLatest(DELETE_SUBCATEGORY, doDeleteSubcategory)
}

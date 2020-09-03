import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_SUPPORT_ITEM, GET_SUPPORT_ITEMS, CREATE_SUPPORT_ITEM, UPDATE_SUPPORT_ITEM, DELETE_SUPPORT_ITEM }
  from '../modules/customerSupport'
import apiCall from '../api/apiCall'
import {createNotification, handleError} from '../../helpers'

const doGetSupportItem = apiCall({
  type: GET_SUPPORT_ITEM,
  method: 'get',
  path: ({ payload }) => `/customerSupport/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetSupportItems = apiCall({
  type: GET_SUPPORT_ITEMS,
  method: 'get',
  path: () => `/customerSupport/`,
  payloadOnSuccess: (res, { payload }) => ({
    supportItems: res.supportItems,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size']),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateSupportItem = apiCall({
  type: CREATE_SUPPORT_ITEM,
  method: 'post',
  path: () => `/customerSupport/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateSupportItem = apiCall({
  type: UPDATE_SUPPORT_ITEM,
  method: 'put',
  path: ({ payload }) => `/customerSupport/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteSupportItem = apiCall({
  type: DELETE_SUPPORT_ITEM,
  method: 'delete',
  path: ({ payload }) => `/customerSupport/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_SUPPORT_ITEM, doGetSupportItem)
  yield takeLatest(GET_SUPPORT_ITEMS, doGetSupportItems)
  yield takeLatest(CREATE_SUPPORT_ITEM, doCreateSupportItem)
  yield takeLatest(UPDATE_SUPPORT_ITEM, doUpdateSupportItem)
  yield takeLatest(DELETE_SUPPORT_ITEM, doDeleteSupportItem)
}

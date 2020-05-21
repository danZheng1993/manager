import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_BANNER, GET_BANNERS, CREATE_BANNER, UPDATE_BANNER, DELETE_BANNER }
  from '../modules/banner'
import apiCall from '../api/apiCall'
import {createNotification, handleError} from '../../helpers'
const doGetBanner = apiCall({
  type: GET_BANNER,
  method: 'get',
  path: ({ payload }) => `/banners/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetBanners = apiCall({
  type: GET_BANNERS,
  method: 'get',
  path: () => `/banners/`,
  payloadOnSuccess: (res, { payload }) => ({
    banners: res.banners,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',]),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateBanner = apiCall({
  type: CREATE_BANNER,
  method: 'post',
  path: () => `/banners/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateBanner = apiCall({
  type: UPDATE_BANNER,
  method: 'put',
  path: ({ payload }) => `/banners/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteBanner = apiCall({
  type: DELETE_BANNER,
  method: 'delete',
  path: ({ payload }) => `/banners/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_BANNER, doGetBanner)
  yield takeLatest(GET_BANNERS, doGetBanners)
  yield takeLatest(CREATE_BANNER, doCreateBanner)
  yield takeLatest(UPDATE_BANNER, doUpdateBanner)
  yield takeLatest(DELETE_BANNER, doDeleteBanner)
}

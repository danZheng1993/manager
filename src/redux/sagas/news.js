import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_NEWS, GET_NEWSS, CREATE_NEWS, UPDATE_NEWS, DELETE_NEWS }
  from '../modules/news'
import apiCall from '../api/apiCall'
import {handleError, createNotification} from '../../helpers'

const doGetNews = apiCall({
  type: GET_NEWS,
  method: 'get',
  path: ({ payload }) => `/news/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetNewss = apiCall({
  type: GET_NEWSS,
  method: 'get',
  path: () => `/news/`,
  payloadOnSuccess: (res, { payload }) => ({
    newss: res.newss,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',]),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateNews = apiCall({
  type: CREATE_NEWS,
  method: 'post',
  path: () => `/news/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateNews = apiCall({
  type: UPDATE_NEWS,
  method: 'put',
  path: ({ payload }) => `/news/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteNews = apiCall({
  type: DELETE_NEWS,
  method: 'delete',
  path: ({ payload }) => `/news/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_NEWS, doGetNews)
  yield takeLatest(GET_NEWSS, doGetNewss)
  yield takeLatest(CREATE_NEWS, doCreateNews)
  yield takeLatest(UPDATE_NEWS, doUpdateNews)
  yield takeLatest(DELETE_NEWS, doDeleteNews)
}

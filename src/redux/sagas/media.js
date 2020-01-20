import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_MEDIA, GET_MEDIAS, CREATE_MEDIA, UPDATE_MEDIA, DELETE_MEDIA }
  from '../modules/media'
import apiCall from '../api/apiCall'
import { createNotification, handleError } from '../../helpers';

const doGetMedia = apiCall({
  type: GET_MEDIA,
  method: 'get',
  path: ({ payload }) => `/medias/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetMedias = apiCall({
  type: GET_MEDIAS,
  method: 'get',
  path: () => `/medias/`,
  payloadOnSuccess: (res, { payload }) => ({
    medias: res.medias,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',]),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateMedia = apiCall({
  type: CREATE_MEDIA,
  method: 'post',
  path: () => `/medias/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateMedia = apiCall({
  type: UPDATE_MEDIA,
  method: 'put',
  path: ({ payload }) => `/medias/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteMedia = apiCall({
  type: DELETE_MEDIA,
  method: 'delete',
  path: ({ payload }) => `/medias/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_MEDIA, doGetMedia)
  yield takeLatest(GET_MEDIAS, doGetMedias)
  yield takeLatest(CREATE_MEDIA, doCreateMedia)
  yield takeLatest(UPDATE_MEDIA, doUpdateMedia)
  yield takeLatest(DELETE_MEDIA, doDeleteMedia)
}

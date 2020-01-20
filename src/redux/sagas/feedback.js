import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_FEEDBACK, GET_FEEDBACKS, CREATE_FEEDBACK, UPDATE_FEEDBACK, DELETE_FEEDBACK }
  from '../modules/feedback'
import apiCall from '../api/apiCall'
import {handleError, createNotification} from '../../helpers'

const doGetFeedback = apiCall({
  type: GET_FEEDBACK,
  method: 'get',
  path: ({ payload }) => `/feedbacks/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetFeedbacks = apiCall({
  type: GET_FEEDBACKS,
  method: 'get',
  path: () => `/feedbacks/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateFeedback = apiCall({
  type: CREATE_FEEDBACK,
  method: 'post',
  path: () => `/feedbacks/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateFeedback = apiCall({
  type: UPDATE_FEEDBACK,
  method: 'put',
  path: ({ payload }) => `/feedbacks/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteFeedback = apiCall({
  type: DELETE_FEEDBACK,
  method: 'delete',
  path: ({ payload }) => `/feedbacks/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_FEEDBACK, doGetFeedback)
  yield takeLatest(GET_FEEDBACKS, doGetFeedbacks)
  yield takeLatest(CREATE_FEEDBACK, doCreateFeedback)
  yield takeLatest(UPDATE_FEEDBACK, doUpdateFeedback)
  yield takeLatest(DELETE_FEEDBACK, doDeleteFeedback)
}

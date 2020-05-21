import { takeLatest } from 'redux-saga/effects'
import { GET_SETTINGS, UPDATE_SETTINGS }
  from '../modules/setting'
import apiCall from '../api/apiCall'
import {handleError, createNotification} from '../../helpers'

const doGetSettings = apiCall({
  type: GET_SETTINGS,
  method: 'get',
  path: () => `/settings/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateSettings = apiCall({
  type: UPDATE_SETTINGS,
  method: 'post',
  path: () => `/settings/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_SETTINGS, doGetSettings)
  yield takeLatest(UPDATE_SETTINGS, doUpdateSettings)
}

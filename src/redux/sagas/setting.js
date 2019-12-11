import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_SETTINGS, UPDATE_SETTINGS }
  from '../modules/setting'
import apiCall from '../api/apiCall'

const doGetSettings = apiCall({
  type: GET_SETTINGS,
  method: 'get',
  path: () => `/settings/`,
})

const doUpdateSettings = apiCall({
  type: UPDATE_SETTINGS,
  method: 'post',
  path: () => `/settings/`
})

export default function* rootSaga () {
  yield takeLatest(GET_SETTINGS, doGetSettings)
  yield takeLatest(UPDATE_SETTINGS, doUpdateSettings)
}

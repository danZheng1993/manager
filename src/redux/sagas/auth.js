import { takeLatest } from 'redux-saga/effects'
import { DO_LOGIN, DO_SIGNUP, GET_PROFILE, SAVE_PROFILE, SEND_CODE,
   CHECK_CODE, ADD_TO_CONTACTS, GET_CONTACTS, } from '../modules/auth'
import apiCall from '../api/apiCall'

const doLogin = apiCall({
  type: DO_LOGIN,
  method: 'post',
  path: () => '/auth/login/',
  success: (res, action) => {
    localStorage.setItem('hvr_auth', JSON.stringify(res.data))
  }
})

const doSignup = apiCall({
  type: DO_SIGNUP,
  method: 'post',
  path: () => '/auth/signup/',
  success: () => {
    localStorage.removeItem('hvr_auth')
  },
  fail: () => {
    localStorage.removeItem('hvr_auth')
  }
})

const doSendcode = apiCall({
  type: SEND_CODE,
  method: 'post',
  path: () => '/auth/sendcode',
})

const doCheckcode = apiCall({
  type: CHECK_CODE,
  method: 'post',
  path: () => '/auth/checkcode',
})

const doGetProfile = apiCall({
  type: GET_PROFILE,
  method: 'get',
  path: () => '/profile/me/'
})

const doGetContacts = apiCall({
  type: GET_CONTACTS,
  method: 'get',
  path: () => '/profile/contacts/'
})

const doSaveProfile = apiCall({
  type: SAVE_PROFILE,
  method: 'patch',
  path: () => '/profile/me/',
  success: (res, action) => {
    localStorage.setItem('hvr_auth', JSON.stringify({
      info: res.data,
      token: JSON.parse(localStorage.getItem('hvr_auth')).token
    }))
  }
})

const doAddToContacts = apiCall({
  type: ADD_TO_CONTACTS,
  method: 'patch',
  path: () => '/profile/contacts/',
})

export default function* rootSaga () {
  yield takeLatest(DO_LOGIN, doLogin)
  yield takeLatest(DO_SIGNUP, doSignup)
  yield takeLatest(GET_PROFILE, doGetProfile)
  yield takeLatest(SAVE_PROFILE, doSaveProfile)
  yield takeLatest(SEND_CODE, doSendcode)
  yield takeLatest(CHECK_CODE, doCheckcode)
  yield takeLatest(ADD_TO_CONTACTS, doAddToContacts)
  yield takeLatest(GET_CONTACTS, doGetContacts)
}

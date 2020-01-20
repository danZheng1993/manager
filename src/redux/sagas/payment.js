import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_PAYMENT, GET_PAYMENTS, PAY_UPFRONT, FINAL_PAY }
  from '../modules/payment'
import apiCall from '../api/apiCall'
import {handleError, createNotification} from '../../helpers'

const doGetPayment = apiCall({
  type: GET_PAYMENT,
  method: 'get',
  path: ({ payload }) => `/payments/${payload.params.to}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetPayments = apiCall({
  type: GET_PAYMENTS,
  method: 'get',
  path: () => `/payments/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doPayUpfront = apiCall({
  type: PAY_UPFRONT,
  method: 'post',
  path: () => `/payments/payUpfront`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doFinalPay = apiCall({
  type: FINAL_PAY,
  method: 'post',
  path: () => `/payments/finalPay`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_PAYMENT, doGetPayment)
  yield takeLatest(GET_PAYMENTS, doGetPayments)
  yield takeLatest(PAY_UPFRONT, doPayUpfront)
  yield takeLatest(FINAL_PAY, doFinalPay)
}

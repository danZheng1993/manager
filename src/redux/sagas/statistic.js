import { takeLatest } from 'redux-saga/effects'
import apiCall from '../api/apiCall'
import { GET_DASHBOARD_STATISTICS, GET_CREATED_USERS, GET_JOB_STATISTICS, GET_TRANSACTION_STATISTICS } from '../modules/statistic'

const doGetDashboardStatistics = apiCall({
  type: GET_DASHBOARD_STATISTICS,
  method: 'get',
  path: () => `/statistics/dashboard`,
})

const doGetCreatedUsers = apiCall({
  type: GET_CREATED_USERS,
  method: 'get',
  path: () => `/statistics/users`,
})

const doGetJobStatistics = apiCall({
  type: GET_JOB_STATISTICS,
  method: 'get',
  path: () => `/statistics/jobs`,
})

const doGetTransactionStatistics = apiCall({
  type: GET_TRANSACTION_STATISTICS,
  method: 'get',
  path: () => `/statistics/transaction`,
})


export default function* rootSaga () {
  yield takeLatest(GET_DASHBOARD_STATISTICS, doGetDashboardStatistics)
  yield takeLatest(GET_CREATED_USERS, doGetCreatedUsers)
  yield takeLatest(GET_JOB_STATISTICS, doGetJobStatistics)
  yield takeLatest(GET_TRANSACTION_STATISTICS, doGetTransactionStatistics)
}

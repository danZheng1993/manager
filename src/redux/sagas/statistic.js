import { takeLatest } from 'redux-saga/effects'
import apiCall from '../api/apiCall'
import { GET_DASHBOARD_STATISTICS, GET_CREATED_USERS, GET_JOB_STATISTICS, GET_TRANSACTION_STATISTICS, COMPARE_JOBS, COMPARE_TRANSACTIONS } from '../modules/statistic'

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

const doCompareJobs = apiCall({
  type: COMPARE_JOBS,
  method: 'post',
  path: () => `/statistics/jobs`,
})

const doCompareTransactions = apiCall({
  type: COMPARE_TRANSACTIONS,
  method: 'post',
  path: () => `/statistics/transaction`,
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
  yield takeLatest(COMPARE_JOBS, doCompareJobs)
  yield takeLatest(COMPARE_TRANSACTIONS, doCompareTransactions)
  yield takeLatest(GET_TRANSACTION_STATISTICS, doGetTransactionStatistics)
}

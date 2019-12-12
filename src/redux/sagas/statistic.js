import { takeLatest } from 'redux-saga/effects'
import apiCall from '../api/apiCall'
import { GET_DASHBOARD_STATISTICS, GET_CREATED_USERS } from '../modules/statistic'

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


export default function* rootSaga () {
  yield takeLatest(GET_DASHBOARD_STATISTICS, doGetDashboardStatistics)
  yield takeLatest(GET_CREATED_USERS, doGetCreatedUsers)
}

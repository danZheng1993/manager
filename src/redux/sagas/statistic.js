import { takeLatest } from 'redux-saga/effects'
import apiCall from '../api/apiCall'
import { GET_DASHBOARD_STATISTICS } from '../modules/statistic'

const doGetDashboardStatistics = apiCall({
  type: GET_DASHBOARD_STATISTICS,
  method: 'get',
  path: () => `/statistics/dashboard`,
})


export default function* rootSaga () {
  yield takeLatest(GET_DASHBOARD_STATISTICS, doGetDashboardStatistics)
}

import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DASHBOARD_STATISTICS = 'GET_DASHBOARD_STATISTICS'
export const GET_CREATED_USERS = 'GET_CREATED_USERS'

// ------------------------------------
// Actions
// ------------------------------------

export const getDashboardStatistics = createAction(GET_DASHBOARD_STATISTICS)
export const getCreatedUsers = createAction(GET_CREATED_USERS)

const initialState = {
  status: 'INIT',
  statistics: {},
  dashboardTransaction: {},
  createdUsers: {},
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_DASHBOARD_STATISTICS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_DASHBOARD_STATISTICS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_DASHBOARD_STATISTICS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_DASHBOARD_STATISTICS),
    dashboardTransaction: payload,
    error: null,
    loading: false
  }),

  [requestFail(GET_DASHBOARD_STATISTICS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_DASHBOARD_STATISTICS),
    error: payload,
    loading: false
  }),

  [requestPending(GET_CREATED_USERS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_CREATED_USERS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_CREATED_USERS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_CREATED_USERS),
    createdUsers: payload,
    error: null,
    loading: false
  }),

  [requestFail(GET_CREATED_USERS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_CREATED_USERS),
    error: payload,
    loading: false
  }),
}, initialState)

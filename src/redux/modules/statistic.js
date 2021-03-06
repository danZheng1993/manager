import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DASHBOARD_STATISTICS = 'GET_DASHBOARD_STATISTICS'
export const GET_CREATED_USERS = 'GET_CREATED_USERS'
export const GET_JOB_STATISTICS = 'GET_JOB_STATISTICS'
export const COMPARE_JOBS = 'COMPARE_JOBS'
export const COMPARE_TRANSACTIONS = 'COMPARE_TRANSACTIONS'
export const GET_TRANSACTION_STATISTICS = 'GET_TRANSACTION_STATISTICS'

// ------------------------------------
// Actions
// ------------------------------------

export const getDashboardStatistics = createAction(GET_DASHBOARD_STATISTICS)
export const getCreatedUsers = createAction(GET_CREATED_USERS)
export const getJobStatistics = createAction(GET_JOB_STATISTICS)
export const compareJobs = createAction(COMPARE_JOBS)
export const compareTransactions = createAction(COMPARE_TRANSACTIONS)
export const getTransactionStatistics = createAction(GET_TRANSACTION_STATISTICS)

const initialState = {
  status: 'INIT',
  statistics: {},
  dashboardTransaction: {},
  createdUsers: {},
  jobsCompare: {},
  transactionsCompare: {},
  jobStatistics: [],
  transactionStatistics: [],
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
  
  [requestPending(GET_JOB_STATISTICS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_JOB_STATISTICS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_JOB_STATISTICS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_JOB_STATISTICS),
    jobStatistics: payload,
    error: null,
    loading: false
  }),

  [requestFail(GET_JOB_STATISTICS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_JOB_STATISTICS),
    error: payload,
    loading: false
  }),
  
  [requestPending(COMPARE_JOBS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(COMPARE_JOBS),
    error: null,
    loading: true,
  }),

  [requestSuccess(COMPARE_JOBS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(COMPARE_JOBS),
    jobsCompare: payload,
    error: null,
    loading: false
  }),

  [requestFail(COMPARE_JOBS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(COMPARE_JOBS),
    error: payload,
    loading: false
  }),
  
  
  [requestPending(COMPARE_TRANSACTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(COMPARE_TRANSACTIONS),
    error: null,
    loading: true,
  }),

  [requestSuccess(COMPARE_TRANSACTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(COMPARE_TRANSACTIONS),
    transactionsCompare: payload,
    error: null,
    loading: false
  }),

  [requestFail(COMPARE_TRANSACTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(COMPARE_TRANSACTIONS),
    error: payload,
    loading: false
  }),
  
  [requestPending(GET_TRANSACTION_STATISTICS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_TRANSACTION_STATISTICS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_TRANSACTION_STATISTICS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_TRANSACTION_STATISTICS),
    transactionStatistics: payload,
    error: null,
    loading: false
  }),

  [requestFail(GET_TRANSACTION_STATISTICS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_TRANSACTION_STATISTICS),
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

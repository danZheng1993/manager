import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_LOG = 'GET_LOG'
export const GET_LOGS = 'GET_LOGS'
export const CREATE_LOG = 'CREATE_LOG'
export const UPDATE_LOG = 'UPDATE_LOG'
export const DELETE_LOG = 'DELETE_LOG'
export const SET_LOGS_PAGINATION = 'SET_LOGS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getLog = createAction(GET_LOG)
export const getLogs = createAction(GET_LOGS)
export const createLog = createAction(CREATE_LOG)
export const updateLog = createAction(UPDATE_LOG)
export const deleteLog = createAction(DELETE_LOG)

const initialState = {
  log: null,
  status: 'INIT',
  logs: [],
  loading: false,
  params: {
    count: 0,
    previous: null,
    next: null,
    page_size: 10,
    page: 1
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_LOG),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_LOG),
    log: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_LOG),
    error: payload,
    loading: false
  }),

  [requestPending(GET_LOGS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_LOGS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_LOGS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_LOGS),
    logs: payload.logs,
    params: {
      ...state.params,
      ...omit(payload, 'logs')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_LOGS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_LOGS),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_LOG),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_LOG),
    log: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_LOG),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_LOG),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_LOG),
    log: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_LOG),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_LOG),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_LOG),
    logs: reject(state.logs, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_LOG)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_LOG),
    error: payload,
    loading: false
  }),

}, initialState)

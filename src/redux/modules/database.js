import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'
import {refreshResult} from '../api/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_DATABASES = 'GET_DATABASES'
export const CREATE_DATABASE = 'CREATE_DATABASE'
export const RESTORE_DATABASE = 'RESTORE_DATABASE'
export const DELETE_DATABASE = 'DELETE_DATABASE'
export const SET_DATABASES_PAGINATION = 'SET_DATABASES_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getDatabases = createAction(GET_DATABASES)
export const createDatabase = createAction(CREATE_DATABASE)
export const restoreDatabase = createAction(RESTORE_DATABASE)
export const deleteDatabase = createAction(DELETE_DATABASE)

const initialState = {
  database: null,
  status: 'INIT',
  databases: [],
  loading: false,
  params: {
    count: 0,
    previous: null,
    next: null,
    page_size: 10,
    page: 1
  },
  error: null,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({

  [requestPending(GET_DATABASES)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_DATABASES),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_DATABASES)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_DATABASES),
    databases: payload.databases,
    params: {
      ...state.params,
      ...omit(payload, 'databases')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_DATABASES)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_DATABASES),
    error: payload.data.message,
    databases: null,
    loading: false
  }),

  [requestPending(CREATE_DATABASE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_DATABASE),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_DATABASE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_DATABASE),
    databases: refreshResult(state.databases, payload),
    error: null,
    loading: false
  }),

  [requestFail(CREATE_DATABASE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_DATABASE),
    error: payload.data.message,
    loading: false
  }),

  [requestPending(RESTORE_DATABASE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(RESTORE_DATABASE),
    error: null,
    loading: true,
  }),

  [requestSuccess(RESTORE_DATABASE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(RESTORE_DATABASE),
    database: payload,
    error: null,
    loading: false
  }),

  [requestFail(RESTORE_DATABASE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(RESTORE_DATABASE),
    error: payload.data.message,
    loading: false
  }),

  [requestPending(DELETE_DATABASE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_DATABASE),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_DATABASE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_DATABASE),
    databases: reject(state.databases, { _id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_DATABASE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_DATABASE),
    error: payload.data.message,
    loading: false
  }),

}, initialState)

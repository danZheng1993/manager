import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SETTINGS = 'GET_SETTINGS'
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS'

// ------------------------------------
// Actions
// ------------------------------------

export const getSettings = createAction(GET_SETTINGS)
export const updateSettings = createAction(UPDATE_SETTINGS)

const initialState = {
  status: 'INIT',
  settings: {},
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_SETTINGS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SETTINGS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SETTINGS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SETTINGS),
    settings: payload,
    error: null,
    loading: false
  }),

  [requestFail(GET_SETTINGS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SETTINGS),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_SETTINGS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_SETTINGS),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_SETTINGS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_SETTINGS),
    settings: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_SETTINGS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_SETTINGS),
    error: payload,
    loading: false
  }),

}, initialState)

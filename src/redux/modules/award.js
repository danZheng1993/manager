import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'
import {refreshResult} from '../api/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_AWARD = 'GET_AWARD'
export const GET_AWARDS = 'GET_AWARDS'
export const CREATE_AWARD = 'CREATE_AWARD'
export const UPDATE_AWARD = 'UPDATE_AWARD'
export const DELETE_AWARD = 'DELETE_AWARD'
export const SET_AWARDS_PAGINATION = 'SET_AWARDS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getAward = createAction(GET_AWARD)
export const getAwards = createAction(GET_AWARDS)
export const createAward = createAction(CREATE_AWARD)
export const updateAward = createAction(UPDATE_AWARD)
export const deleteAward = createAction(DELETE_AWARD)

const initialState = {
  award: null,
  status: 'INIT',
  awards: [],
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
  [requestPending(GET_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_AWARD),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_AWARD),
    award: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_AWARD),
    award: null,
    error: payload,
    loading: false
  }),

  [requestPending(GET_AWARDS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_AWARDS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_AWARDS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_AWARDS),
    awards: payload.awards,
    params: {
      ...state.params,
      ...omit(payload, 'awards')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_AWARDS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_AWARDS),
    error: payload,
    awards: null,
    loading: false
  }),

  [requestPending(CREATE_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_AWARD),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_AWARD),
    award: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_AWARD),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_AWARD),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_AWARD),
    award: payload,
    awards : refreshResult(state.awards, payload),
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_AWARD),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_AWARD),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_AWARD),
    awards: reject(state.awards, { _id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_AWARD)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_AWARD),
    error: payload,
    loading: false
  }),

}, initialState)

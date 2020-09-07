import { createAction, handleActions } from 'redux-actions'
import { omit, reject } from 'lodash'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import {refreshResult} from '../api/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_STAFF = 'GET_STAFF'
export const GET_STAFFS = 'GET_STAFFS'
export const CREATE_STAFF = 'CREATE_STAFF'
export const UPDATE_STAFF = 'UPDATE_STAFF'
export const DELETE_STAFF = 'DELETE_STAFF'
export const SET_STAFFS_PAGINATION = 'SET_STAFFS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getStaff = createAction(GET_STAFF)
export const getStaffs = createAction(GET_STAFFS)
export const createStaff = createAction(CREATE_STAFF)
export const updateStaff = createAction(UPDATE_STAFF)
export const deleteStaff = createAction(DELETE_STAFF)

const initialState = {
  staff: null,
  status: 'INIT',
  staffs: [],
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
  [requestPending(GET_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_STAFF),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_STAFF),
    staff: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_STAFF),
    staff: null,
    error: payload,
    loading: false
  }),

  [requestPending(GET_STAFFS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_STAFFS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_STAFFS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_STAFFS),
    staffs: payload.staffs,
    params: {
      ...state.params,
      ...omit(payload, 'staffs')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_STAFFS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_STAFFS),
    error: payload,
    staffs: null,
    loading: false
  }),

  [requestPending(CREATE_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_STAFF),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_STAFF),
    staff: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_STAFF),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_STAFF),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_STAFF),
    staff: payload,
    staffs : refreshResult(state.staffs, payload),
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_STAFF),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_STAFF),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_STAFF),
    staffs: reject(state.staffs, { _id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_STAFF)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_STAFF),
    error: payload,
    loading: false
  }),

}, initialState)

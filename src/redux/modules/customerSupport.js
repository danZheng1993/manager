import { createAction, handleActions } from 'redux-actions'
import { omit, reject } from 'lodash'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import {refreshResult} from '../api/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_SUPPORT_ITEM = 'GET_SUPPORT_ITEM'
export const GET_SUPPORT_ITEMS = 'GET_SUPPORT_ITEMS'
export const CREATE_SUPPORT_ITEM = 'CREATE_SUPPORT_ITEM'
export const UPDATE_SUPPORT_ITEM = 'UPDATE_SUPPORT_ITEM'
export const DELETE_SUPPORT_ITEM = 'DELETE_SUPPORT_ITEM'
export const SET_SUPPORT_ITEMS_PAGINATION = 'SET_SUPPORT_ITEMS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getSupportItem = createAction(GET_SUPPORT_ITEM)
export const getSupportItems = createAction(GET_SUPPORT_ITEMS)
export const createSupportItem = createAction(CREATE_SUPPORT_ITEM)
export const updateSupportItem = createAction(UPDATE_SUPPORT_ITEM)
export const deleteSupportItem = createAction(DELETE_SUPPORT_ITEM)

const initialState = {
  supportItem: null,
  status: 'INIT',
  supportItems: [],
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
  [requestPending(GET_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SUPPORT_ITEM),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SUPPORT_ITEM),
    supportItem: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SUPPORT_ITEM),
    supportItem: null,
    error: payload,
    loading: false
  }),

  [requestPending(GET_SUPPORT_ITEMS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SUPPORT_ITEMS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SUPPORT_ITEMS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SUPPORT_ITEMS),
    supportItems: payload.supportItems,
    params: {
      ...state.params,
      ...omit(payload, 'supportItems')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_SUPPORT_ITEMS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SUPPORT_ITEMS),
    error: payload,
    supportItems: null,
    loading: false
  }),

  [requestPending(CREATE_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_SUPPORT_ITEM),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_SUPPORT_ITEM),
    supportItem: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_SUPPORT_ITEM),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_SUPPORT_ITEM),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_SUPPORT_ITEM),
    supportItem: payload,
    supportItems : refreshResult(state.supportItems, payload),
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_SUPPORT_ITEM),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_SUPPORT_ITEM),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_SUPPORT_ITEM),
    supportItems: reject(state.supportItems, { _id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_SUPPORT_ITEM)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_SUPPORT_ITEM),
    error: payload,
    loading: false
  }),

}, initialState)

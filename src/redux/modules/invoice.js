import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'
import {refreshResult} from '../api/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_INVOICE = 'GET_INVOICE'
export const GET_INVOICES = 'GET_INVOICES'
export const CREATE_INVOICE = 'CREATE_INVOICE'
export const UPDATE_INVOICE = 'UPDATE_INVOICE'
export const DELETE_INVOICE = 'DELETE_INVOICE'
export const SET_INVOICES_PAGINATION = 'SET_INVOICES_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getInvoice = createAction(GET_INVOICE)
export const getInvoices = createAction(GET_INVOICES)
export const createInvoice = createAction(CREATE_INVOICE)
export const updateInvoice = createAction(UPDATE_INVOICE)
export const deleteInvoice = createAction(DELETE_INVOICE)

const initialState = {
  invoice: null,
  status: 'INIT',
  invoices: [],
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
  [requestPending(GET_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_INVOICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_INVOICE),
    invoice: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_INVOICE),
    invoice: null,
    error: payload,
    loading: false
  }),

  [requestPending(GET_INVOICES)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_INVOICES),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_INVOICES)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_INVOICES),
    invoices: payload.invoices,
    params: {
      ...state.params,
      ...omit(payload, 'invoices')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_INVOICES)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_INVOICES),
    error: payload,
    invoices: null,
    loading: false
  }),

  [requestPending(CREATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_INVOICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_INVOICE),
    invoice: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_INVOICE),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_INVOICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_INVOICE),
    invoice: payload,
    invoices : refreshResult(state.invoices, payload),
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_INVOICE),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_INVOICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_INVOICE),
    invoices: reject(state.invoices, { _id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_INVOICE),
    error: payload,
    loading: false
  }),

}, initialState)

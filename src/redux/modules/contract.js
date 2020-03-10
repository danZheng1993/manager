import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'
import {refreshResult} from '../api/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_CONTRACT = 'GET_CONTRACT'
export const GET_CONTRACTS = 'GET_CONTRACTS'
export const CREATE_CONTRACT = 'CREATE_CONTRACT'
export const UPDATE_CONTRACT = 'UPDATE_CONTRACT'
export const DELETE_CONTRACT = 'DELETE_CONTRACT'
export const SET_CONTRACTS_PAGINATION = 'SET_CONTRACTS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getContract = createAction(GET_CONTRACT)
export const getContracts = createAction(GET_CONTRACTS)
export const createContract = createAction(CREATE_CONTRACT)
export const updateContract = createAction(UPDATE_CONTRACT)
export const deleteContract = createAction(DELETE_CONTRACT)

const initialState = {
  contract: null,
  status: 'INIT',
  contracts: [],
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
  [requestPending(GET_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_CONTRACT),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_CONTRACT),
    contract: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_CONTRACT),
    contract: null,
    error: payload,
    loading: false
  }),

  [requestPending(GET_CONTRACTS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_CONTRACTS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_CONTRACTS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_CONTRACTS),
    contracts: payload.contracts,
    params: {
      ...state.params,
      ...omit(payload, 'contracts')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_CONTRACTS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_CONTRACTS),
    error: payload,
    contracts: null,
    loading: false
  }),

  [requestPending(CREATE_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_CONTRACT),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_CONTRACT),
    contract: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_CONTRACT),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_CONTRACT),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_CONTRACT),
    contract: payload,
    contracts : refreshResult(state.contracts, payload),
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_CONTRACT),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_CONTRACT),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_CONTRACT),
    contracts: reject(state.contracts, { _id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_CONTRACT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_CONTRACT),
    error: payload,
    loading: false
  }),

}, initialState)

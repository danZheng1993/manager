import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'
import {refreshResult} from '../api/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_MESSAGE = 'GET_MESSAGE'
export const GET_MESSAGES = 'GET_MESSAGES'
export const CREATE_MESSAGE = 'CREATE_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'
export const SET_MESSAGES_PAGINATION = 'SET_MESSAGES_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getMessage = createAction(GET_MESSAGE)
export const getMessages = createAction(GET_MESSAGES)
export const createMessage = createAction(CREATE_MESSAGE)
export const deleteMessage = createAction(DELETE_MESSAGE)

const initialState = {
  message: null,
  status: 'INIT',
  messages: [],
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
  [requestPending(GET_MESSAGE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_MESSAGE),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_MESSAGE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_MESSAGE),
    message: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_MESSAGE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_MESSAGE),
    message: null,
    error: payload,
    loading: false
  }),

  [requestPending(GET_MESSAGES)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_MESSAGES),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_MESSAGES)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_MESSAGES),
    messages: payload.messages,
    params: {
      ...state.params,
      ...omit(payload, 'messages')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_MESSAGES)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_MESSAGES),
    error: payload,
    messages: null,
    loading: false
  }),

  [requestPending(CREATE_MESSAGE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_MESSAGE),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_MESSAGE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_MESSAGE),
    message: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_MESSAGE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_MESSAGE),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_MESSAGE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_MESSAGE),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_MESSAGE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_MESSAGE),
    messages: reject(state.messages, { _id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_MESSAGE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_MESSAGE),
    error: payload,
    loading: false
  }),

}, initialState)

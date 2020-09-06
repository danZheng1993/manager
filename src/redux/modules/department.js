import { createAction, handleActions } from 'redux-actions'
import { omit, reject } from 'lodash'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import {refreshResult} from '../api/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_DEPARTMENT = 'GET_DEPARTMENT'
export const GET_DEPARTMENTS = 'GET_DEPARTMENTS'
export const CREATE_DEPARTMENT = 'CREATE_DEPARTMENT'
export const UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT'
export const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT'
export const SET_DEPARTMENTS_PAGINATION = 'SET_DEPARTMENTS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getDepartment = createAction(GET_DEPARTMENT)
export const getDepartments = createAction(GET_DEPARTMENTS)
export const createDepartment = createAction(CREATE_DEPARTMENT)
export const updateDepartment = createAction(UPDATE_DEPARTMENT)
export const deleteDepartment = createAction(DELETE_DEPARTMENT)

const initialState = {
  department: null,
  status: 'INIT',
  departments: [],
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
  [requestPending(GET_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_DEPARTMENT),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_DEPARTMENT),
    department: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_DEPARTMENT),
    department: null,
    error: payload,
    loading: false
  }),

  [requestPending(GET_DEPARTMENTS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_DEPARTMENTS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_DEPARTMENTS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_DEPARTMENTS),
    departments: payload.departments,
    params: {
      ...state.params,
      ...omit(payload, 'departments')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_DEPARTMENTS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_DEPARTMENTS),
    error: payload,
    departments: null,
    loading: false
  }),

  [requestPending(CREATE_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_DEPARTMENT),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_DEPARTMENT),
    department: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_DEPARTMENT),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_DEPARTMENT),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_DEPARTMENT),
    department: payload,
    departments : refreshResult(state.departments, payload),
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_DEPARTMENT),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_DEPARTMENT),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_DEPARTMENT),
    departments: reject(state.departments, { _id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_DEPARTMENT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_DEPARTMENT),
    error: payload,
    loading: false
  }),

}, initialState)

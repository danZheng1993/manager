import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_MEDIA = 'GET_MEDIA'
export const GET_MEDIAS = 'GET_MEDIAS'
export const CREATE_MEDIA = 'CREATE_MEDIA'
export const UPDATE_MEDIA = 'UPDATE_MEDIA'
export const DELETE_MEDIA = 'DELETE_MEDIA'
export const SET_MEDIAS_PAGINATION = 'SET_MEDIAS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getMedia = createAction(GET_MEDIA)
export const getMedias = createAction(GET_MEDIAS)
export const createMedia = createAction(CREATE_MEDIA)
export const updateMedia = createAction(UPDATE_MEDIA)
export const deleteMedia = createAction(DELETE_MEDIA)

const initialState = {
  media: null,
  status: 'INIT',
  medias: [],
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
  [requestPending(GET_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_MEDIA),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_MEDIA),
    media: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_MEDIA),
    media: null,
    error: payload,
    loading: false
  }),

  [requestPending(GET_MEDIAS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_MEDIAS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_MEDIAS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_MEDIAS),
    medias: payload.medias,
    params: {
      ...state.params,
      ...omit(payload, 'medias')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_MEDIAS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_MEDIAS),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_MEDIA),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_MEDIA),
    media: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_MEDIA),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_MEDIA),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_MEDIA),
    media: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_MEDIA),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_MEDIA),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_MEDIA),
    medias: reject(state.medias, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_MEDIA),
    error: payload,
    loading: false
  }),

}, initialState)

import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_CONTRACT, GET_CONTRACTS, CREATE_CONTRACT, UPDATE_CONTRACT, DELETE_CONTRACT }
  from '../modules/contract'
import apiCall from '../api/apiCall'
import {createNotification, handleError} from '../../helpers'
const doGetContract = apiCall({
  type: GET_CONTRACT,
  method: 'get',
  path: ({ payload }) => `/contracts/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doGetContracts = apiCall({
  type: GET_CONTRACTS,
  method: 'get',
  path: () => `/contracts/`,
  payloadOnSuccess: (res, { payload }) => ({
    contracts: res.contracts,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',]),
  }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doCreateContract = apiCall({
  type: CREATE_CONTRACT,
  method: 'post',
  path: () => `/contracts/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doUpdateContract = apiCall({
  type: UPDATE_CONTRACT,
  method: 'put',
  path: ({ payload }) => `/contracts/${payload.id}/`,
  fail: (payload) => createNotification('error', handleError(payload)),
})

const doDeleteContract = apiCall({
  type: DELETE_CONTRACT,
  method: 'delete',
  path: ({ payload }) => `/contracts/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id }),
  fail: (payload) => createNotification('error', handleError(payload)),
})

export default function* rootSaga () {
  yield takeLatest(GET_CONTRACT, doGetContract)
  yield takeLatest(GET_CONTRACTS, doGetContracts)
  yield takeLatest(CREATE_CONTRACT, doCreateContract)
  yield takeLatest(UPDATE_CONTRACT, doUpdateContract)
  yield takeLatest(DELETE_CONTRACT, doDeleteContract)
}

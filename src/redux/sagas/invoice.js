import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_INVOICE, GET_INVOICES, CREATE_INVOICE, UPDATE_INVOICE, DELETE_INVOICE }
  from '../modules/invoice'
import apiCall from '../api/apiCall'

const doGetInvoice = apiCall({
  type: GET_INVOICE,
  method: 'get',
  path: ({ payload }) => `/invoices/${payload.id}/`
})

const doGetInvoices = apiCall({
  type: GET_INVOICES,
  method: 'get',
  path: () => `/invoices/`,
  payloadOnSuccess: (res, { payload }) => ({
    invoices: res.invoices,
    count: res.count,
    ...pick(get(payload, 'params', {}), ['page', 'page_size',]),
  })
})

const doCreateInvoice = apiCall({
  type: CREATE_INVOICE,
  method: 'post',
  path: () => `/invoices/`
})

const doUpdateInvoice = apiCall({
  type: UPDATE_INVOICE,
  method: 'put',
  path: ({ payload }) => `/invoices/${payload.id}/`
})

const doDeleteInvoice = apiCall({
  type: DELETE_INVOICE,
  method: 'delete',
  path: ({ payload }) => `/invoices/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_INVOICE, doGetInvoice)
  yield takeLatest(GET_INVOICES, doGetInvoices)
  yield takeLatest(CREATE_INVOICE, doCreateInvoice)
  yield takeLatest(UPDATE_INVOICE, doUpdateInvoice)
  yield takeLatest(DELETE_INVOICE, doDeleteInvoice)
}

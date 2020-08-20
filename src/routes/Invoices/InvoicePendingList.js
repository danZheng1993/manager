import { Button, Table} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { withRouter } from 'react-router'

import Pagination from '../../components/Pagination'
import Loader from '../../containers/Loader'
import { getInvoices } from '../../redux/modules/invoice'
import { invoicesListSelector, invoicesParamsSelector, invoicesloadingSelector } from '../../redux/selectors'
import { BUTTONS } from '../../constants'

class InvoicesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      filter : {status: 'INVOICE_SENT'}
    }
  }
  static propTypes = {
    getInvoices: PropTypes.func,
    invoicesList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getInvoices, params } = this.props
    const {filter} = this.state
    getInvoices({ params : {...params, filter} })
  }

  handlePagination = (pagination) => {
    const { getInvoices, params } = this.props
    const {filter} = this.state
    getInvoices({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
        filter,
      }
    })
  }

  render() {
    const { invoicesList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>发票类型</th>
              <th>发票金额</th>
              <th>发票抬头</th>
              <th>纳税人识别号</th>
              <th>是否邮寄</th>
              <th>邮寄地址</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {invoicesList && invoicesList.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.type}</td>
                <td>{invoice.price}</td>
                <td>{invoice.headerType + ' ' + invoice.headerContent}</td>
                <td>{invoice.taxNumber}</td>
                <td>{invoice.isMail ? '是' : '否'}</td>
                <td>{invoice.mailAddress}</td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/invoices/view/${invoice._id}`}>
                    {BUTTONS.UPLOAD}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
      </div>
    )
  }
}

const selector = createStructuredSelector({
  invoicesList: invoicesListSelector,
  params: invoicesParamsSelector,
  loading: invoicesloadingSelector
})

const actions = {
  getInvoices
}

export default compose(
  connect(selector, actions),
  withRouter
)(InvoicesList)

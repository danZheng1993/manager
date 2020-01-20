import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../containers/Loader'
import { Table } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { getInvoice } from 'redux/modules/invoice'
import constants from '../../constants'
import { invoiceDetailSelector, invoicesloadingSelector } from '../../redux/selectors'

class InvoiceView extends Component {

  static propTypes = {
    getInvoice: PropTypes.func,
    invoice: PropTypes.object
  };

  componentWillMount () {
    const { getInvoice, match: { params }, getJobs } = this.props
    params.id && getInvoice({ id: params.id })
  }  

  render() {
    const { invoice, loading} = this.props
    return (
      <div>
        <Loader active={loading} />
        {invoice &&
        <div>
          <h2 className='text-left mb-5'>发票信息</h2>
          <Table size="sm" bordered className="detail-table">
            <tbody>
              <tr>
                <th scope="row">发票类型</th>
                <td>{invoice.type}</td>
                <th scope="row">发票抬头</th>
                <td>{invoice.headerContent}</td>
              </tr>
              <tr>
                <th scope="row">纳税人识别号</th>
                <td>{invoice.taxNumber}</td>
                <th scope="row">是否邮寄</th>
                <td>{invoice.isMail ? '是' : '否'}</td>
              </tr>
            </tbody>
          </Table>
          <h2 className='text-left mb-5'>发票图片</h2>
          
          <img src={constants.INVOICE_BASE_URL + invoice.path}    
                  width="50%" alt="invoice" />
        </div>
        }
      </div>
    )
  }
}

const selector = createStructuredSelector({
  invoice: invoiceDetailSelector,
  loading: invoicesloadingSelector,
})

const actions = {
  getInvoice
}

export default compose(
  connect(selector, actions),
  withRouter
)(InvoiceView)

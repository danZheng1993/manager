import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { withRouter } from 'react-router'

import { getDateTimeStr } from '../../helpers'
import { BUTTONS } from '../../constants'
import Pagination from '../../components/Pagination'
import Input from '../../components/InputField/InputComponent'
import Loader from '../../containers/Loader'
import { getInvoices } from '../../redux/modules/invoice'
import { invoicesListSelector, invoicesParamsSelector, invoicesloadingSelector } from '../../redux/selectors'

class InvoicesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      filter : {}
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

  handleFilter = () => {
    const { getInvoices, params } = this.props
    const { phoneNumber } = this.state
    let filter = {}
    if (phoneNumber) filter['phoneNumber'] = phoneNumber
    this.setState({filter})
    getInvoices({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter,
      }
    })
  }

  handleKeyPress(target) {
    if(target.charCode === 13){
      this.handleFilter()
    } 
  }
  render() {
    const { invoicesList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Input
              label='输入搜索 :'
              type='text'
              placeholder='手机号'
              onChange={(e) => this.setState({phoneNumber: e.target.value})}
              onKeyPress = {(target) => this.handleKeyPress(target)}
              />
          </Col>
        </Row>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>编号</th>
              <th>发票金额</th>
              <th>申请时间</th>
              <th>申请人</th>
              <th>是否邮寄</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {invoicesList && invoicesList.map((invoice, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{invoice.price}</td>
                <td>{getDateTimeStr(invoice.created)}</td>
                <td>{invoice.sender.userName}</td>
                <td>{invoice.isMail ? '是' : '否'}</td>
                <td>{invoice.status}</td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/invoices/view/${invoice._id}`}>
                    {BUTTONS.VIEW}
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
  getInvoices,
}

export default compose(
  connect(selector, actions),
  withRouter
)(InvoicesList)

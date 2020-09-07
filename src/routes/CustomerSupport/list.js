import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { withRouter } from 'react-router'

import confirm from '../../containers/ConfirmModal'
import { createNotification } from '../../helpers'
import { BUTTONS, LABEL, CONFIRM } from '../../constants'
import Pagination from '../../components/Pagination'
import Input from '../../components/InputField/InputComponent'
import Loader from '../../containers/Loader'
import { deleteSupportItem, getSupportItems, updateSupportItem } from '../../redux/modules/customerSupport'
import { supportItemListSelector, supportItemParamsSelector, supportItemLoadingSelector } from '../../redux/selectors'

class SupportItemsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contact: '',
      filter: {}
    }
  }

  componentWillMount () {
    const { getSupportItems, params } = this.props
    getSupportItems({ params })
  }

  handlePagination = (pagination) => {
    const { getSupportItems, params } = this.props
    const {filter} = this.state
    getSupportItems({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
        filter
      }
    })
  }

  handleFilter = () => {
    const { getSupportItems, params } = this.props
    const { contact } = this.state
    let filter = {}
    if (contact) filter['contact'] = contact
    this.setState({filter})
    getSupportItems({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter
      }
    })
  }

  handleDelete = (id) => () => {
    const { deleteSupportItem } = this.props
    confirm(CONFIRM.DELETE).then(
      () => {
        deleteSupportItem({ id, success: () => createNotification('success')})
      }
    )
  }

  handleChange = (id) => {
    const { updateSupportItem } = this.props
    updateSupportItem({
      id,
      body: {solved: true},
      success: () => createNotification('success'),
    })
  }

  render() {
    const { supportItemsList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Input
              label={LABEL.KEYWORD}
              type="text"
              onChange={(e) => this.setState({ contact: e.target.value })}
              />
            </Col>
            <Col md={6} style={{ paddingTop: 30 }}>
              <Row>
                <Col>
                  <Button color='secondary' onClick={this.handleFilter}>{BUTTONS.FILTER}</Button>
                </Col>
              </Row>
            </Col>
        </Row>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>编号</th>
              <th>客户类型</th>
              <th>联系电话</th>
              <th>问题描述</th>
              <th>是否解决</th>
              <th>备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {supportItemsList && supportItemsList.map((supportItem, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{supportItem.type === 'client' ? '服务方' : '需求方'}</td>
                <td>{supportItem.contact}</td>
                <td>{supportItem.description}</td>
                <td>{supportItem.solved ? '是' : '否'}</td>
                <td>{supportItem.remark}</td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/customer_support/edit/${supportItem._id}`}>
                    {BUTTONS.EDIT}
                  </Button>
                  {' '}
                  {!supportItem.solved && (
                    <Button color='primary' size='sm' onClick={() => this.handleChange(supportItem._id)}>
                      已解决
                    </Button>
                  )}
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDelete(supportItem._id)}>
                    {BUTTONS.DELETE}
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
  supportItemsList: supportItemListSelector,
  params: supportItemParamsSelector,
  loading: supportItemLoadingSelector
})

const actions = {
  getSupportItems,
  deleteSupportItem,
  updateSupportItem
}

export default compose(
  connect(selector, actions),
  withRouter
)(SupportItemsList)

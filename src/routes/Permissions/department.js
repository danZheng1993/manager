import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { withRouter } from 'react-router'
import moment from 'moment';
import Switch from 'react-switch';

import confirm from '../../containers/ConfirmModal'
import { createNotification } from '../../helpers'
import { BUTTONS, CONFIRM } from '../../constants'
import Pagination from '../../components/Pagination'
import Loader from '../../containers/Loader'
import { deleteDepartment, getDepartments, updateDepartment } from '../../redux/modules/department'
import { departmentListSelector, departmentParamsSelector, departmentLoadingSelector } from '../../redux/selectors'

class DepartmentsList extends Component {

  componentDidMount () {
    const { getDepartments, params } = this.props
    getDepartments({ params })
  }

  handlePagination = (pagination) => {
    const { getDepartments, params } = this.props
    getDepartments({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
      }
    })
  }

  handleDelete = (id) => () => {
    const { deleteDepartment } = this.props
    confirm(CONFIRM.DELETE).then(
      () => {
        deleteDepartment({ id, success: () => createNotification('success')})
      }
    )
  }

  handleChange = (id, active) => {
    const { updateDepartment } = this.props
    updateDepartment({
      id,
      body: {active: !active},
      success: () => createNotification('success'),
    })
  }

  render() {
    const { departmentsList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Button color='primary' tag={Link} size='sm' to={`/permissions/departments/new`}>
              {BUTTONS.ADD}
            </Button>
          </Col>
        </Row>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>部门名称</th>
              <th>职能描述</th>
              <th>成员数量</th>
              <th>添加时间</th>
              <th>是否启用</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {departmentsList && departmentsList.map((department, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{department.name}</td>
                <td>{department.description}</td>
                <td>{moment(department.created).format('YYYY-MM-DD')}</td>
                <td><Switch onChange={() => this.handleChange(department._id, department.active)} checked={department.active} /></td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/permissions/departments/view/${department._id}`}>
                    {BUTTONS.EDIT}
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDelete(department._id)}>
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
  departmentsList: departmentListSelector,
  params: departmentParamsSelector,
  loading: departmentLoadingSelector
})

const actions = {
  getDepartments,
  deleteDepartment,
  updateDepartment
}

export default compose(
  connect(selector, actions),
  withRouter
)(DepartmentsList)

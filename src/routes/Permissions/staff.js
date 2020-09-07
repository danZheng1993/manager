import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { withRouter } from 'react-router'
// import moment from 'moment';
import Switch from 'react-switch';

import confirm from '../../containers/ConfirmModal'
import { createNotification } from '../../helpers'
import { BUTTONS, CONFIRM } from '../../constants'
import Pagination from '../../components/Pagination'
import Loader from '../../containers/Loader'
import { getDepartments } from '../../redux/modules/department';
import { deleteStaff, getStaffs, updateStaff } from '../../redux/modules/staff'
import { staffListSelector, staffParamsSelector, staffLoadingSelector, departmentListSelector } from '../../redux/selectors'

class StaffsList extends Component {

  componentDidMount () {
    const { getStaffs, getDepartments, params } = this.props
    getStaffs({ params })
    getDepartments();
  }

  handlePagination = (pagination) => {
    const { getStaffs, params } = this.props
    getStaffs({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
      }
    })
  }

  handleDelete = (id) => () => {
    const { deleteStaff } = this.props
    confirm(CONFIRM.DELETE).then(
      () => {
        deleteStaff({ id, success: () => createNotification('success')})
      }
    )
  }

  handleChange = (id, active) => {
    const { updateStaff } = this.props
    updateStaff({
      id,
      body: {active: !active},
      success: () => createNotification('success'),
    })
  }

  getDepartmentName = (department) => {
    const { departments } = this.props;
    const depInfo = departments.find(dep => dep._id === department);
    if (depInfo) {
      return depInfo.name;
    }
    return '未知';
  }

  render() {
    const { staffsList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Button color='primary' tag={Link} size='sm' to={`/permissions/staffs/new`}>
              {BUTTONS.ADD}
            </Button>
          </Col>
        </Row>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>成员帐号</th>
              <th>姓名</th>
              <th>邮件地址</th>
              <th>所属部门</th>
              <th>是否启用</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {staffsList && staffsList.map((staff, index) => (
              <tr key={index}>
                <td>{staff.userName}</td>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{this.getDepartmentName(staff.department)}</td>
                {/* <td>{moment(staff.created).format('YYYY-MM-DD')}</td> */}
                <td><Switch onChange={() => this.handleChange(staff._id, staff.active)} checked={staff.active} /></td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/permissions/staffs/edit/${staff._id}`}>
                    {BUTTONS.EDIT}
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDelete(staff._id)}>
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
  staffsList: staffListSelector,
  departments: departmentListSelector,
  params: staffParamsSelector,
  loading: staffLoadingSelector
})

const actions = {
  getStaffs,
  getDepartments,
  deleteStaff,
  updateStaff
}

export default compose(
  connect(selector, actions),
  withRouter
)(StaffsList)

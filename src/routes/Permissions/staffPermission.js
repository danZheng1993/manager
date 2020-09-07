import React, { Component } from 'react'
import { Button, Col, Form, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { createStaff, getStaff, updateStaff } from '../../redux/modules/staff'
import { getDepartments } from '../../redux/modules/department';
import { isFieldRequired, createNotification } from '../../helpers'
import InputField from '../../components/InputField'
import * as selectors from '../../redux/selectors'
import { BUTTONS } from '../../constants'
import PermissionInput from '../../components/PermissionInput';

class PermissionEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      permissions: [],
      department: null,
    }
  }

  componentWillMount () {
    const { getStaff, getDepartments, match: { params } } = this.props
    params.id && getStaff({
      id: params.id, 
      success: (payload) => this.setState({ department: payload.data.department, permissions: JSON.parse(payload.data.permissions) })
    })
    getDepartments();
  }

  handleChangeDepartment = (e) => {
    console.log(e);
    // const department = this.props.departments.find(dep => dep._id === depId);
    // if (department) {
    //   this.setState({ permissions: JSON.parse(department.permissions), department: depId });
    // }
  }

  handleSave = (values) => {
    const { updateStaff, match: { params } } = this.props
    const { department, permissions } = this.state
    updateStaff({
      id: params.id,
      body: { department, permissions: JSON.stringify(permissions) },
      success: () => this.handleSuccess(),
      // fail: err => alert(err)
    })
  }

  handleSuccess = () => {
    createNotification('success')
    this.props.history.push('/permissions/staffs')
  }

  handlePermissionChange = (permissions) => {
    this.setState({ permissions });
  }

  getDepartmentOptions = () => {
    const { departments } = this.props;
    return departments.map(dep => ({ label: dep.name, value: dep._id }));
  }

  getDepartmentPermissions = (depId) => {
    const { departments } = this.props;
    const department = departments.find(dep => dep._id === depId);
    if (department) {
      return department.permissions;
    }
    return "[]";
  }

  render() {
    const { handleSubmit } = this.props
    const { permissions } = this.state;
    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>工单填写</h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='所属部门'
              name='department'
              type='select'
              placeholder="选择部门"
              required
              validate={[isFieldRequired]}
              component={InputField}
              options={this.getDepartmentOptions()}
              onChange={this.handleChangeDepartment}
            />
            <PermissionInput defaultPermissions={permissions} onChange={this.handlePermissionChange} />
            <Row>
              <Col xs={6}>
                <Link to='/permissions/staffs/' className='btn btn-secondary'>
                  {BUTTONS.CANCEL}
                </Link>
              </Col>
              <Col>
                <Button color='primary' type='submit'>{BUTTONS.SAVE}</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

const selector = createStructuredSelector({
  initialValues: (state, props) =>
    props.match.params.id ?  selectors.staffDetailSelector(state) : {},
  departments: selectors.departmentListSelector,
})

const actions = {
  createStaff,
  getStaff,
  updateStaff,
  getDepartments,
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'staffPermissionForm',
    enableReinitialize: true,
  }),
  withRouter
)(PermissionEditor)


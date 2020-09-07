import React, { Component } from 'react'
import { Button, Col, Form, Row, FormGroup, Input, Label } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Switch from 'react-switch';

import { createDepartment, getDepartment, updateDepartment } from '../../redux/modules/department'
import { isFieldRequired, createNotification } from '../../helpers'
import InputField from '../../components/InputField'
import * as selectors from '../../redux/selectors'
import { BUTTONS } from '../../constants'
import PermissionInput from '../../components/PermissionInput';

class DepartmentEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active : true,
      permissions: [],
    }
  }

  componentWillMount () {
    const { getDepartment, match: { params } } = this.props
    params.id && getDepartment({ id: params.id,  success: (payload) => this.setState({solved: payload.data.active, permissions: JSON.parse(payload.data.permissions)})})
  }

  handleSave = (values) => {
    const { createDepartment, updateDepartment, match: { params } } = this.props
    const {active, permissions} = this.state
    params.id
    ? updateDepartment({
      id: params.id,
      body: {...values, active, permissions: JSON.stringify(permissions)},
      success: () => this.handleSuccess(),
      fail: err => alert(err)
    })
    : createDepartment({
      body: {...values, active, permissions: JSON.stringify(permissions)},
      success: () => this.handleSuccess(),
      fail: err => alert(err)
    })
  }

  handleSuccess = () => {
    createNotification('success')
    this.props.history.push('/permissions/departments')
  }

  handleActiveChange = () => {
    this.setState({ active: !this.state.active });
  }

  handlePermissionChange = (permissions) => {
    this.setState({ permissions });
  }

  render() {
    const { handleSubmit } = this.props
    const { active, permissions } = this.state;

    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>工单填写</h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='部门名称'
              name='name'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='问题描述'
              name='description'
              type='textarea'
              component={InputField}
              validate={[isFieldRequired]}
            />
            <Row>
              <Col md={4}>
                <Label>是否启用</Label>
              </Col>
              <Col md={8}>
                <FormGroup check>
                  <Switch onChange={this.handleActiveChange} checked={active} />
                </FormGroup>
              </Col>
            </Row>
            <PermissionInput defaultPermissions={permissions} onChange={this.handlePermissionChange} />
            <Row>
              <Col xs={6}>
                <Link to='/permissions/departments/' className='btn btn-secondary'>
                  Cancel
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
    props.match.params.id ?  selectors.departmentDetailSelector(state) : {},
})

const actions = {
  createDepartment,
  getDepartment,
  updateDepartment
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'departmentForm',
    enableReinitialize: true,
  }),
  withRouter
)(DepartmentEdit)

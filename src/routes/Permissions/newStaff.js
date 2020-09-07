import React, { Component } from 'react'
import { Button, Col, Form, Row, FormGroup, Input, Label, Alert } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Switch from 'react-switch';

import { createStaff, getStaff, updateStaff } from '../../redux/modules/staff'
import { getDepartments } from '../../redux/modules/department';
import { isFieldRequired, createNotification } from '../../helpers'
import InputField from '../../components/InputField'
import * as selectors from '../../redux/selectors'
import { BUTTONS } from '../../constants'

class StaffEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active : true,
    }
  }

  componentWillMount () {
    const { getStaff, getDepartments, match: { params } } = this.props
    params.id && getStaff({ id: params.id,  success: (payload) => this.setState({active: payload.data.active, permissions: JSON.parse(payload.data.permissions)})})
    getDepartments();
  }

  handleSave = (values) => {
    const { createStaff, updateStaff, match: { params } } = this.props
    const { active } = this.state
    if (values.password !== '') {
      if (values.password !== values.confirmPassword) {
        createNotification('error', '密码不符合');
        return;
      }
    }
    const permissions = this.getDepartmentPermissions(values.department);
    params.id
    ? updateStaff({
      id: params.id,
      body: {...values, active, permissions},
      success: () => this.handleSuccess(),
      // fail: err => alert(err)
    })
    : createStaff({
      body: {...values, active, permissions},
      success: () => this.handleSuccess(),
      // fail: err => alert(err)
    })
  }

  handleSuccess = () => {
    createNotification('success')
    this.props.history.push('/permissions/staffs')
  }

  handleActiveChange = () => {
    this.setState({ active: !this.state.active });
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
    const { active } = this.state;
    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>工单填写</h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='成员名称'
              name='userName'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='成员姓名'
              name='name'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='邮件地址'
              name='email'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='电话号码'
              name='phoneNumber'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='所属部门'
              name='department'
              type='select'
              placeholder="选择部门"
              required
              validate={[isFieldRequired]}
              component={InputField}
              options={this.getDepartmentOptions()}
            />
            <div style={styles.description}>选择部门后，默认情况下会识别部门权限，可以在成员列表中单独设置</div>
            <Field
              label='登录密码'
              name='password'
              type='password'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='确认密码'
              name='confirmPassword'
              type='password'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='信息'
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

const styles = {
  description: {
    fontSize: '12px',
    marginBottom: '1rem'
  }
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'staffForm',
    enableReinitialize: true,
  }),
  withRouter
)(StaffEditor)


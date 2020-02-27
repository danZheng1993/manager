import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, Form, FormFeedback, FormGroup, Label, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { authStateSelector } from 'redux/selectors'
import { isFieldRequired } from 'helpers'
import { login, DO_LOGIN } from 'redux/modules/auth'
import { requestFail } from 'redux/api/request'
import { BUTTONS } from '../../constants'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <FormGroup color={touched && error ? 'danger' : ''}>
    <Label>
      {label}
    </Label>
    <input {...input} placeholder={label} type={type} className='form-control' />
    {touched && error && <FormFeedback>{error}</FormFeedback>}
  </FormGroup>
)

class Login extends Component {
  static propTypes = {
    auth: PropTypes.object,
    handleSubmit: PropTypes.func,
    login: PropTypes.func
  };

  handleLogin = (values) => {
    const { login } = this.props
    login({ body: values })
  }

  render() {
    const { auth, handleSubmit } = this.props

    return (
      <div className="block-center mt-4 wd-xl">
          {auth.status === requestFail(DO_LOGIN) &&
            <Alert color="danger">Login Failed!</Alert>
          }
        <div className="card card-flat">
            <div className="card-header text-center bg-dark">
                <a href="">
                  HVR
                </a>
            </div>
            <div className="card-body">
                <p className="text-center py-2">HVI后台业务管理系统</p>
                  <Form onSubmit={handleSubmit(this.handleLogin)}>
                    <Field
                      label='请输入用户名称'
                      name='phoneNumber'
                      type='phoneNumber'
                      validate={[isFieldRequired]}
                      component={renderField}
                    />
                    <Field
                      label='请输入密码'
                      name='password'
                      type='password'
                      validate={[isFieldRequired]}
                      component={renderField}
                    />
                    <Button style={{width: '100%'}} color='primary' type='submit'>{BUTTONS.LOGIN}</Button>
                  </Form>
            </div>
        </div>
        <div className="p-3 text-center">
            <span className="mr-2">&copy;</span>
            <span>{new Date().getFullYear()}</span>
            <span className="mx-2">-</span>
            <span>HVR</span>
        </div>
    </div>
    )
  }
}

const selector = createStructuredSelector({
  auth: authStateSelector
})

const actions = {
  login
}

export default compose(
  reduxForm({
    form: 'loginForm'
  }),
  connect(selector, actions)
)(Login)

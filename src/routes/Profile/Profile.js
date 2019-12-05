import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, Form, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router'
import { saveProfile, SAVE_PROFILE } from 'redux/modules/auth'
import { requestFail } from 'redux/api/request'
import { isFieldRequired, ucFirst } from 'helpers'
import InputField from 'components/InputField'

class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    saveProfile: PropTypes.func
  };

  handleSave = (values) => {
    const { history, saveProfile } = this.props
    saveProfile({
      body: {userName: values.userName, old_password: values.old_password, new_password: values.new_password},
      success: () => history.push('/dashboard')
    })
  }

  handleCancel = (values) => {
    const { history } = this.props
    history.push('/dashboard')
  }

  get errorText () {
    const { auth: { error } } = this.props
    return error
    ? Object.keys(error.data).map((key) => (
      <div key={key}>{ucFirst(error.data[key].toString())}</div>
    ))
    : ''
  }

  render() {
    const { auth, handleSubmit } = this.props
    return (
      <Row>
        <Col sm={12} md={{ size: 6, offset: 3 }}>
          {auth.status === requestFail(SAVE_PROFILE) &&
            <Alert color='danger'>{this.errorText}</Alert>
          }
          <h2 className='text-center mb-5'>Edit Your Profile</h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Row>
              <Col xs={12}>    
                <Field
                  label='userName'
                  name='userName'
                  type='text'
                  required
                  validate={[isFieldRequired]}
                  component={InputField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  label='旧密码'
                  name='old_password'
                  type='password'
                  placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
                  validate={[isFieldRequired]}
                  component={InputField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  label='新密码'
                  name='new_password'
                  type='password'
                  placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
                  validate={[isFieldRequired]}
                  component={InputField}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  label='确认新密码'
                  name='confirm_password'
                  type='password'
                  placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
                  validate={[isFieldRequired]}
                  component={InputField}
                />
              </Col>
            </Row>
            <div className='text-center'>
              <Button color='primary' type='submit'>Save Profile</Button>
              {' '}
              <Button color='default' type='button' onClick={this.handleCancel}>Cancel</Button>
            </div>
          </Form>
        </Col>
      </Row>
    )
  }
}

const selector = (state) => ({
  auth: state.auth,
  initialValues: state.auth.me
})

const actions = {
  saveProfile
}

const validate = values => {
  const errors = {}
  if (values.new_password !== values.confirm_password) {
    errors.confirm_password = 'Confirm Password should match with Password field.'
  }
  if (String(values.new_password).length < 6 || String(values.new_password).length > 20) {
    errors.new_password = '密码长度为6-26位，由数字和字母组合' 
  }
  return errors
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'profileForm',
    validate
  }),
  withRouter
)(Profile)

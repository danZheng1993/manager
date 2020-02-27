import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Row, Input } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router'
import { saveProfile } from 'redux/modules/auth'
import { isFieldRequired } from 'helpers'
import InputField from 'components/InputField'
import { createNotification, handleError } from '../../helpers'
import uploadFile from '../../redux/api/upload'
import { ADDRESS, BUTTONS } from '../../constants'
import Dropzone from 'react-dropzone';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      file: '',
      imagePreviewUrl: ''
    }
  }

  static propTypes = {
    auth: PropTypes.object,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    saveProfile: PropTypes.func
  };

  handleSave = (values) => {
    const { saveProfile } = this.props
    const {file} = this.state
    if (file) {
      uploadFile('profile/admin', 'post', file)
      .then(() => console.log("upload avatar success!"))
      .catch(err => alert(err))
    }
    saveProfile({
      body: {userName: values.userName, old_password: values.old_password, new_password: values.new_password},
      success: () => this.handleSuccess(),
    })
  }

  handleSuccess = () => {
    createNotification('success')
    this.props.history.push('/dashboard')
  }
  handleCancel = (values) => {
    const { history } = this.props
    history.push('/dashboard')
  }

  handleImageChange = (files)  => {
    let reader = new FileReader()
    let file = files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }
    file && reader.readAsDataURL(file)
  }

  render() {
    const { handleSubmit, initialValues } = this.props
    const {imagePreviewUrl} = this.state
    return (
      <Row>
        <Col sm={12} md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Row>
              <Col xs={12} className="text-center">
                <Dropzone className="card p-3 d-flex justify-content-center align-items-center" ref="dropzone" onDrop={this.handleImageChange} >
                  { imagePreviewUrl ? 
                    <img src={imagePreviewUrl}
                      className="avatar" alt="avatar" /> :
                    <img src={ADDRESS.BASE_URL + initialValues.photo}
                      className="avatar" alt="avatar" />
                  }
                </Dropzone>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>    
                <Field
                  label='用户名'
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
                  placeholder='original password'
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
                  placeholder='new password'
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
                  placeholder='password confirm'
                  validate={[isFieldRequired]}
                  component={InputField}
                />
              </Col>
            </Row>
            <div className='text-center'>
              <Button color='primary' type='submit'>{BUTTONS.SAVE}</Button>
              {' '}
              <Button color='default' type='button' onClick={this.handleCancel}>{BUTTONS.CANCEL}</Button>
            </div>
          </Form>
        </Col>
      </Row>
    )
  }
}

const selector = (state) => ({
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, Form, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { filter } from 'lodash'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { createMedia, getMedia, updateMedia, CREATE_MEDIA, UPDATE_MEDIA } from 'redux/modules/media'
import { isAdmin, isManager } from 'helpers/roleHelpers'
import { isFieldRequired, ucFirst } from 'helpers'
import { requestFail, requestSuccess } from '../../redux/api/request'
import * as selectors from 'redux/selectors'
import InputField from 'components/InputField'

const roleOptions = [
  {
    value: 'media',
    label: 'Media',
    roles: ['admin', 'manager']
  },
  {
    value: 'manager',
    label: 'Manager',
    roles: ['admin', 'manager']
  },
  {
    value: 'admin',
    label: 'Admin',
    roles: ['admin']
  }
]

const getRoleOptions = ({ role }) =>
  filter(roleOptions, (item) => item.roles.includes(role))

const requestIsFailed = ({ status }) =>
  status === requestFail(CREATE_MEDIA) || status === requestFail(UPDATE_MEDIA)

const requestIsSuccess = ({ status }) =>
  status === requestSuccess(CREATE_MEDIA) || status === requestSuccess(UPDATE_MEDIA)

class MediaEdit extends Component {
  static propTypes = {
    createMedia: PropTypes.func,
    getMedia: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    profile: PropTypes.object,
    updateMedia: PropTypes.func,
    mediaState: PropTypes.object
  };

  componentWillMount () {
    const { getMedia, match: { params } } = this.props
    params.id && getMedia({ id: params.id })
  }

  handleSave = (values) => {
    const { createMedia, updateMedia, match: { params }, history } = this.props
    params.id
    ? updateMedia({
      id: params.id,
      body: values
    })
    : createMedia({
      body: values,
      success: () => history.push('/medias')
    })
  }

  get errorText () {
    const { mediaState: { error } } = this.props
    return error
    ? Object.keys(error.data).map((key) => (
      <div key={key}>{ucFirst(error.data[key].toString())}</div>
    ))
    : ''
  }

  render() {
    const { mediaState, handleSubmit, initialValues, match: { params },
      profile } = this.props
    const shouldShowRoleField = (isAdmin(profile) || isManager(profile)) &&
      initialValues && profile.id !== initialValues.id

    return (
      <Row>
        <Col sm={12} md={{ size: 4, offset: 4 }}>
          {requestIsFailed(mediaState) &&
            <Alert color='danger'>{this.errorText}</Alert>
          }
          {requestIsSuccess(mediaState) &&
            <Alert color='success'>Updated successfully!</Alert>
          }
          <h2 className='text-center mb-5'>
            {params.id ? 'Edit Media' : 'Add New Media'}
          </h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='First Name'
              name='first_name'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='Last Name'
              name='last_name'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='phoneNumber'
              name='phoneNumber'
              type='phoneNumber'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            {shouldShowRoleField && <Field
              label='Role'
              name='role'
              type='select'
              required
              validate={[isFieldRequired]}
              component={InputField}
              options={getRoleOptions(profile)}
            />}
            <Field
              label='Password'
              name='password'
              type='password'
              placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
              required={!params.id}
              validate={!params.id ? [isFieldRequired] : undefined}
              component={InputField}
            />
            <Row>
              <Col xs={6}>
                <Link to='/medias' className='btn btn-secondary'>
                  Cancel
                </Link>
              </Col>
              <Col className='text-right'>
                <Button color='primary' type='submit'>Save</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

const selector = createStructuredSelector({
  profile: selectors.profileSelector,
  initialValues: (state, props) =>
    props.match.params.id ? selectors.mediaDetailSelector(state) : {},
  mediaState: selectors.mediaStateSelector
})

const actions = {
  createMedia,
  getMedia,
  updateMedia
}

const validate = values => {
  const errors = {}
  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Confirm Password should match with Password field.'
  }
  return errors
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'mediaForm',
    enableReinitialize: true,
    validate
  }),
  withRouter
)(MediaEdit)

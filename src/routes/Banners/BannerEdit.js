import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Row, FormGroup, Input, Label } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { createBanner, getBanner, updateBanner } from 'redux/modules/banner'
import { isFieldRequired, createNotification } from 'helpers'
import InputField from 'components/InputField'
import * as selectors from 'redux/selectors'
import DateTimeField from 'components/DateTimeField'

class BannerEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status : true,
    }
  }
  static propTypes = {
    createBanner: PropTypes.func,
    getBanner: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    profile: PropTypes.object,
    updateBanner: PropTypes.func,
    bannerState: PropTypes.object
  };

  componentWillMount () {
    const { getBanner, match: { params } } = this.props
    params.id && getBanner({ id: params.id,  success: (payload) => this.setState({status: payload.data.status})})
  }

  handleSave = (values) => {
    const { createBanner, updateBanner, match: { params }, history } = this.props
    const {status} = this.state
    params.id
    ? updateBanner({
      id: params.id,
      body: {...values, status},
      success: () => createNotification('success'),
      fail: (payload) => createNotification('error', payload.data.message)
    })
    : createBanner({
      body: {...values, status},
      success: () => this.handleSuccess(),
      fail: (payload) => createNotification('error', payload.data.message)
    })
  }

  handleSuccess = () => {
    createNotification('success'),
    this.props.history.push('/banners')
  }

  render() {
    const { handleSubmit, match: { params }, initialValues} = this.props
    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>
            {params.id ? 'Edit Banner' : 'Add New Banner'}
          </h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='广告名称'
              name='title'
              placeholder="广告名称只是作为辨别多个广告条目只用，并不显示在广告中"
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Row>
              <Col md={6} xs={12}>
                <Field
                  label="开始时间"
                  placeholder='From'
                  name='from'
                  dateFormat='YYYY-MM-DD'
                  required
                  validate={[isFieldRequired]}
                  timeFormat={false}
                  component={DateTimeField}
                />
              </Col>
              <Col md={6} xs={12}>
                <Field
                  label="到期时间"
                  placeholder='To'
                  name='to'
                  dateFormat='YYYY-MM-DD'
                  required
                  validate={[isFieldRequired]}
                  timeFormat={false}
                  component={DateTimeField}
                />
              </Col>
            </Row> 
            <Row>
              <Col md={4}>
                <Label>上线/下线</Label>
              </Col>
              <Col md={8}>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="status" checked={this.state.status} onChange={() => this.setState({status : true})}/>上线
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="status" checked={!this.state.status} onChange={() => this.setState({status : false})}/>下线
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Field
              label='广告链接'
              name='url'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='广告备注'
              name='description'
              type='textarea'
              component={InputField}
            />
            <Row>
              <Col xs={6}>
                <Link to='/banners' className='btn btn-secondary'>
                  Cancel
                </Link>
              </Col>
              <Col>
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
  initialValues: (state, props) =>
    props.match.params.id ?  selectors.bannerDetailSelector(state) : {},
})

const actions = {
  createBanner,
  getBanner,
  updateBanner
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'bannerForm',
    enableReinitialize: true,
  }),
  withRouter
)(BannerEdit)

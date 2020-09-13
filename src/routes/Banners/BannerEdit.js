import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Row, FormGroup, Input, Label } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Dropzone from 'react-dropzone';

import { createBanner, getBanner, updateBanner } from '../../redux/modules/banner'
import { isFieldRequired, createNotification } from '../../helpers'
import uploadFile from '../../redux/api/upload'
import InputField from '../../components/InputField'
import * as selectors from '../../redux/selectors'
import DateTimeField from '../../components/DateTimeField'
import { ADDRESS, BUTTONS, RULES, PLACEHOLDER } from '../../constants'

class BannerEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status : true,
      image: '',
      file: '',
      imagePreviewUrl: ''
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
  }

  componentWillMount () {
    const { getBanner, match: { params } } = this.props
    params.id && getBanner({ id: params.id,  success: (payload) => this.setState({status: payload.data.status, imagePreviewUrl: ADDRESS.BANNER_BASE_URL + payload.data.image})})
  }

  handleSave = (values) => {
    const { createBanner, updateBanner, match: { params } } = this.props
    const {status, file} = this.state
    if (!file)  return
    params.id
    ? updateBanner({
      id: params.id,
      body: {...values, status},
      success: (payload) => 
        uploadFile('banners/upload', 'post', file, {id: params.id})
        .then(() => createNotification('success'))
        .catch(err => alert(err)),
    })
    : createBanner({
      body: {...values, status},
      success: (payload) => 
        uploadFile('banners/upload', 'post', file, {id: payload.data._id})
        .then(() => this.handleSuccess())
        .catch(err => alert(err)),
    })
  }

  handleSuccess = () => {
    createNotification('success')
    this.props.history.push('/banners')
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
    const { handleSubmit, match: { params } } = this.props
    let {imagePreviewUrl} = this.state

    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>
            {params.id ? '编辑广告' : '添加广告'}
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
            <Row>
              <Col md={12}>
                <Label >广告图片 :</Label>
                <Dropzone
                  className="card p-3 d-flex justify-content-center align-items-center"
                  ref="dropzone"
                  accept={RULES.IMAGE}
                  onDrop={this.handleImageChange}
                  style={{borderWidth: 1, borderColor: '#dde6e9'}}
                >
                  {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {imagePreviewUrl ?
                        <img src={imagePreviewUrl} alt="splash" style={{width: '100%', height: '100%'}} />
                      :
                        <div style={{ display: 'inline-block', padding: '8px 16px 0px 16px', lineHeight: '18px', border: '1px solid #9c9c9c', borderRadius: '4px' }}>
                          <p>{PLACEHOLDER.IMAGE}</p>
                        </div>
                      }
                    </div>
                  )}
                </Dropzone>
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

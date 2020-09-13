import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectModal } from 'redux-modal'
import { createStructuredSelector } from 'reselect'
import Dropzone from 'react-dropzone';

import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'
import { Field, reduxForm } from 'redux-form'

import { isFieldRequired, createNotification } from '../../helpers'
import DateTimeField from '../../components/DateTimeField'
import InputField from '../../components/InputField'
import { BUTTONS, PLACEHOLDER, RULES } from '../../constants'
import upload from '../../redux/api/upload'


class AwardModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: ''
    }
  }

  handleFilter = (values) => {
    const { users } = this.props
    const { file } = this.state
    if (!file || !users) return;
    upload('awards/upload', 'post', file, {...values, users})
    .then(() => createNotification('success'))
    .catch(err => alert(err))
    this.props.handleHide()
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
    const { show, handleHide, handleSubmit, users } = this.props
    const { imagePreviewUrl } = this.state
    return (
      <Modal isOpen={show} toggle={handleHide} size='sm'>
        <ModalHeader toggle={this.toggle} className="text-center">
          红包设置
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12}>
              <Form onSubmit={handleSubmit(this.handleFilter)}>
                <FormGroup row>
                  <Label sm={4}>发放人数</Label>
                  <Col sm={8}>
                    <Input static>
                      共选中{users.length}人
                    </Input>
                  </Col>
                </FormGroup>
                <Field
                  label="红包总额"
                  name='amount'
                  dateFormat='YYYY-MM-DD'
                  type="number"
                  timeFormat={false}
                  validate={[isFieldRequired]}
                  component={InputField}
                />
                <Field
                  label="开始时间"
                  placeholder='请选择时间'
                  name='from'
                  dateFormat='YYYY-MM-DD'
                  timeFormat={false}
                  validate={[isFieldRequired]}
                  component={DateTimeField}
                />
                <Field
                  label="结束时间"
                  placeholder='请选择时间'
                  name='to'
                  dateFormat='YYYY-MM-DD'
                  timeFormat={false}
                  validate={[isFieldRequired]}
                  component={DateTimeField}
                />
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
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={handleSubmit(this.handleFilter)} >{BUTTONS.POST}</Button>
          <Button style={{float: 'right'}} color="danger" onClick={handleHide}>{BUTTONS.CLOSE}</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const selector = createStructuredSelector({
})

const actions = {
}

export default compose(
  connectModal({ name: 'awardModal', destroyOnHide: false }),
  connect(selector, actions),
  reduxForm({
    form: 'awardFilterForm',
    enableReinitialize: true
  }),
)(AwardModal)

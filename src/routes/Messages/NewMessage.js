import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Row, Label } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import Dropzone from 'react-dropzone';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { createMessage,  } from '../../redux/modules/messages'
import { isFieldRequired, createNotification } from '../../helpers'
import InputField from '../../components/InputField'
import * as selectors from '../../redux/selectors'
import { ADDRESS, BUTTONS, RULES, PLACEHOLDER, TARGET_AUDIENCE } from '../../constants'
import uploadFile from '../../redux/api/upload'

class MessageEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content : '',
      editorSate: '',
      file: null,
      imagePreviewUrl: ''
    }
  }
  static propTypes = {
    createMessage: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    profile: PropTypes.object,
    messageState: PropTypes.object
  };

  initEditorState = (message) => {
    if (message.content) {
      const blocksFromHtml = htmlToDraft(message.content)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorState = EditorState.createWithContent(contentState)
      this.setState({editorState})
    }
  }

  getMessageType = () => {
    const { location: { search } } = this.props
    return search.split('type=')[1];
  }
  handleSave = (values) => {
    const { createMessage, match: { type } } = this.props
    const { file } = this.state;
    createMessage({
      body: {...values, type},
      success: (payload) => {
        console.log({ payload });
        if (file && this.getMessageType() === 'event') {
          uploadFile('messages/upload', 'post', file, {id: payload.data._id})
            .then(() => {
              createNotification('成功')
              this.props.history.push('/message')
            })
            .catch(err => alert(err));
        } else {
          createNotification('成功')
        }
      },
    })
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

  handleSuccess = () => {
    createNotification('success')
  }

  onEditorStateChange = (editorState) => {
     const value=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({
      content: value,
      editorState
    })
  };

  render() {
    const { handleSubmit } = this.props;
    const { imagePreviewUrl } = this.state;
    const type = this.getMessageType();
    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>
            {type === 'notification' ? '发送新通知' : '发送新活动'}
          </h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='信息内容'
              name='content'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            {type === 'event' && (
              <Field
                label="信息内容"
                name="title"
                type='text'
                required
                validate={[isFieldRequired]}
                component={InputField}
              />
            )}
            <Field
              label='选择范围'
              name='target'
              type='select'
              required
              validate={[isFieldRequired]}
              component={InputField}
              options={TARGET_AUDIENCE}
            />
            {type === 'event' && (
              <Row style={{ marginTop: 16, marginBottom: 16 }}>
                <Col md={12}>
                  <Label >图片 :</Label>
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
                          <div
                            style={{
                              display: 'inline-block',
                              padding: '8px 16px 0px 16px',
                              lineHeight: '18px',
                              border: '1px solid #9c9c9c',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              margin: '16px',
                            }}
                          >
                            <p>{PLACEHOLDER.IMAGE}</p>
                          </div>
                        }
                      </div>
                    )}
                  </Dropzone>
                </Col>
              </Row>
            )}
            <Row>
              <Col xs={6}>
                <Link to='/message' className='btn btn-secondary'>
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
    props.match.params.id ?  selectors.messageDetailSelector(state) : {},
})

const actions = { createMessage }

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'messageForm',
    enableReinitialize: true,
  }),
  withRouter
)(MessageEdit)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { createMessage, getMessage, updateMessage } from 'redux/modules/message'
import { isFieldRequired, createNotification } from 'helpers'
import InputField from 'components/InputField'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import * as selectors from 'redux/selectors'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { BUTTONS } from '../../constants'

class MessageEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content : '',
      editorSate: ''
    }
  }
  static propTypes = {
    createMessage: PropTypes.func,
    getMessage: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    profile: PropTypes.object,
    updateMessage: PropTypes.func,
    messageState: PropTypes.object
  };

  componentWillMount () {
    const { getMessage, match: { params } } = this.props
    params.id && getMessage({ id: params.id , success: (payload) => this.initEditorState(payload.data)})
  }

  initEditorState = (message) => {
    if (message.content) {
      const blocksFromHtml = htmlToDraft(message.content)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorState = EditorState.createWithContent(contentState)
      this.setState({editorState})
    }
  }
  handleSave = (values) => {
    const { createMessage, updateMessage, match: { params } } = this.props
    const {content} = this.state
    params.id
    ? updateMessage({
      id: params.id,
      body: {...values, content},
      success: () => createNotification('success'),
    })
    : createMessage({
      body: {...values, content},
      success: () => this.handleSuccess(),
    })
  }

  handleSuccess = () => {
    createNotification('success')
    this.props.history.push('/message')
  }

  onEditorStateChange = (editorState) => {
     const value=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({
      content: value,
      editorState
    })
  };

  render() {
    const { handleSubmit, match: { params } } = this.props
    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>
            {params.id ? 'Edit Message' : 'Add New Message'}
          </h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='标题'
              name='title'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='新闻来源'
              name='source'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Editor
              onEditorStateChange={this.onEditorStateChange}
              editorState = {this.state.editorState}
            />
            <Field
              label='添加新闻链接'
              name='path'
              type='text'
              component={InputField}
            />
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

const actions = {
  createMessage,
  getMessage,
  updateMessage
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'messageForm',
    enableReinitialize: true,
  }),
  withRouter
)(MessageEdit)

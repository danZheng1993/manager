import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { createNews, getNews, updateNews } from 'redux/modules/news'
import { isFieldRequired, createNotification } from 'helpers'
import InputField from 'components/InputField'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import * as selectors from 'redux/selectors'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class NewsEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content : '',
      editorSate: ''
    }
  }
  static propTypes = {
    createNews: PropTypes.func,
    getNews: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    profile: PropTypes.object,
    updateNews: PropTypes.func,
    newsState: PropTypes.object
  };

  componentWillMount () {
    const { getNews, match: { params } } = this.props
    params.id && getNews({ id: params.id , success: (payload) => this.initEditorState(payload.data)})
  }

  initEditorState = (news) => {
    if (news.content) {
      const blocksFromHtml = htmlToDraft(news.content)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorState = EditorState.createWithContent(contentState)
      this.setState({editorState})
    }
  }
  handleSave = (values) => {
    const { createNews, updateNews, match: { params }, history } = this.props
    const {content} = this.state
    params.id
    ? updateNews({
      id: params.id,
      body: {...values, content},
      success: () => createNotification('success'),
      fail: (payload) => createNotification('error', payload.data.message)
    })
    : createNews({
      body: {...values, content},
      success: () => this.handleSuccess(),
      fail: (payload) => createNotification('error', payload.data.message)
    })
  }

  handleSuccess = () => {
    createNotification('success'),
    this.props.history.push('/news')
  }

  onEditorStateChange = (editorState) => {
     const value=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({
      content: value,
      editorState
    })
  };

  render() {
    const { handleSubmit, match: { params }, initialValues} = this.props
    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>
            {params.id ? 'Edit News' : 'Add New News'}
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
                <Link to='/newss' className='btn btn-secondary'>
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
    props.match.params.id ?  selectors.newsDetailSelector(state) : {},
})

const actions = {
  createNews,
  getNews,
  updateNews
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'newsForm',
    enableReinitialize: true,
  }),
  withRouter
)(NewsEdit)

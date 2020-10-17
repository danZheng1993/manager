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
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Dropzone from 'react-dropzone';
import isEmpty from 'lodash/isEmpty';

import { ADDRESS, BUTTONS, RULES, PLACEHOLDER } from '../../constants'
import * as selectors from '../../redux/selectors'
import uploadFile from '../../redux/api/upload'
import { createNews, getNews, updateNews } from '../../redux/modules/news'
import { isFieldRequired, createNotification } from '../../helpers'
import InputField from '../../components/InputField'

class NewsEdit extends Component {
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

  componentDidUpdate (prevProps) {
    const { getNews, match: { params } } = this.props;
    const { match: { params: prevParams } } = prevProps;
    if (params.id !== prevParams.id) {
      params.id && getNews({ id: params.id , success: (payload) => this.initEditorState(payload.data)})
    }
  }

  initEditorState = (news) => {
    if (news.content) {
      const blocksFromHtml = htmlToDraft(news.content)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const editorState = EditorState.createWithContent(contentState)
      this.setState({editorState, content: news.content, imagePreviewUrl: isEmpty(news.image) ? null : ADDRESS.NEWS_BASE_URL + news.image})
    }
  }
  handleSave = (values) => {
    const { createNews, updateNews, match: { params } } = this.props
    const { content, file } = this.state
    params.id
    ? updateNews({
      id: params.id,
      body: {...values, content},
      success: (payload) => {
        if (file) {
          uploadFile('news/upload', 'post', file, {id: params.id})
            .then(() => createNotification('success'))
            .catch(err => alert(err));
        } else {
          createNotification('success')
        }
      },
    })
    : createNews({
      body: {...values, content},
      success: (payload) => {
        if (file) {
          uploadFile('news/upload', 'post', file, {id: payload.data._id})
            .then(() => createNotification('success'))
            .catch(err => alert(err));
        } else {
          createNotification('success')
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
    const { handleSubmit, match: { params } } = this.props
    const { imagePreviewUrl } = this.state;
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
            <Row style={{ marginTop: 16, marginBottom: 16 }}>
              <Col md={12}>
                <Label >资讯图片 :</Label>
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
            <Row>
              <Col xs={6}>
                <Link to='/news' className='btn btn-secondary'>
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

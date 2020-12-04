import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import { Button, Col, Form, Row, Label } from 'reactstrap'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import { Link } from 'react-router-dom'

import { ADDRESS, BUTTONS, RULES, PLACEHOLDER } from '../../constants'
import { isFieldRequired, createNotification } from '../../helpers'

import Loader from '../../containers/Loader'
import { getContract, createContract, updateContract } from '../../redux/modules/contract'
import { contractDetailSelector, contractsloadingSelector } from '../../redux/selectors'

class ContractView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab : '1',
      firstEditorSate: '',
      secondEditorSate: '',
      first: '',
      second: '',
      created: null,
    }
  }
  static propTypes = {
    getContract: PropTypes.func,
    contract: PropTypes.object
  };

  componentWillMount () {
    const { getContract, match: { params } } = this.props
    params.id && getContract({ id: params.id, success: (payload) => this.initState(payload.data) })
  }  

  initState = ({ first, second, created }) => {
    if (first) {
      const blocksFromHtml = htmlToDraft(first)
      const { contentBlocks, entityMap } = blocksFromHtml
      const firstState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const firstEditorState = EditorState.createWithContent(firstState)
      this.setState({ firstEditorState, first })
    }
    if (second) {
      const blocksFromHtml = htmlToDraft(second)
      const { contentBlocks, entityMap } = blocksFromHtml
      const secondState = ContentState.createFromBlockArray(contentBlocks, entityMap)
      const secondEditorState = EditorState.createWithContent(secondState)
      this.setState({ secondEditorState, second, })
    }
    if (created) {
      this.setState({ created });
    }
  }

  onFirstEditorStateChange = (editorState) => {
    const value=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({
      first: value,
      firstEditorState: editorState
    });
 };

  onSecondEditorStateChange = (editorState) => {
    const value=draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({
      second: value,
      secondEditorState: editorState
    });
  };

  handleSave = () => {
    const { first, second, created } = this.state;
    const { updateContract, createContract, match: { params } } = this.props;
    if (params.id) {
      updateContract({
        id: params.id,
        body: { first, second, created },
        success: (payload) => {
          createNotification('success')
        },
      })
    } else {
      createContract({
        body: { first, second, created: Date.now() },
        success: (payload) => {
          createNotification('success')
        },
      });
    }
  }

  render() {
    const { contract, loading, match: { params } } = this.props
    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <Loader active={loading} />
          <div>
            <div className="contract_detail">
              <Editor
                onEditorStateChange={this.onFirstEditorStateChange}
                editorState = {this.state.firstEditorState}
              />
            </div>
            <div className="contract_detail">
              <Editor
                onEditorStateChange={this.onSecondEditorStateChange}
                editorState = {this.state.secondEditorState}
              />
            </div>
          </div>
          <Row>
            <Col xs={6}>
              <Link to='/contracts' className='btn btn-secondary'>
                {BUTTONS.CANCEL}
              </Link>
            </Col>
            <Col>
              <Button color='primary' onClick={this.handleSave}>{BUTTONS.SAVE}</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

const selector = createStructuredSelector({
  contract: contractDetailSelector,
  loading: contractsloadingSelector,
})

const actions = {
  getContract,
  createContract,
  updateContract,
}

export default compose(
  connect(selector, actions),
  withRouter
)(ContractView)

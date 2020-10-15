import { Button, Table, Row, Col, Label} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick, isEqual } from 'lodash'
import { withRouter } from 'react-router'

import { getDateTimeStr, createNotification } from '../../helpers'
import { BUTTONS, LABEL, PLACEHOLDER, CONFIRM, TARGET_AUDIENCE } from '../../constants'
import DateRangePicker from '../../components/DateRangePicker'
import ReportModal from '../../containers/ReportModal'
import confirm from '../../containers/ConfirmModal'
import Pagination from '../../components/Pagination'
import Input from '../../components/InputField/InputComponent'
import Loader from '../../containers/Loader'
import { deleteMessage, getMessages } from '../../redux/modules/messages'
import { messagesListSelector, messagesParamsSelector, messagesloadingSelector } from '../../redux/selectors'

class MessagesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      target: 'all',
      filter: {}
    }
  }
  static propTypes = {
    getMessages: PropTypes.func,
    messagesList: PropTypes.array,
    history: PropTypes.object,
  };

  componentDidMount() {
    const { getMessages, params, location: { search } } = this.props
    const type = search.split('type=')[1];
    getMessages({ params: { ...params, filter: { ...params.filter, type } } });
  }

  componentDidUpdate(prevProps) {
    const { params: prevParams, location: { search: prevSearch } } = prevProps;
    const { getMessages, params, location: { search } } = this.props;
    if (!isEqual(params, prevParams) || !isEqual(prevSearch, search)) {
      const type = search.split('type=')[1];
      getMessages({ params: { ...params, filter: { ...params.filter, type } } });
    }
  }

  handlePagination = (pagination) => {
    const { getMessages, params, location: { search } } = this.props
    const {filter} = this.state
    const type = search.split('type=')[1];
    getMessages({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
        filter: { ...filter, type: type || undefined }
      }
    })
  }

  handleAdd = () => {
    const { location: { search } } = this.props;
    const type = search.split('type=')[1];
    this.props.history.push(`/message/new?type=${type || 'notification'}`)
  }

  handleFilter = () => {
    const { getMessages, params, match: { params: routeParam } } = this.props
    const { target } = this.state
    let filter = {}
    if (target) filter['target'] = target
    this.setState({filter})
    getMessages({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter: { ...filter, type: routeParam.type || undefined }
      }
    })
  }

  handleSelect =(date)  => {
    this.setState({selectionRange: date.selection})
  }

  handleDelete = (id) => () => {
    const { deleteMessage } = this.props
    confirm(CONFIRM.DELETE).then(
      () => {
        deleteMessage({ id, success: () => createNotification('success')})
      }
    )
  }

  onChangeRange = (picker) => {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    })
  }

  render() {
    const { messagesList, params, loading } = this.props
    const { startDate, endDate } = this.state
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Input
              label="选择范围"
              type='select'
              options={TARGET_AUDIENCE}
              onChange={(e) => this.setState({target: e.target.value})}
              />
          </Col>
          <Col md={6}>
            <Label>   </Label>
            <Row>
              <Col>
                <Button color='secondary' onClick={this.handleFilter}>{BUTTONS.FILTER}</Button>
                <div style={{ display: 'inline-block', width: '16px' }} />
                <Button color='primary' onClick={this.handleAdd}>{params.type === 'message' ? '发送新通知' : '发送新活动'}</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>编号</th>
              <th>Message Content</th>
              <th>发布时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {messagesList && messagesList.map((message, index) => (
              <tr key={index}>
                <th scope='row'>{message.id}</th>
                <td>{message.content}</td>
                <td>{getDateTimeStr(message.created)}</td>
                <td>
                  {/* <Button color='primary' tag={Link} size='sm' to={`/message/edit/${message._id}`}>
                    {BUTTONS.EDIT}
                  </Button> */}
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDelete(message._id)}>
                    {BUTTONS.DELETE}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
        <ReportModal />    
      </div>
    )
  }
}

const selector = createStructuredSelector({
  messagesList: messagesListSelector,
  params: messagesParamsSelector,
  loading: messagesloadingSelector
})

const actions = {
  getMessages,
  deleteMessage,
}

export default compose(
  connect(selector, actions),
  withRouter
)(MessagesList)

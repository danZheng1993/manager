import { Button, Table, Row, Col, Label} from 'reactstrap'
import React, { Component } from 'react'
import Loader from '../../containers/Loader'
import { deleteMessage, getMessages, updateMessage } from 'redux/modules/message'
import { messagesListSelector, messagesParamsSelector, messagesloadingSelector } from 'redux/selectors'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import Input from 'components/InputField/InputComponent'
import PropTypes from 'prop-types'
import ReportModal from 'containers/ReportModal'
import confirm from 'containers/ConfirmModal'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { getDateTimeStr, createNotification } from 'helpers'
import { withRouter } from 'react-router'
import Switch from 'react-switch'
import { BUTTONS, LABEL, PLACEHOLDER, CONFIRM } from '../../constants'
import DateRangePicker from '../../components/DateRangePicker'

class MessagesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: '',
      title: '',
      filter: {}
    }
  }
  static propTypes = {
    getMessages: PropTypes.func,
    messagesList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getMessages, params } = this.props
    getMessages({ params })
  }

  handlePagination = (pagination) => {
    const { getMessages, params } = this.props
    const {filter} = this.state
    getMessages({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
        filter
      }
    })
  }

  handleFilter = () => {
    const { getMessages, params } = this.props
    const { title, startDate, endDate } = this.state
    let filter = {}
    if (title) filter['title'] = title
    if (startDate) filter['startDate'] = startDate
    if (endDate) filter['endDate'] = endDate
    this.setState({filter})
    getMessages({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter
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

  handleChange = (id, value) => {
    const {updateMessage,} = this.props
    updateMessage({
      id,
      body: {setBanner: !value},
      success: () => createNotification('success'),
    })
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
              label={LABEL.TITLE}
              type='text'
              placeholder={PLACEHOLDER.TITLE}
              onChange={(e) => this.setState({title: e.target.value})}
              />
            </Col>
            <Col md={6}>
              <Label>{LABEL.DATE}</Label>
              <Row>
                <Col md={8}>
                  <DateRangePicker startDate={startDate} endDate={endDate} onChangeRange={this.onChangeRange}/>
                </Col>
                <Col>
                  <Button color='secondary' onClick={this.handleFilter}>{BUTTONS.FILTER}</Button>
                </Col>
              </Row>
            </Col>
        </Row>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>选择</th>
              <th>标题</th>
              <th>发布时间</th>
              <th>阅读数量</th>
              <th>设为banner展示</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {messagesList && messagesList.map((message, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{message.title}</td>
                <td>{getDateTimeStr(message.created)}</td>
                <td>{message.visits}</td>
                <td><Switch onChange={() => this.handleChange(message._id, message.setBanner)} checked={message.setBanner} /></td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/message/edit/${message._id}`}>
                    {BUTTONS.EDIT}
                  </Button>
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
  updateMessage
}

export default compose(
  connect(selector, actions),
  withRouter
)(MessagesList)

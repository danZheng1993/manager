import { Button, Table, Row, Col, Label} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick, orderBy } from 'lodash'
import { withRouter } from 'react-router'
import Switch from 'react-switch'

import { BUTTONS, LABEL, PLACEHOLDER, CONFIRM } from '../../constants'
import DateRangePicker from '../../components/DateRangePicker'
import { getDateTimeStr, createNotification } from '../../helpers'
import ReportModal from '../../containers/ReportModal'
import confirm from '../../containers/ConfirmModal'
import Pagination from '../../components/Pagination'
import Input from '../../components/InputField/InputComponent'
import Loader from '../../containers/Loader'
import { deleteNews, getNewss, updateNews } from '../../redux/modules/news'
import { newssListSelector, newssParamsSelector, newssloadingSelector } from '../../redux/selectors'

class NewssList extends Component {
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
    getNewss: PropTypes.func,
    newssList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getNewss, params } = this.props
    getNewss({ params })
  }

  handlePagination = (pagination) => {
    const { getNewss, params } = this.props
    const {filter} = this.state
    getNewss({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
        filter
      }
    })
  }

  handleFilter = () => {
    const { getNewss, params } = this.props
    const { title, startDate, endDate } = this.state
    let filter = {}
    if (title) filter['title'] = title
    if (startDate) filter['startDate'] = startDate
    if (endDate) filter['endDate'] = endDate
    this.setState({filter})
    getNewss({
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
    const { deleteNews } = this.props
    confirm(CONFIRM.DELETE).then(
      () => {
        deleteNews({ id, success: () => createNotification('success')})
      }
    )
  }

  handleChange = (id, value) => {
    const {updateNews,} = this.props
    updateNews({
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
    const { newssList, params, loading } = this.props
    const { startDate, endDate } = this.state
    const pagination = pick(params, ['page', 'page_size', 'count'])
    const orderedNewsList = orderBy(newssList, ['created'], ['desc']);
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
              <th>设为首页显示</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orderedNewsList && orderedNewsList.map((news, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{news.title}</td>
                <td>{getDateTimeStr(news.created)}</td>
                <td>{news.visits}</td>
                <td><Switch onChange={() => this.handleChange(news._id, news.setBanner)} checked={news.setBanner} /></td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/news/edit/${news._id}`}>
                    {BUTTONS.EDIT}
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDelete(news._id)}>
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
  newssList: newssListSelector,
  params: newssParamsSelector,
  loading: newssloadingSelector
})

const actions = {
  getNewss,
  deleteNews,
  updateNews
}

export default compose(
  connect(selector, actions),
  withRouter
)(NewssList)

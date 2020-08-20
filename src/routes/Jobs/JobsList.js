import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { show } from 'redux-modal'
import { withRouter } from 'react-router'

import Pagination from '../../components/Pagination'
import confirm from '../../containers/ConfirmModal'
import Input from '../../components/InputField/InputComponent'
import Loader from '../../containers/Loader'
import { deleteJob, getJobs } from '../../redux/modules/job'
import { jobsListSelector, jobsParamsSelector, jobsloadingSelector } from '../../redux/selectors'
import { getDateTimeStr, createNotification } from '../../helpers'
import { BUTTONS, CONFIRM } from '../../constants'

const statusOptions = [
  {label: '全部', value: '' }, 
  {label: '竞标中', value: '竞标中' }, 
  {label: '待付款', value: '待付款' }, 
  {label: '待拍摄', value: '待拍摄' }, 
  {label: '待验收', value: '待验收' }, 
  {label: '评价', value: '评价' }, 
  {label: '已完成', value: '已完成' }, 
]

class JobsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      filter : {},
      statusOption: ''
    }
  }
  static propTypes = {
    getJobs: PropTypes.func,
    jobsList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getJobs, params } = this.props
    const {filter} = this.state
    getJobs({ params : {...params, filter} })
  }

  handlePagination = (pagination) => {
    const { getJobs, params } = this.props
    const {filter} = this.state
    getJobs({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
        filter,
      }
    })
  }

  handleFilter = (status) => {
    const { getJobs, params } = this.props
    const { query} = this.state
    const statusOption = status || this.state.statusOption
    let filter = {}
    query && (filter['query'] = query)
    statusOption &&  (filter['status'] = statusOption)
    this.setState({filter})
    getJobs({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter,
      }
    })
  }

  handleDeleteJob = (id) => () => {
    const { deleteJob } = this.props
    confirm(CONFIRM.DELETE).then(
      () => {
        deleteJob({ id, success: () => createNotification('success')})
      }
    )
  }

  handleKeyPress(target) {
    if(target.charCode === 13){
      this.handleFilter()
    } 
  }
  
  handleSelect = (e) => {
    this.setState({statusOption: e.target.value})
    this.handleFilter(e.target.value)
  }
  render() {
    const { jobsList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Input
              label='输入搜索 :'
              type='text'
              placeholder='手机号'
              onChange={(e) => this.setState({query: e.target.value})}
              onKeyPress = {(target) => this.handleKeyPress(target)}
            />
          </Col>
          <Col md={2}>
              <Input
                label='审核状态 : '
                name='statusOption'
                type='select'
                options={statusOptions}
                onChange={(e) => this.handleSelect(e)}
            />
          </Col>
        </Row>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>选择</th>
              <th>订单编号</th>
              <th>提交时间</th>
              <th>需求方手机号</th>
              <th>服务方手机号</th>
              <th>订单金额</th>
              <th>支付方式</th>
              <th>订单状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {jobsList && jobsList.map((job, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{job._id}</td>
                <td>{getDateTimeStr(job.created)}</td>
                <td>{job.creator.phoneNumber}</td>
                <td>{job.hired && job.hired.phoneNumber}</td>
                <td>{job.price}</td>
                <td>ALIPAY</td>
                <td>{job.status}</td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/jobs/view/${job._id}`}>
                    {BUTTONS.VIEW}
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteJob(job._id)}>
                    {BUTTONS.DELETE}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
      </div>
    )
  }
}

const selector = createStructuredSelector({
  jobsList: jobsListSelector,
  params: jobsParamsSelector,
  loading: jobsloadingSelector
})

const actions = {
  getJobs,
  deleteJob,
  show
}

export default compose(
  connect(selector, actions),
  withRouter
)(JobsList)

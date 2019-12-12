import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import Loader from '../../containers/Loader'
import { deleteJob, getJobs } from 'redux/modules/job'
import { jobsListSelector, jobsParamsSelector, jobsloadingSelector } from 'redux/selectors'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import confirm from 'containers/ConfirmModal'
import Input from 'components/InputField/InputComponent'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { withRouter } from 'react-router'
import { getDateTimeStr } from '../../helpers'


class JobsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      filter : {},
    }
  }
  static propTypes = {
    getJobs: PropTypes.func,
    jobsList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getJobs, params, filter } = this.props
    console.log("myjobs mount")
    filter && getJobs({ params : {...params, filter} })
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
    const { getJobs, params, filter } = this.props
    let newfilter = {}
    const { query } = this.state
    filter.creator && (newfilter['creator'] = filter.creator)
    filter.hired && (newfilter['hired'] = filter.hired)
    query && (newfilter['query'] = query)
    this.setState({filter : newfilter})

    getJobs({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter: newfilter,
      }
    })
  }

  handleKeyPress(target) {
    if(target.charCode==13){
      this.handleFilter()
    } 
  }
  
  render() {
    const { jobsList, params, loading } = this.props
    console.log("MyJobs", jobsList)
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Input
              type='text'
              placeholder='输入订单编号'
              onChange={(e) => this.setState({query: e.target.value})}
              onKeyPress = {(target) => this.handleKeyPress(target)}
            />
          </Col>
        </Row>
        <Table striped>
          <thead>
            <tr>
              <th>选择</th>
              <th>订单编号</th>
              <th>提交时间</th>
              <th>订单金额</th>
              <th>首付款</th>
              <th>尾款</th>
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
                <td>{job.price}</td>
                <td>{job.upfront}</td>
                <td>{job.price - job.upfront}</td>
                <td>{job.status}</td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/jobs/view/${job._id}`}>
                  查看订单
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
}

export default compose(
  connect(selector, actions),
  withRouter
)(JobsList)

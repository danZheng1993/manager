import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../containers/Loader'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { getJob } from 'redux/modules/job'
import {Col, Row} from 'reactstrap'
import {getDateTimeStr} from '../../helpers'
import { jobsloadingSelector, jobDetailSelector } from '../../redux/selectors'

class JobView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab : '1'
    }
  }
  static propTypes = {
    getJob: PropTypes.func,
    job: PropTypes.object
  };

  componentWillMount () {
    const { getJob, match: { params } } = this.props
    params.id && getJob({ id: params.id})
  }  
  
  toggle = tab => {
    this.setState({activeTab: tab})
  }

  render() {
    const { job, loading, jobs} = this.props
    console.log(jobs)
    return (
      <div>
        <Loader active={loading} />
        {job &&
        <div>
          <h6 className='text-center mb-5'>订单详情</h6>
          <Row>
            <Col sm={6}>
              <p>订单编号 : {job._id} </p>
              <p>创建时间 : {getDateTimeStr(job.created)} </p>
              <p>订单状态 : {job.status} </p>
              <p>行业类别 : {job.subcategory} </p>
              <p>其他要求 : {job.services} </p>
            </Col>
            <Col sm={6} >
              <p>拍摄城市 : {job.location} </p>
              <p>服务类别 : {job.type} </p>
              <p>场景数量 : {job.count} </p>
              <p>拍摄场景 : {job.scene} </p>
              <p>需求描述 : {job.description} </p>
            </Col>
          </Row>
          <br />
          <Row>
            <Col sm={6}>
              <p>项目定价： : {job.price} </p>
              <p>项目尾款 (80%) : {job.price * 8 / 10} </p>
              <p>首付款支付时间 : {getDateTimeStr(job.created)} </p>
            </Col>
            <Col sm={6} >
              <p>项目首付款 (20%) : {job.price * 2 / 10} </p>
              <p>尾款支付时间 : {getDateTimeStr(job.created)} </p>
            </Col>
          </Row>
        </div>
        }
      </div>
    )
  }
}

const selector = createStructuredSelector({
  job: jobDetailSelector,
  loading: jobsloadingSelector,
})

const actions = {
  getJob,
}

export default compose(
  connect(selector, actions),
  withRouter
)(JobView)

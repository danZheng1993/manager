import React, { Component } from 'react'
import { Col, Row} from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'

import {getDashboardStatistics, getCreatedUsers} from '../../redux/modules/statistic'
import Card from './Card'
import { statisticsloadingSelector, dashboardTransactionSelector, createdUsersSelector, } from '../../redux/selectors'
import Loader from '../../containers/Loader'
import JobsChart from './JobsChart'
import TransactionChart from './TransactionChart'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      range: 1,
    }
  }

  static propTypes = {
  }

  componentWillMount () {
    const {getDashboardStatistics, getCreatedUsers} = this.props
    getDashboardStatistics()
    getCreatedUsers()
  }

  render() {
    const {loading, transaction, createdUser} = this.props
    return (
      <div>
        <Loader active={loading} />
        <Row>
          <Col sm={3}>
            <Card title="今日订单总数" value={transaction.todayJobs} icon="fa-book"/>
          </Col>
          <Col sm={3}>
            <Card title="今日交易总额" value={`¥${transaction.todayTransaction}`} icon="fa-dollar"/>
          </Col>
          <Col sm={3}>
            <Card title="昨日交易总额" value={`¥${transaction.yesterdayTransaction}`} icon="fa-database"/>
          </Col>
          <Col sm={3}>
            <Card title="近7天交易总额" value={`¥${transaction.weekTransaction}`} icon="fa-line-chart"/>
          </Col>
        </Row>
        <div className="card-box">
          <p className="box-title">用户总览</p>
          <Row>
          <Col sm={6}>
            <p className="text-center">需求方总览</p>
            <Row>
              <Col sm={4} className="text-center">
                <p className="important-value">{createdUser.todayProvider}</p>
                <p className="">今日新增</p>
              </Col>
              <Col sm={4} className="text-center">
                <p className="important-value">{createdUser.yesterdayProvider}</p>
                <p className="">昨日新增</p>
              </Col>
              <Col sm={4} className="text-center">
                <p className="important-value">{createdUser.thismonthProvider}</p>
                <p className="">本月新增</p>
              </Col>
            </Row>
          </Col>
          <Col sm={6}>
            <p className="text-center">服务方总览</p>
            <Row>
              <Col sm={4} className="text-center">
                <p className="important-value">{createdUser.todayClient}</p>
                <p className="">今日新增</p>
              </Col>
              <Col sm={4} className="text-center">
                <p className="important-value">{createdUser.yesterdayClient}</p>
                <p className="">昨日新增</p>
              </Col>
              <Col sm={4} className="text-center">
                <p className="important-value">{createdUser.thismonthClient}</p>
                <p className="">本月新增</p>
              </Col>
            </Row>
          </Col>
        </Row>
        </div>
        <Row>
          <Col sm={12}>
            <JobsChart />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <TransactionChart />
          </Col>
        </Row>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  loading: statisticsloadingSelector,
  transaction : dashboardTransactionSelector,
  createdUser: createdUsersSelector,
})

const actions = {
  getDashboardStatistics,
  getCreatedUsers,
}

export default compose(
  connect(selector, actions),
  withRouter
)(Dashboard)
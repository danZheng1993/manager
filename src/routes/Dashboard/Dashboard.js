import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Input} from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import {getDashboardStatistics, getCreatedUsers} from '../../redux/modules/statistic'
import Card from './Card'
import DateRangePicker from '../../components/DateRangePicker'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import { statisticsloadingSelector, dashboardTransactionSelector, createdUsersSelector } from '../../redux/selectors'
import Loader from '../../containers/Loader'

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
]
class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: '',
      startDate: '',
      endDate: ''
    }
  }

  static propTypes = {
  }

  onChangeRange = (picker) => {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    })
  }
  componentWillMount () {
    const {getDashboardStatistics, getCreatedUsers} = this.props
    getDashboardStatistics()
    getCreatedUsers()
  }

  handleImageChange = (e)  => {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }
    file && reader.readAsDataURL(file)
    console.log(file, reader.result)
  }

  render() {
    const {loading, transaction, createdUser} = this.props
    let {startDate, endDate} = this.state
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
        <div className="card-box">
          <p className="box-title">交易统计</p>
          <Row>
            <Col sm={12} className="text-right">
              <DateRangePicker startDate={startDate} endDate={endDate} onChangeRange={this.onChangeRange}/>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <AreaChart
                width={1000}
                height={400}
                data={data}
                margin={{
                  top: 10, right: 30, left: 0, bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#63B6F1" fill="#daedfb" />
              </AreaChart>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  loading: statisticsloadingSelector,
  transaction : dashboardTransactionSelector,
  createdUser: createdUsersSelector
})

const actions = {
  getDashboardStatistics,
  getCreatedUsers
}

export default compose(
  connect(selector, actions),
  withRouter
)(Dashboard)
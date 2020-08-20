import React, { Component } from 'react'
import { Button, Col, Row, ButtonGroup} from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import {AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import moment from 'moment'
import classnames from 'classnames'

import {getJobStatistics, compareJobs} from '../../redux/modules/statistic'
import DateRangePicker from '../../components/DateRangePicker'
import { statisticsloadingSelector, jobStatisticSelector, jobCompareSelector } from '../../redux/selectors'
import {getPercent} from '../../helpers'
import Loader from '../../containers/Loader'

class Chart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment().subtract(6, 'days'),
      endDate: moment(),
      range: 1,
    }
  }

  onChangeRange = (picker) => {
    const {getJobStatistics} = this.props
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
      range: null,
    })
    getJobStatistics({params: {startDate: picker.startDate.format('YYYY-MM-DD'), endDate: picker.endDate.format('YYYY-MM-DD')}})
  }

  componentWillMount () {
    const { getJobStatistics, compareJobs} = this.props
    const {startDate, endDate} = this.state
    getJobStatistics({params: {startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')}})
    compareJobs()
  }

  setDomain = (startDate, endDate) => {
    const start= startDate.dayOfYear()
    const end= endDate.dayOfYear()
    return [start, end]
  }

  setDate = (value) => {
    const {getJobStatistics} = this.props
    let dateRange = []
    if (value === 0) dateRange = [moment().startOf('day'), moment().endOf('day')]
    else if (value === 1) dateRange = [moment().startOf('week'), moment().endOf('week')]
    else if (value === 2) dateRange = [moment().startOf('month'), moment().endOf('month')]
    else return
    this.setState({range: value, startDate: dateRange[0], endDate: dateRange[1]})
    getJobStatistics({params: {startDate: dateRange[0].format('YYYY-MM-DD'), endDate: dateRange[1].format('YYYY-MM-DD')}})

  }

  render() {
    const {loading, jobStatistics, compare} = this.props
    let chartData= [{_id: 0, amount: 0}]
    chartData = [...chartData, ...jobStatistics]
    let {startDate, endDate} = this.state
    return (
      <div>
        <Loader active={loading} />
        <div className="card-box">
          <p className="box-title">订单统计</p>
          <Row>
            <Col sm={4}></Col>
            <Col sm={4} >
              <ButtonGroup>
                <Button className={classnames({ active: this.state.range === 0 })} onClick={() => this.setDate(0)}>今日</Button>
                <Button className={classnames({ active: this.state.range === 1 })} onClick={() => this.setDate(1)}>本周</Button>
                <Button className={classnames({ active: this.state.range === 2 })} onClick={() => this.setDate(2)}>本月</Button>
              </ButtonGroup>
            </Col>
            <Col sm={4} >
              <DateRangePicker startDate={startDate} endDate={endDate} onChangeRange={this.onChangeRange}/>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <div className="text-center">
                <p className="description">同比上月</p>
                <p style={{color: '#3C3C3C', fontSize: '28px'}}>{compare.thismonthAmount}</p>
                <p className="description">
                  {compare.thismonthAmount >= compare.lastmonthAmount ?
                    <span className="plus"><i className="fa fa-fw fa-sort-up"/>{getPercent(compare.thismonthAmount, compare.lastmonthAmount)}%</span> :
                    <span className="minus"><i className="fa fa-fw fa-sort-desc"/>{getPercent(compare.thismonthAmount, compare.lastmonthAmount)}%</span> 
                  }
                   同比上月
                </p>
              </div>
              <div className="text-center">
                <p className="description">同比上周</p>
                <p style={{color: '#3C3C3C', fontSize: '28px'}}>{compare.thisweekAmount}</p>
                <p className="description">
                  {compare.thisweekAmount > compare.lastweekAmount ?
                    <span className="plus"><i className="fa fa-fw fa-sort-up"/>{getPercent(compare.thisweekAmount, compare.lastweekAmount)}%</span> :
                    <span className="minus"><i className="fa fa-fw fa-sort-desc"/>{getPercent(compare.thisweekAmount, compare.lastweekAmount)}%</span> 
                  }
                   同比上周
                </p>
              </div>
            </Col>
            <Col sm={10}>
                { chartData.length && <AreaChart
                  key={chartData.length}
                  width={900}
                  height={400}
                  data={chartData}
                  margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                  }}
                >
                  {/* <XAxis dataKey="date" type="number" domain={this.setDomain(startDate, endDate)}/> */}
                  <XAxis dataKey="_id"/>
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="amount" stroke="#63B6F1" fill="#daedfb" />
                </AreaChart> }
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  loading: statisticsloadingSelector,
  jobStatistics: jobStatisticSelector,
  compare: jobCompareSelector
})

const actions = {
  getJobStatistics,
  compareJobs
}

export default compose(
  connect(selector, actions),
  withRouter
)(Chart)
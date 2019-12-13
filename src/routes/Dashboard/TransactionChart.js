import React, { Component } from 'react'
import { Button, Col, Row, ButtonGroup} from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import {getTransactionStatistics} from '../../redux/modules/statistic'
import DateRangePicker from '../../components/DateRangePicker'
import {AreaChart, Area, XAxis, YAxis, Tooltip} from 'recharts'
import { statisticsloadingSelector, transactionStatisticSelector } from '../../redux/selectors'
import Loader from '../../containers/Loader'
import moment from 'moment'
import classnames from 'classnames'

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
    const {getTransactionStatistics} = this.props
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
      range: null,
    })
    getTransactionStatistics({params: {startDate: picker.startDate.format('YYYY-MM-DD'), endDate: picker.endDate.format('YYYY-MM-DD')}})

  }
  componentWillMount () {
    const { getTransactionStatistics} = this.props
    const {startDate, endDate} = this.state
    getTransactionStatistics({params: {startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')}})
  }

  setDomain = (startDate, endDate) => {
    const start= startDate.dayOfYear()
    const end= endDate.dayOfYear()
    console.log(start, end)
    return [start, end]
  }

  setDate = (value) => {
    const {getTransactionStatistics} = this.props
    let dateRange = []
    if (value === 0) dateRange = [moment().startOf('day'), moment().endOf('day')]
    else if (value === 1) dateRange = [moment().startOf('week'), moment().endOf('week')]
    else if (value === 2) dateRange = [moment().startOf('month'), moment().endOf('month')]
    else return
    this.setState({range: value, startDate: dateRange[0], endDate: dateRange[1]})
    getTransactionStatistics({params: {startDate: dateRange[0].format('YYYY-MM-DD'), endDate: dateRange[1].format('YYYY-MM-DD')}})

  }

  render() {
    const {loading, transactionStatistics} = this.props
    let chartData= [{_id: 0, amount: 0}]
    chartData = [...chartData, ...transactionStatistics]
    let {startDate, endDate} = this.state
    return (
      <div>
        <Loader active={loading} />
        <div className="card-box">
          <p className="box-title">交易统计</p>
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
            <Col sm={12}>
              { transactionStatistics.length && <AreaChart
                key={transactionStatistics.length}
                width={1000}
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
  transactionStatistics: transactionStatisticSelector
})

const actions = {
  getTransactionStatistics
}

export default compose(
  connect(selector, actions),
  withRouter
)(Chart)
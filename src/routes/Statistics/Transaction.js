import React, { Component } from 'react'
import { Button, Col, Row, ButtonGroup, Table} from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import {getTransactionStatistics} from '../../redux/modules/statistic'
import DateRangePicker from '../../components/DateRangePicker'
import { statisticsloadingSelector, transactionStatisticSelector } from '../../redux/selectors'
import Loader from '../../containers/Loader'
import moment from 'moment'
import classnames from 'classnames'

class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment().subtract(1, 'days'),
      endDate: moment().subtract(1, 'days'),
      range: 0,
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
    return [start, end]
  }

  setDate = (value) => {
    const {getTransactionStatistics} = this.props
    let dateRange = []
    if (value === 0) dateRange = [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')]
    else if (value === 1) dateRange = [moment().subtract(7, 'days').startOf('day'), moment().endOf('day')]
    else if (value === 2) dateRange = [moment().subtract(30, 'days').startOf('day'), moment().endOf('day')]
    else return
    this.setState({range: value, startDate: dateRange[0], endDate: dateRange[1]})
    getTransactionStatistics({params: {startDate: dateRange[0].format('YYYY-MM-DD'), endDate: dateRange[1].format('YYYY-MM-DD')}})

  }

  render() {
    const {loading, transactionStatistics} = this.props
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
                <Button className={classnames({ active: this.state.range === 0 })} onClick={() => this.setDate(0)}>昨天</Button>
                <Button className={classnames({ active: this.state.range === 1 })} onClick={() => this.setDate(1)}>最近七天</Button>
                <Button className={classnames({ active: this.state.range === 2 })} onClick={() => this.setDate(2)}>最近30天</Button>
              </ButtonGroup>
            </Col>
            <Col sm={4} >
              <DateRangePicker startDate={startDate} endDate={endDate} onChangeRange={this.onChangeRange}/>
            </Col>
          </Row>
          <Table striped bordered className="text-center">
          <thead>
            <tr>  
              <th>Date</th>
              <th>付款人数</th>
              <th>付款订单数</th>
              <th>付款金额</th>
            </tr>
          </thead>
          <tbody>
            {transactionStatistics && transactionStatistics.map((transaction, index) => (
              <tr key={index}>
                <th>{transaction._id}</th>
                <td>{transaction.count}</td>
                <td>{transaction.count}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
          </div>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  loading: statisticsloadingSelector,
  transactionStatistics: transactionStatisticSelector,
})

const actions = {
  getTransactionStatistics,
}

export default compose(
  connect(selector, actions),
  withRouter
)(Transaction)
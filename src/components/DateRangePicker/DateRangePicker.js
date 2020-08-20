import React from 'react'
import moment from 'moment'

import 'bootstrap-daterangepicker/daterangepicker.css'

import DatetimeRangePicker from './bootstrapDatetimerangepicker/src'

import {
  Button,
} from 'reactstrap'
import { cnLocale, PLACEHOLDER } from '../../constants'

class DateRangePicker extends React.Component {

  constructor(props) {
    super(props)

    this.handleApply = this.handleApply.bind(this)

    this.state = {
      start: 'start',
      end: 'end',
      ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      },
    }
  }

  componentWillMount() {
    const {startDate, endDate} = this.props
    let start = startDate ? startDate.format('YYYY-MM-DD') : 'start'
    let end = endDate ? endDate.format('YYYY-MM-DD') : 'end'
    this.setState({start, end})
  }
  handleApply(event, picker) {
    this.props.onChangeRange(picker)
    this.setState({
      start: picker.startDate.format('YYYY-MM-DD'),
      end: picker.endDate.format('YYYY-MM-DD')
    })
  }

  render() {
    const {startDate, endDate} = this.props
    let start = startDate ? startDate.format('YYYY-MM-DD') : ''
    let end = endDate ? endDate.format('YYYY-MM-DD') : ''
    let label = start + ' ~ ' + end
    if (start === end) {
      label = start
    }

    return (
      <div className="form-group">
          <DatetimeRangePicker
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            onApply={this.handleApply}
            locale={cnLocale}
          >
            <div className="input-group">
              <input type="text" className="form-control" value={label} placeholder={PLACEHOLDER.DATE}/>
                <span className="input-group-btn">
                    <Button className="default date-range-toggle">
                      <i className="fa fa-calendar"/>
                    </Button>
                </span>
            </div>
          </DatetimeRangePicker>
      </div>
    )
  }

}

export default DateRangePicker
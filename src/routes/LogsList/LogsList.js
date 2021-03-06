import { Table } from 'reactstrap'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { show } from 'redux-modal'
import { getDateTimeStr } from '../../helpers'
import { withRouter } from 'react-router'

import { CONFIRM } from '../../constants'
import confirm from '../../containers/ConfirmModal'
import ReportModal from '../../containers/ReportModal'
import { deleteLog, getLogs } from '../../redux/modules/log'
import { logsListSelector, logsParamsSelector } from '../../redux/selectors'
import Pagination from '../../components/Pagination'

class LogsList extends Component {
  static propTypes = {
    deleteLog: PropTypes.func,
    getLogs: PropTypes.func,
    logsList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getLogs, params } = this.props
    getLogs({ params })
  }

  handleDeleteLog = (id) => () => {
    const { deleteLog } = this.props
    confirm(CONFIRM.DELETE).then(
      () => {
        deleteLog({ id })
      }
    )
  }

  handleViewReport = (log) => () => {
    const { show } = this.props
    show('reportModal', { log })
  }

  handlePagination = (pagination) => {
    const { getLogs, params } = this.props
    getLogs({
      params: {
        ...pick(params, ['page', 'page_size']),
        ...pagination
      }
    })
  }

  render() {
    const { logsList, params } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Logged</th>
              <th>IP</th>
              <th>Phone Number</th>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody>
            {logsList && logsList.map((log, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{getDateTimeStr(log.logged)}</td>
                <td>{log.ipAddress}</td>
                <td>{log.phoneNumber}</td>
                <td>{log.userName}</td>
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
  logsList: logsListSelector,
  params: logsParamsSelector
})

const actions = {
  getLogs,
  deleteLog,
  show
}

export default compose(
  connect(selector, actions),
  withRouter
)(LogsList)
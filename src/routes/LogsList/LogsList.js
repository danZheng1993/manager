import { Button, Table } from 'reactstrap'
import React, { Component } from 'react'
import { deleteLog, getLogs } from 'redux/modules/log'
import { logsListSelector, logsParamsSelector } from 'redux/selectors'

import { Link } from 'react-router-dom'
import MdPersonAdd from 'react-icons/lib/md/person-add'
import Pagination from 'components/Pagination'
import PropTypes from 'prop-types'
import ReportModal from 'containers/ReportModal'
import { compose } from 'redux'
import confirm from 'containers/ConfirmModal'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { show } from 'redux-modal'
import { ucFirst } from 'helpers'
import { withRouter } from 'react-router'

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
    confirm('Are you sure to delete the log?').then(
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
        <h2 className='text-center mb-5'>Manage Logs</h2>
        <div className='text-right mb-2'>
          <Link to='/logs/new' className='btn btn-primary'>
            <MdPersonAdd size='1.2em' /> Add a New Log
          </Link>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>phoneNumber</th>
              <th>Role</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logsList && logsList.map((log, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{log.first_name} {log.last_name}</td>
                <td>{log.phoneNumber}</td>
                {/* <td>{ucFirst(log.role)}</td> */}
                <td className='text-right'>
                  <Button color='info' size='sm' onClick={this.handleViewReport(log)}>
                    Report
                  </Button>
                  {' '}
                  <Button color='primary' tag={Link} size='sm' to={`/logs/edit/${log.id}`}>
                    Edit
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteLog(log.id)}>
                    Delete
                  </Button>
                </td>
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

import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import Loader from '../../containers/Loader'
import { deleteDatabase, getDatabases, createDatabase, restoreDatabase } from 'redux/modules/database'
import { databasesListSelector, databasesParamsSelector, databasesloadingSelector } from 'redux/selectors'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import confirm from 'containers/ConfirmModal'
import Input from 'components/InputField/InputComponent'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { show } from 'redux-modal'
import { withRouter } from 'react-router'
import { getDateTimeStr, createNotification, handleError } from '../../helpers'

class DatabaseList extends Component {

  static propTypes = {
    getDatabases: PropTypes.func,
    databasesList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getDatabases, params } = this.props
    getDatabases({ params : {...params} })
  }

  handlePagination = (pagination) => {
    const { getDatabases, params } = this.props
    getDatabases({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
      }
    })
  }

  handleDeleteDatabase = (id) => () => {
    const { deleteDatabase } = this.props
    confirm('Are you sure to delete the database?').then(
      () => {
        deleteDatabase({ id, 
          success: () => createNotification('success')
        })
      }
    )
  }

  startBackup = () => {
    const {createDatabase} = this.props
    createDatabase({
      success: () => createNotification('success'),
    })
  }

  restoreDatabase = (id) => {
    const {restoreDatabase} = this.props
    restoreDatabase({
      id, 
      success: () => createNotification('success'),
    })
  }

  render() {
    const { databasesList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <div className='mb-2' onClick={this.startBackup}>
          <Button color='primary'>
            开始备份
          </Button>
        </div>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>备份时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {databasesList && databasesList.map((database, index) => (
              <tr key={index}>
                <td>{database.name}</td>
                <td>{database.size}</td>
                <td>{getDateTimeStr(database.created)}</td>
                <td>
                  <Button color='primary' size='sm' onClick={() => this.restoreDatabase(database._id)}>
                  恢复
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteDatabase(database._id)}>
                  删除
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
  databasesList: databasesListSelector,
  params: databasesParamsSelector,
  loading: databasesloadingSelector
})

const actions = {
  getDatabases,
  deleteDatabase,
  createDatabase,
  restoreDatabase
}

export default compose(
  connect(selector, actions),
  withRouter
)(DatabaseList)

import { Button, Table} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { show } from 'redux-modal'
import { withRouter } from 'react-router'

import { CONFIRM } from '../../constants'
import Pagination from '../../components/Pagination'
import confirm from '../../containers/ConfirmModal'
import Loader from '../../containers/Loader'
import { deleteUser, getUsers } from '../../redux/modules/user'
import { usersListSelector, usersParamsSelector, usersloadingSelector } from '../../redux/selectors'

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      typeOption: '',
      filter : {permission: 'NOT_ALLOWED', role: 'provider'}
    }
  }
  static propTypes = {
    getUsers: PropTypes.func,
    usersList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getUsers, params } = this.props
    const {filter} = this.state
    getUsers({ params : {...params, filter} })
  }

  handlePagination = (pagination) => {
    const { getUsers, params } = this.props
    const {filter} = this.state
    getUsers({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
        filter,
      }
    })
  }

  handleDeleteUser = (id) => () => {
    const { deleteUser } = this.props
    confirm(CONFIRM.DELETE).then(
      () => {
        deleteUser({ id })
      }
    )
  }

  render() {
    const { usersList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />   
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>编号</th>
              <th>注册手机号</th>
              <th>注册时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {usersList && usersList.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{user.phoneNumber}</td>
                <td>{user.created}</td>
                <td>待审核</td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/providers/pending/check/${user._id}`}>
                  审核
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
  usersList: usersListSelector,
  params: usersParamsSelector,
  loading: usersloadingSelector
})

const actions = {
  getUsers,
  deleteUser,
  show
}

export default compose(
  connect(selector, actions),
  withRouter
)(UsersList)

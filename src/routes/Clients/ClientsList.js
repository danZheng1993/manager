import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import Loader from '../../containers/Loader'
import { deleteUser, getUsers } from 'redux/modules/user'
import { usersListSelector, usersParamsSelector, usersloadingSelector } from 'redux/selectors'
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

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      filter : {role: 'client'}
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

  handleFilter = () => {
    const { getUsers, params } = this.props
    const { phoneNumber } = this.state
    let filter = {role: 'client'}
    if (phoneNumber) filter['phoneNumber'] = phoneNumber
    this.setState({filter})
    getUsers({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter,
      }
    })
  }

  handleDeleteUser = (id) => () => {
    const { deleteUser } = this.props
    confirm('Are you sure to delete the user?').then(
      () => {
        deleteUser({ id, 
          success: () => createNotification('success'),
        })
      }
    )
  }

  handleKeyPress(target) {
    if(target.charCode==13){
      this.handleFilter()
    } 
  }
  render() {
    const { usersList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Input
              label='输入搜索 :'
              type='text'
              placeholder='手机号'
              onChange={(e) => this.setState({phoneNumber: e.target.value})}
              onKeyPress = {(target) => this.handleKeyPress(target)}
              />
          </Col>
        </Row>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>选择</th>
              <th>编号</th>
              <th>手机号</th>
              <th>注册时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {usersList && usersList.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <th scope='row'>{index + 1}</th>
                <td>{user.phoneNumber}</td>
                <td>{getDateTimeStr(user.created)}</td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/clients/view/${user._id}`}>
                  查看
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteUser(user._id)}>
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

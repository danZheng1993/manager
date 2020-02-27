import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import Loader from '../../containers/Loader'
import { deleteUser, getUsers } from 'redux/modules/user'
import { usersListSelector, usersParamsSelector, usersloadingSelector } from 'redux/selectors'
import AwardModal from 'containers/AwardModal'
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
import { createNotification } from '../../helpers'
import VIPModal from '../../containers/VIPModal'
import { BUTTONS } from '../../constants'

class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      typeOption: '',
      filter : {permission: 'ALLOWED', role: 'provider'},
      isModal : false
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
  createVIP = (user) => () => {
    const { show } = this.props
    show('vipModal', { user })
  }

  handleFilter = () => {
    const { getUsers, params } = this.props
    const { phoneNumber } = this.state
    let filter = {permission: 'ALLOWED', role: 'provider'}
    if (phoneNumber) filter['phoneNumber'] = phoneNumber
    this.setState({filter})
    getUsers({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter,
      }
    })
  }

  handleDeleteVIP = (id) => () => {
    const { deleteUser } = this.props
    confirm('Are you sure to delete the VIP?').then(
      () => {
      //   deleteUser({ id,
      //     success: () => createNotification('success'),
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
              placeholder='手机号/公司名称'
              onChange={(e) => this.setState({phoneNumber: e.target.value})}
              onKeyPress = {(e) => this.handleKeyPress(e)}
              />
          </Col>
        </Row>
        <div className='mb-2' onClick={this.createVIP()}>
          <Button color='primary'>
            开始备份
          </Button>
        </div>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>选择</th>
              <th>编号</th>
              <th>公司名称</th>
              <th>联系电话</th>
              <th>所在城市</th>
              <th>总收入</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {usersList && usersList.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <th scope='row'>{index + 1}</th>
                <td>{user.companyName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.location}</td>
                <td>¥{user.balance}</td>
                <td>
                  <Button color='danger' size='sm' onClick={this.handleDeleteVIP(user._id)}>
                    {BUTTONS.DELETE}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
        <VIPModal />
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

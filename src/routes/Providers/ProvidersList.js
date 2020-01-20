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
import { createNotification, handleError } from '../../helpers'

const typeOptions = [
  {label: '全部', value: '' }, 
  {label: '合作方子公司', value: '合作方子公司' }, 
  {label: '普通企业服务方', value: '普通企业服务方' }, 
  {label: '个人服务方', value: '个人服务方' }, 
]
class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      typeOption: '',
      filter : {permission: 'ALLOWED', role: 'provider'}
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
    const { phoneNumber, typeOption } = this.state
    let filter = {permission: 'ALLOWED', role: 'provider'}
    if (phoneNumber) filter['phoneNumber'] = phoneNumber
    if (typeOption) filter['typeOption'] = typeOption
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
          success: () => createNotification('success')
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
              placeholder='手机号/公司名称'
              onChange={(e) => this.setState({phoneNumber: e.target.value})}
              onKeyPress = {(e) => this.handleKeyPress(e)}
              />
            </Col>
            <Col md={2}>
              <Input
                label='审核状态 : '
                name='typeOption'
                type='select'
                options={typeOptions}
                onChange={(e) => this.setState({typeOption: e.target.value})}
              />
            </Col>
        </Row>
        <Table striped>
          <thead>
            <tr>
              <th>编号</th>
              <th>名称</th>
              <th>手机号</th>
              <th>服务商类型</th>
              <th>所在城市</th>
              <th>公司名称</th>
              <th>总收入</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {usersList && usersList.map((user, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userName}</td>
                <td>{user.location}</td>
                <td>{user.companyName}</td>
                <td>¥{user.balance}</td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/providers/view/${user._id}`}>
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

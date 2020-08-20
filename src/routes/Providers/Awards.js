import { Button, Table, Row, Col} from 'reactstrap'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { show } from 'redux-modal'
import { withRouter } from 'react-router'

import Loader from '../../containers/Loader'
import { deleteUser, getUsers } from '../../redux/modules/user'
import { usersListSelector, usersParamsSelector, usersloadingSelector } from '../../redux/selectors'
import AwardModal from '../../containers/AwardModal'
import Pagination from '../../components/Pagination'
import SelectAllCheckBox from '../../components/SelectAllCheckBox'
import Input from '../../components/InputField/InputComponent'

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
      users: {},
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
  createAward = (user) => () => {
    const { show } = this.props
    const { users } = this.state
    if (user) {
      show('awardModal', { users: [user] })
    } else {
      let result = []
      for (let i in users) users[i] && result.push(i)
      show('awardModal', { users: result })
    }
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

  onSelectUser = (id) => () => {
    let { users } = this.state;
    users[id] = !users[id]
    this.setState({ users })
  }

  handleKeyPress(target) {
    if(target.charCode === 13){
      this.handleFilter()
    } 
  }

  render() {
    const { usersList, params, loading } = this.props
    const { users } = this.state
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
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th><SelectAllCheckBox onSelect = {(users) => this.setState({users})} list={usersList} /></th>
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
                <td><input type="checkbox" onClick={this.onSelectUser(user._id)} checked={users[user._id]} /></td>
                <th scope='row'>{index + 1}</th>
                <td>{user.userName}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.userName}</td>
                <td>{user.location}</td>
                <td>{user.companyName}</td>
                <td>¥{user.balance}</td>
                <td>
                  <Button color='primary' size='sm' onClick={this.createAward(user._id)}>
                  发红包
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row>
          <Col width={1}>
            <Button color='success' size='sm' onClick={this.createAward()}>
              发红包
            </Button>
          </Col>
          <Col width={11}>
            <Pagination pagination={pagination} setPagination={this.handlePagination} />
          </Col>
        </Row>
        <AwardModal />
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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../containers/Loader'
import { Col, Row, Button } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { getUser, updateUser } from 'redux/modules/user'
import confirm from 'containers/ConfirmModal'
import { getDateTimeStr, createNotification } from '../../helpers'
import { userDetailSelector, usersloadingSelector } from '../../redux/selectors'
import ProviderProfile from './ProviderProfile'

class UserEdit extends Component {
  static propTypes = {
    getUser: PropTypes.func,
    updateUser: PropTypes.func,
    user: PropTypes.object
  };

  componentWillMount () {
    const { getUser, match: { params } } = this.props
    params.id && getUser({ id: params.id })
  }

  handleSuccess  = () => {
    const {history} = this.props
    createNotification('success')
    history.goBack()
  }
  handleCheck = (id, isAllowed) => () => {
    const { updateUser } = this.props
    if (isAllowed) {
      confirm('确定审核通过?').then(
        () => {
          updateUser({ 
            id,
            body: {permission : 'ALLOWED'},
            success: () => this.handleSuccess(),
            fail: (payload) => createNotification('error', payload.data.message) 
           })
        }
      )
    } else {
      confirm('确定审核不通过?').then(
        () => {
          updateUser({ 
            id, 
            body: {permission : 'NOT_ALLOWED'},
            success: () => this.handleSuccess(),
            fail: (payload) => createNotification('error', payload.data.message) 
          })
        }
      )
    }
  }

  render() {
    const { user, loading} = this.props
    return (
      <div>
        <Loader active={loading} />
        {user &&
        <div>
          <ProviderProfile user={user} />
          <Row>
            <Col sm={12} md={{size: 4, offset: 4}}>
              <Button color='secondary' onClick={(this.handleCheck(user._id, true))}>审核通过</Button>
              <Button color='secondary' onClick={(this.handleCheck(user._id, false))}>审核不通过</Button>
            </Col>
          </Row>
        </div>}
      </div>
    )
  }
}

const selector = createStructuredSelector({
  user: userDetailSelector,
  loading: usersloadingSelector,
})

const actions = {
  getUser,
  updateUser
}

export default compose(
  connect(selector, actions),
  withRouter
)(UserEdit)

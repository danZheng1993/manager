import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { getUser } from '../../redux/modules/user'
import { userDetailSelector, usersloadingSelector } from '../../redux/selectors'
import Loader from '../../containers/Loader'
import ClientProfile from './ClientProfile'
import MyJobsList from '../Jobs/MyJobsList'

class UserView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab : '1'
    }
  }
  static propTypes = {
    getUser: PropTypes.func,
    user: PropTypes.object
  };

  componentWillMount () {
    const { getUser, match: { params } } = this.props
    params.id && getUser({ id: params.id })
  }  

  render() {
    const { user, loading, match: {params}} = this.props
    return (
      <div>
        <Loader active={loading} />
        {user &&
        <div>
          <ClientProfile user={user} />
          <MyJobsList filter={{creator: params.id}}/>
        </div>
        }
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
}

export default compose(
  connect(selector, actions),
  withRouter
)(UserView)

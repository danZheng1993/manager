import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../containers/Loader'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { getUser } from 'redux/modules/user'
import { searchJob } from 'redux/modules/job'
import { userDetailSelector, usersloadingSelector, jobsloadingSelector, jobsSearchResultSelector } from '../../redux/selectors'
import ClientProfile from './ClientProfile'

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
    const { getUser, match: { params }, searchJob } = this.props
    params.id && getUser({ id: params.id, success: () => searchJob({body: {creator: params.id}}) })
  }  
  
  toggle = tab => {
    this.setState({activeTab: tab})
  }

  render() {
    const { user, loading, jobs} = this.props
    console.log(jobs)
    return (
      <div>
        <Loader active={loading} />
        {user &&
        <div>
          <ClientProfile user={user} />
          <div>
            <p>JobsList</p>
          </div>
        </div>
        }
      </div>
    )
  }
}

const selector = createStructuredSelector({
  user: userDetailSelector,
  loading: usersloadingSelector || jobsloadingSelector,
  jobs: jobsSearchResultSelector,
})

const actions = {
  getUser,
  searchJob
}

export default compose(
  connect(selector, actions),
  withRouter
)(UserView)

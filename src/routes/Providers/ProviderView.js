import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../containers/Loader'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { getUser } from 'redux/modules/user'
import { getJobs } from 'redux/modules/job'
import { userDetailSelector, usersloadingSelector, jobsloadingSelector, jobsSearchResultSelector } from '../../redux/selectors'
import ProviderProfile from './ProviderProfile'

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
    params.id && getUser({ id: params.id, success: () => getJobs({body: {hired: params.id}}) })
  }  
  
  toggle = tab => {
    this.setState({activeTab: tab})
  }

  render() {
    const { user, loading, jobs} = this.props
    const {activeTab} = this.state
    console.log(jobs)
    return (
      <div>
        <Loader active={loading} />
        {user &&
        <div>
          <ProviderProfile user={user} />
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { this.toggle('1') }}
                >
                  服务订单记录
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { this.toggle('2') }}
                >
                  提现记录
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <p>JobsList</p>
              </TabPane>
              <TabPane tabId="2">
                <p>Payment History</p>
              </TabPane>
            </TabContent>
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
  getJobs
}

export default compose(
  connect(selector, actions),
  withRouter
)(UserView)

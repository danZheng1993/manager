import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import Dashboard from './Dashboard'
import Header from 'containers/Header'
import Login from './Login'
import Profile from './Profile'
import Records from './Records'
import Signup from './Signup'
import Users from './Users'
import Logs from './LogsList'
import Medias from './Medias'
import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminOrManagerRedir }
  from 'helpers/authHelpers'
import {NotificationContainer} from 'react-notifications'

import 'styles/core.scss'
import SideBar from '../containers/SideBar/SideBar'
import Tab from '../containers/Tab'
import Providers from './Providers'

const routes = ({ isAuthenticated }) => (
  <Router>
    <div>
      <NotificationContainer />
      <Header />
      <div
        style={{
            position: 'relative',
            height: 'calc(100vh - 60px)'
        }}
      >
      {isAuthenticated && <SideBar />}

        <div style={{marginLeft: '60px'}}>
          { isAuthenticated && <Tab /> }
          <Container className='main-content'>
            <Route exact path='/' render={() => (
              isAuthenticated ? (
                <Redirect to="/dashboard"/>
              ) : (
                <Redirect to="/login"/>
              )
            )} />
            <Route path='/login' component={userIsNotAuthenticatedRedir(Login)} />
            <Route path='/signup' component={userIsNotAuthenticatedRedir(Signup)} />
            <Route path='/dashboard' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Dashboard))} />
            <Route path='/profile' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Profile))} />
            <Route path='/users' component={userIsAuthenticatedRedir(
              /*userIsAdminOrManagerRedir*/(Users)
            )} />
            <Route path='/records' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Records))} />
            <Route path='/logs' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Logs))} />
            <Route path='/medias' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Medias))} />
            <Route path='/providers' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Providers))} />
          </Container>
        </div>
      </div>
    </div>
  </Router>
)

const selector = (state) => ({
  isAuthenticated: !!state.auth.me
})

export default connect(selector)(routes)

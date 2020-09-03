import React from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import Dashboard from './Dashboard'
import Header from '../containers/Header'
import Login from './Login'
import Profile from './Profile'
import Records from './Records'
import Signup from './Signup'
import Users from './Users'
import Logs from './LogsList'
import Medias from './Medias'
import Tab from '../containers/Tab'
import Providers from './Providers'
import Clients from './Clients'
import Jobs from './Jobs'
import News from './News'
import Invoices from './Invoices'
import Banners from './Banners'
import { Splash, Settings } from './Settings'
import Statistics from './Statistics'
import Databases from './Databases'
import Contracts from './Contracts'
import Messages from './Messages'
import CustomerSupport from './CustomerSupport';

import { userIsAuthenticatedRedir, userIsNotAuthenticatedRedir, userIsAdminOrManagerRedir }
  from '../helpers/authHelpers'
import {NotificationContainer} from 'react-notifications'

import '../Vendor';
import '../styles/core.scss'
import '../styles/bootstrap.scss';
import '../styles/app.scss'

import SideBar from '../components/Layout/Sidebar'
const routes = ({ isAuthenticated }) => (
  <Router>
    <div>
      <NotificationContainer />
      <Header />
      <div
        className="wrapper"
      >
        {isAuthenticated && <SideBar />}
        <section className={isAuthenticated ? 'section-container': ''}>
          { isAuthenticated && <Tab /> }
          <div style={{minHeight: 'calc(100vh - 200px)',}}>
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
            <Route path='/profile' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Profile))}s />
            <Route path='/users' component={userIsAuthenticatedRedir(
              /*userIsAdminOrManagerRedir*/(Users)
            )} />
            <Route path='/records' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Records))} />
            <Route path='/logs' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Logs))} />
            <Route path='/medias' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Medias))} />
            <Route path='/providers' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Providers))} />
            <Route path='/clients' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Clients))} />
            <Route path='/jobs' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Jobs))} />
            <Route path='/news' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(News))} />
            <Route path='/message' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Messages))} />
            <Route path='/invoices' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Invoices))} />
            <Route path='/banners' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Banners))} />
            <Route path='/customer_support' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(CustomerSupport))} />
            <Route path='/settings/splash' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Splash))} />
            <Route path='/settings/main' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Settings))} />
            <Route path='/statistics' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Statistics))} />
            <Route path='/databases' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Databases))} />
            <Route path='/contracts' component={userIsAuthenticatedRedir(userIsAdminOrManagerRedir(Contracts))} />
          </Container>
          </div>
        </section>
      </div>
    </div>
  </Router>
)

const selector = (state) => ({
  isAuthenticated: !!state.auth.me
})

export default connect(selector)(routes)

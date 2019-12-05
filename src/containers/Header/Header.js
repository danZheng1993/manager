import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Collapse, Container, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem }
  from 'reactstrap'
import { canManageUsers } from 'helpers/roleHelpers'
import { logout } from 'redux/modules/auth'

class Header extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleLogout = (e) => {
    const { logout } = this.props
    logout()
  }

  render() {
    const { auth } = this.props

    return (
      <div>
        <Navbar color="primary" inverse toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">HVR后台业务管理系统</NavbarBrand>
          {/* <Collapse isOpen={this.state.isOpen} navbar>
            {auth.me
            && <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/dashboard' className='nav-link'>Dashboard</Link>
              </NavItem>
              {canManageUsers(auth.me) && <NavItem>
                <Link to='/users' className='nav-link'>Users</Link>
              </NavItem>}
              <NavItem>
                <Link to='/records' className='nav-link'>Records</Link>
              </NavItem>
              <NavItem>
                <Link to='/profile' className='nav-link'>Profile</Link>
              </NavItem>
              <NavItem>
                <Link to='/' onClick={this.handleLogout} className='nav-link'>Logout</Link>
              </NavItem>
            </Nav>
            }
          </Collapse> */}
        </Navbar>
      </div>
    )
  }
}

const selector = (state) => ({
  auth: state.auth
})

const actions = {
  logout
}

export default connect(selector, actions)(Header)

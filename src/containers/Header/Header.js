import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem }
  from 'reactstrap'
import { canManageUsers } from 'helpers/roleHelpers'
import { logout } from 'redux/modules/auth'
import { ADDRESS } from '../../constants'

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
           <Collapse isOpen={this.state.isOpen} navbar>
            <NavbarBrand href="/">HVR后台业务管理系统</NavbarBrand>
            {auth.me && canManageUsers(auth.me)
            && <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/profile' className='nav-link'>
                  <img src={ADDRESS.BASE_URL + auth.me.photo} 
                  width="28" height="28" style={{borderRadius: '50%'}} alt="avatar" />
                  {auth.me.userName}
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/records' className='nav-link'>
                  <i className="fa fa-fw fa-bell" style={{ fontSize: '1.5em' }} />
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/' onClick={this.handleLogout} className='nav-link'>
                <i className="fa fa-fw fa-power-off" style={{ fontSize: '1.5em' }} />
                </Link>
              </NavItem>
            </Nav>
            }
          </Collapse>
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

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, NavbarToggler, Nav, NavItem, Button }
  from 'reactstrap'
import { logout } from 'redux/modules/auth'
import { withRouter } from 'react-router'
import { compose } from 'redux'

class Tab extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      pathname: '',
      path: []
    }
  }
  componentWillMount() {
    const { pathname } = this.state
    const { location } = this.props
    if (!pathname) {
      this.setState({pathname: location.pathname, path: location.pathname.split('/')})
    }
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({pathname: location.pathname, path: location.pathname.split('/')})
    })
  }
  componentWillUnmount() {
      this.unlisten()
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

  setActive = (to) => {
    const { pathname } = this.state
    var isActive = pathname === to
    var active = isActive ? {backgroundColor: '#71A5FF', color: 'white'} : {}
    return active
  }
  render() {
    const { auth } = this.props
    const { path } = this.state
    return (
      <div>
        {auth.me &&
        <Navbar style={{backgroundColor: '#f1f1f1'}} toggleable className="d-flex justify-content-between">
          <NavbarToggler right onClick={this.toggle} />
            { path[1] === 'medias' && path.length === 4 && 
                <Nav navbar>
                  <NavItem >
                    <Link to={`/medias/view/${path[3]}`} className='nav-link' style={this.setActive(`/medias/view/${path[3]}`)}>
                    VR详情
                    </Link>
                  </NavItem>
                  <NavItem style={{backgroundColor: '#f1f1ff'}}>
                    <Link to={`/medias/edit/${path[3]}`} className='nav-link' style={this.setActive(`/medias/edit/${path[3]}`)}>
                    审核
                    </Link>
                  </NavItem>
                </Nav> 
            }
            { path[1] === 'providers' && path.length === 3 && (path[2] === 'allowed' || path[2] === 'pending') && 
                <Nav navbar>
                  <NavItem >
                    <Link to={`/providers/allowed`} className='nav-link' style={this.setActive(`/providers/allowed`)}>
                    服务方列表
                    </Link>
                  </NavItem>
                  <NavItem style={{backgroundColor: '#f1f1ff'}}>
                    <Link to={`/providers/pending`} className='nav-link' style={this.setActive(`/providers/pending`)}>
                    待审核列表
                    </Link>
                  </NavItem>
                </Nav> 
            }
            { path[1] === 'providers' && path.length === 4 && 
              <Nav navbar>
                <NavItem >
                  <Link to={`/providers/view/${path[3]}`} className='nav-link' style={this.setActive(`/providers/view/${path[3]}`)}>
                  用户详情
                  </Link>
                </NavItem>
                <NavItem style={{backgroundColor: '#f1f1ff'}}>
                  <Link to={`/providers/edit/${path[3]}`} className='nav-link' style={this.setActive(`/providers/edit/${path[3]}`)}>
                  发布的视频
                  </Link>
                </NavItem>
              </Nav>
            }
            <Nav navbar></Nav>
            <Nav navbar>
              <NavItem>
                <Button onClick={() => window.location.reload()} className='nav-link'>
                  <i className="fa fa-fw fa-refresh" style={{ fontSize: '1em' }} />
                </Button>
              </NavItem>
              <NavItem>
                <Button onClick={() => this.props.history.goBack()} className='nav-link'>
                返回
                </Button>
                
              </NavItem>
            </Nav>
        </Navbar>
        }
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

export default compose(
  connect(selector, actions),
  withRouter
)(Tab)
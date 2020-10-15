import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'

import { logout } from '../../redux/modules/auth'

class SideBar extends React.Component {
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
    const { auth , location, history} = this.props
    return (
      <div style={{backgroundColor: "black"}}>
        <SideNav
          onSelect={(selected) => {
            const to = '/' + selected
            // if (location.pathname !== to) {
              history.push(to)
            // }
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="dashboard">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                首页
              </NavText>        
              <NavItem eventKey="dashboard">
                <NavText>
                  系统首页
                </NavText>
              </NavItem>
              <NavItem eventKey="logs">
                <NavText>
                  登录日志
                </NavText>
              </NavItem>   
              <NavItem eventKey="profile">
                <NavText>
                  账户设置
                </NavText>
              </NavItem>   
            </NavItem>
            <NavItem eventKey="medias">
              <NavIcon>
                <i className="fa fa-fw fa-video-camera" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                VR管理
              </NavText>
            </NavItem>
            <NavItem eventKey="users">
              <NavIcon>
                <i className="fa fa-fw fa-user-circle-o" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                用户管理
              </NavText>        
              <NavItem eventKey="providers">
                <NavText>
                服务方管理
                </NavText>
              </NavItem>
              <NavItem eventKey="clients">
                <NavText>
                需求方管理
                </NavText>
              </NavItem>   
              <NavItem eventKey="providers/awards">
                <NavText>
                红包管理
                </NavText>
              </NavItem>   
              <NavItem eventKey="providers/partners">
                <NavText>
                合作公司添加
                </NavText>
              </NavItem>   
            </NavItem>
            <NavItem eventKey="jobs">
              <NavIcon>
                <i className="fa fa-fw fa-th-list" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                订单管理
              </NavText>
            </NavItem>
            <NavItem eventKey="news">
              <NavIcon>
                <i className="fa fa-fw fa-newspaper-o" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              资讯管理
              </NavText>        
              <NavItem eventKey="news">
                <NavText>
                资讯管理
                </NavText>
              </NavItem>
              <NavItem eventKey="news/new">
                <NavText>
                发布资讯
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="contracts">
              <NavIcon>
                <i className="fa fa-fw fa-pencil-square-o" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              合同管理
              </NavText>        
            </NavItem>
            <NavItem eventKey="invoices">
              <NavIcon>
                <i className="fa fa-fw fa-credit-card-alt" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              发票管理
              </NavText>        
              <NavItem eventKey="invoices">
                <NavText>
                发票列表
                </NavText>
              </NavItem>
              <NavItem eventKey="invoices/pending">
                <NavText>
                发票申请列表
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="banners">
              <NavIcon>
                <i className="fa fa-fw fa-bell" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              运营
              </NavText>        
              <NavItem eventKey="">
                <NavText>
                通知消息
                </NavText>
              </NavItem>
              <NavItem eventKey="">
                <NavText>
                短信消息
                </NavText>
              </NavItem>    
              <NavItem eventKey="">
                <NavText>
                活动消息
                </NavText>
              </NavItem>    
              {/* 广告管理      */}
              <NavItem eventKey="banners">
                <NavText>
                Banners
                </NavText>
              </NavItem>
              <NavItem eventKey="banners/new">
                <NavText>
                添加广告
                </NavText>
              </NavItem>
            </NavItem>
            <NavItem eventKey="statistics">
              <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              统计
              </NavText>        
              <NavItem eventKey="statistics/transaction">
                <NavText>
                交易统计
                </NavText>
              </NavItem>
              <NavItem eventKey="statistics/search">
                <NavText>
                搜索统计
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="financial">
              <NavIcon>
                <i className="fa fa-fw fa-dollar" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              财务
              </NavText>        
              <NavItem eventKey="financial">
                <NavText>
                综合统计
                </NavText>
              </NavItem>
              <NavItem eventKey="financial/list">
                <NavText>
                对账列表
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="settings/splash">
              <NavIcon>
                <i className="fa fa-fw fa-gear" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              设置
              </NavText>        
              <NavItem eventKey="settings/splash">
                <NavText>
                启动页设置
                </NavText>
              </NavItem>
              <NavItem eventKey="settings/main">
                <NavText>
                基本设置
                </NavText>
              </NavItem>    
              <NavItem eventKey="settings/transaction">
                <NavText>
                交易信息
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="permissions">
              <NavIcon>
                <i className="fa fa-fw fa-vcard" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              权限管理
              </NavText>        
              <NavItem eventKey="permissions/">
                <NavText>
                部门管理
                </NavText>
              </NavItem>
              <NavItem eventKey="">
                <NavText>
                成员管理
                </NavText>
              </NavItem>    
              <NavItem eventKey="databases">
                <NavText>
                数据库管理
                </NavText>
              </NavItem>    
            </NavItem>
          </SideNav.Nav>
        </SideNav>
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
)(SideBar)
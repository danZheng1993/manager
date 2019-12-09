import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import { logout } from 'redux/modules/auth'


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
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                VR管理
              </NavText>
            </NavItem>
            <NavItem eventKey="users">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
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
              <NavItem eventKey="">
                <NavText>
                红包管理
                </NavText>
              </NavItem>   
              <NavItem eventKey="">
                <NavText>
                合作公司添加
                </NavText>
              </NavItem>   
            </NavItem>
            <NavItem eventKey="signup">
              <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                订单管理
              </NavText>
            </NavItem>
            <NavItem eventKey="">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              资讯管理
              </NavText>        
              <NavItem eventKey="">
                <NavText>
                资讯管理
                </NavText>
              </NavItem>
              <NavItem eventKey="">
                <NavText>
                发布资讯
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="users">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              合同管理
              </NavText>        
            </NavItem>
            <NavItem eventKey="">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              发票管理
              </NavText>        
              <NavItem eventKey="">
                <NavText>
                发票列表
                </NavText>
              </NavItem>
              <NavItem eventKey="">
                <NavText>
                发票申请列表
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              客服
              </NavText>        
              <NavItem eventKey="">
                <NavText>
                添加工单
                </NavText>
              </NavItem>
              <NavItem eventKey="">
                <NavText>
                工单列表
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
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
              <NavItem eventKey="">
                <NavText>
                广告列表
                </NavText>
              </NavItem>
              <NavItem eventKey="">
                <NavText>
                添加广告
                </NavText>
              </NavItem>
            </NavItem>
            <NavItem eventKey="">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              统计
              </NavText>        
              <NavItem eventKey="">
                <NavText>
                交易统计
                </NavText>
              </NavItem>
              <NavItem eventKey="">
                <NavText>
                搜索统计
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              财务
              </NavText>        
              <NavItem eventKey="">
                <NavText>
                综合统计
                </NavText>
              </NavItem>
              <NavItem eventKey="">
                <NavText>
                对账列表
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              设置
              </NavText>        
              <NavItem eventKey="">
                <NavText>
                启动页设置
                </NavText>
              </NavItem>
              <NavItem eventKey="">
                <NavText>
                基本设置
                </NavText>
              </NavItem>    
              <NavItem eventKey="">
                <NavText>
                交易信息
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="">
              <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
              权限管理
              </NavText>        
              <NavItem eventKey="">
                <NavText>
                部门管理
                </NavText>
              </NavItem>
              <NavItem eventKey="">
                <NavText>
                成员管理
                </NavText>
              </NavItem>    
              <NavItem eventKey="">
                <NavText>
                数据库管理
                </NavText>
              </NavItem>    
            </NavItem>
            <NavItem eventKey="charts">
              <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
              </NavIcon>
              <NavText>
                Charts
              </NavText>
              <NavItem eventKey="charts/linechart">
                <NavText>
                    Line Chart
                </NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText>
                    Bar Chart
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
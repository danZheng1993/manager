import React, { Component } from 'react'
import PropTypes from 'prop-types'
import constants from '../../constants'
import { Row, Col, Table } from 'reactstrap'
import { getDateTimeStr } from '../../helpers'

class Profile extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  render() {
    const { user } = this.props
    return (
      <div>
        {user &&
        <div>
          <Row>
            <Col sm={4}>
              <div className="text-center">

            <img src={constants.BASE_URL + user.photo}    
                  width="100px" height="90px" alt="avatar" />
              <p>{user.userName} </p>
              </div>
            </Col>
            <Col sm={4} >
            <Table size="sm" bordered className="detail-table">
            <tbody>
              <tr>
                <th scope="row">昵称</th>
                <td>{user.userName}</td>
              </tr>
              <tr>
                <th scope="row">手机号</th>
                <td>{user.phoneNumber}</td>
              </tr>
              <tr>
                <th scope="row">服务商类型</th>
                <td>{user.type}</td>
              </tr>
              <tr>
                <th scope="row">城市</th>
                <td>{user.location}</td>
              </tr>
            </tbody>
          </Table>
          </Col>
            <Col sm={4} >
            <Table size="sm" bordered className="detail-table">
            <tbody>
              <tr>
                <th scope="row">账户余额</th>
                <td>{user.balance}</td>
              </tr>
              <tr>
                <th scope="row">公司名称</th>
                <td>{user.companyName}</td>
              </tr>
              <tr>
                <th scope="row">注册时间</th>
                <td>{getDateTimeStr(user.created)}</td>
              </tr>
              <tr>
                <th scope="row">服务简介</th>
                <td>{user.overview}</td>
              </tr>
            </tbody>
          </Table>
          </Col>
          </Row>
          <Row>
            <Col sm={4} className="text-center">
              <p>身份证正面</p>
              <img src={constants.BASE_URL + user.frontID}    
                  width="80%" height="50%" alt="avatar" />
            </Col>
            <Col sm={4} className="text-center">
              <p>身份证反面</p>
              <img src={constants.BASE_URL + user.backID}    
                  width="80%" height="50%" alt="avatar" />
            </Col>
            <Col sm={4} className="text-center">
              <p>营业执照</p>
              <img src={constants.BASE_URL + user.companyLicense}    
                  width="80%" height="50%" alt="avatar" />
            </Col>
          </Row>
        </div>
        }
      </div>
    )
  }
}

export default Profile
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
                <th scope="row">注册时间</th>
                <td>{getDateTimeStr(user.created)}</td>
              </tr>
              <tr>
                <th scope="row">签名</th>
                <td>{user.overview}</td>
              </tr>
            </tbody>
          </Table>
          </Col>
          </Row>
          </div>
        }
      </div>
    )
  }
}

export default Profile
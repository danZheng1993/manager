import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Row, Col, Table, Button } from 'reactstrap'
import moment from 'moment';

import { ADDRESS } from '../../constants'
import { getDateTimeStr } from '../../helpers'
import Image from './Image';
import { updateUser } from '../../redux/modules/user'

class Profile extends Component {

  static propTypes = {
    user: PropTypes.object
  };

  state = {
    companyVerified: false,
    personallyVerified: false,
  }

  canVerifyPersonalId = () => {
    const { user } = this.props;
    const { personallyVerified } = this.state;
    return !user.personalIDVerified && user.frontID && user.backID && user.holderName && user.validFrom && user.validDate && user.idNumber && !personallyVerified;
  }

  canVerifyCompanyId = () => {
    const { user } = this.props;
    const { companyVerified } = this.state;
    return !user.companyIDVerified && user.companyID && user.companyName && user.companyLicense && !companyVerified;
  }

  handleApproveCompanyId = () => {
    const { user } = this.props;
    this.setState({ companyVerified: true });
    this.props.updateUser({ id: user._id, body: { companyIDVerified: true } });
  }

  handleApprovePersonalId = () => {
    const { user } = this.props;
    this.setState({ personallyVerified: true });
    this.props.updateUser({ id: user._id, body: { personalIDVerified: true } });
  }

  render() {
    const { user } = this.props
    return (
      <div style={{ marginBottom: 32 }}>
        {user &&
        <div>
          <Row>
            <Col sm={4}>
              <div className="text-center">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image src={ADDRESS.PROFILE_BASE_URL + user.photo} width="100px" height="90px" alt="avatar" />
                </div>
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
              <tr>
                <th scope="row">服务简介</th>
                <td>{user.overview}</td>
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
                {user.holderName && (
                  <tr>
                    <th scope="row">身份证持有人姓名</th>
                    <td>{user.holderName}</td>
                  </tr>
                )}
                {user.idNumber && (
                  <tr>
                    <th scope="row">身份证号码</th>
                    <td>{user.idNumber}</td>
                  </tr>
                )}
                {user.validFrom && user.validDate && (
                  <tr>
                    <th scope="row">有效期限</th>
                    <td>{moment(user.validFrom).format('YYYY-MM-DD')} ~ {moment(user.validDate).format('YYYY-MM-DD')}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          </Row>
          <Row>
            <Col sm={4} className="text-center">
              <p>身份证正面</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src={ADDRESS.PROFILE_BASE_URL + user.frontID} width="160px" height="100px" alt="身份证正面" />
              </div>
            </Col>
            <Col sm={4} className="text-center">
              <p>身份证反面</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src={ADDRESS.PROFILE_BASE_URL + user.backID} width="160px" height="100px" alt="身份证正面" />
              </div>
            </Col>
            <Col sm={4} className="text-center">
              <p>营业执照</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src={ADDRESS.PROFILE_BASE_URL + user.companyLicense} width="160px" height="100px" alt="身份证正面" />
              </div>
            </Col>
          </Row>
          {(this.canVerifyCompanyId() || this.canVerifyPersonalId()) && (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
              {this.canVerifyPersonalId() && <Col sm={4}><Button onClick={this.handleApprovePersonalId}>Approve Personal</Button></Col>}
              {this.canVerifyCompanyId() && <Col sm={4}><Button onClick={this.handleApproveCompanyId}>Approve Company</Button></Col>}
            </div>
          )}
        </div>
        }
      </div>
    )
  }
}

export default connect(null, { updateUser })(Profile);
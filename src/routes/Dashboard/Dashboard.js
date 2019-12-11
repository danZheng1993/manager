import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Input} from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { createNotification } from 'helpers'
import {settingsListSelector} from '../../redux/selectors'
import {getSettings} from '../../redux/modules/setting'
import uploadFile from '../../redux/api/upload'
import constants from '../../constants'
import Card from './Card'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: ''
    }
  }

  static propTypes = {
    settings: PropTypes.object,
  }

  componentWillMount () {
    const { getSettings } = this.props
    getSettings(
      {success: (payload) => this.setState({imagePreviewUrl: constants.BASE_URL + payload.data.splash})}
    )
  }

  handleSave = () => {
    const {file} = this.state
    if (!file)  return
    uploadFile('settings/splash', 'post', file, {})
      .then(() => createNotification('success'),)
      .catch(err => createNotification('error', 'Error!'))
  }

  handleImageChange = (e)  => {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }
    file && reader.readAsDataURL(file)
    console.log(file, reader.result)
  }


  render() {
    const {settings} = this.props
    let {imagePreviewUrl} = this.state
    console.log("settings", settings)
    return (
      <div>
        <Row>
          <Col sm={3}>
            <Card title="今日订单总数" value="200" icon="fa-book"/>
          </Col>
          <Col sm={3}>
            <Card title="今日交易总额" value="¥999999.00" icon="fa-dollar"/>
          </Col>
          <Col sm={3}>
            <Card title="昨日交易总额" value="¥999999.00" icon="fa-database"/>
          </Col>
          <Col sm={3}>
            <Card title="近7天交易总额" value="¥999999.00" icon="fa-line-chart"/>
          </Col>
        </Row>
        <div className="card-box">
          <p className="title">用户总览</p>
          <Row>
          <Col sm={6}>
            <p className="text-center">需求方总览</p>
            <Row>
              <Col sm={4} className="text-center">
                <p className="important-value">100</p>
                <p className="">今日新增</p>
              </Col>
              <Col sm={4} className="text-center">
                <p className="important-value">200</p>
                <p className="">昨日新增</p>
              </Col>
              <Col sm={4} className="text-center">
                <p className="important-value">1000</p>
                <p className="">本月新增</p>
              </Col>
            </Row>
          </Col>
          <Col sm={6}>
            <p className="text-center">服务方总览</p>
            <Row>
              <Col sm={4} className="text-center">
                <p className="important-value">100</p>
                <p className="">今日新增</p>
              </Col>
              <Col sm={4} className="text-center">
                <p className="important-value">200</p>
                <p className="">昨日新增</p>
              </Col>
              <Col sm={4} className="text-center">
                <p className="important-value">1000</p>
                <p className="">本月新增</p>
              </Col>
            </Row>
          </Col>
        </Row>
        </div>
        <Row>
          <Col sm={12} md={{ size: 10, offset: 1 }}>          
            
          </Col>
        </Row>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  settings: settingsListSelector
})

const actions = {
  getSettings
}

export default compose(
  connect(selector, actions),
  withRouter
)(Dashboard)
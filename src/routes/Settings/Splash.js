import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row, Input } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { createNotification } from 'helpers'
import {settingsListSelector} from '../../redux/selectors'
import {getSettings} from '../../redux/modules/setting'
import uploadFile from '../../redux/api/upload'
import constants from '../../constants'

class Splash extends Component {
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
  }


  render() {
    const {settings} = this.props
    let {imagePreviewUrl} = this.state
    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>
            启动页页设置
          </h2>
          <Row>
              <Col md={6}>
                { imagePreviewUrl ? <img src={imagePreviewUrl}
                  width='50%' alt="snapshot" />
                  : <div style={{width: '100%', height: '100%', background: 'black'}}></div>
                }
              </Col>
              <Col md={4}>
                <Button color='primary' style={{margin: '5px'}} onClick={this.handleSave}>Save</Button>
                <Input type="file" onChange={this.handleImageChange} accept=".gif,.jpg,.jpeg,.png"/>
              </Col>
          </Row>
         </Col>
      </Row>
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
)(Splash)
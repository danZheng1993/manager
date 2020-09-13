import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Row } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { createNotification } from '../../helpers'
import {settingsListSelector} from '../../redux/selectors'
import {getSettings} from '../../redux/modules/setting'
import uploadFile from '../../redux/api/upload'
import { ADDRESS, BUTTONS, RULES, PLACEHOLDER } from '../../constants'
import Dropzone from 'react-dropzone';

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
      {success: (payload) => this.setState({imagePreviewUrl: ADDRESS.BASE_URL + 'splashImage/' + payload.data.splash})}
    )
  }

  handleSave = () => {
    const {file} = this.state
    if (!file)  return
    uploadFile('settings/splash', 'post', file, {})
      .then(() => createNotification('success'),)
      .catch(err => {
        console.log('error occured');
        console.log({ err });
        createNotification('error', 'Error!');
      })
  }

  handleImageChange = (files)  => {
    let reader = new FileReader()
    let file = files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }
    file && reader.readAsDataURL(file)
  }


  render() {
    let {imagePreviewUrl} = this.state
    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>
            启动页页设置
          </h2>
          <Row>
              <Col md={6}>

                <Dropzone
                  className="card p-3 d-flex justify-content-center align-items-center"
                  ref="dropzone"
                  accept={RULES.IMAGE}
                  onDrop={this.handleImageChange}
                  style={{borderWidth: 1, borderColor: '#dde6e9'}}
                >
                  {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      { imagePreviewUrl ? (
                        <img src={imagePreviewUrl} alt="splash" style={{width: '100%', height: '100%'}} />
                      ) : (
                        <div
                          style={{
                            display: 'inline-block',
                            padding: '8px 16px 0px 16px',
                            lineHeight: '18px',
                            border: '1px solid #9c9c9c',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            margin: '16px',
                          }}
                        >
                          <p>{PLACEHOLDER.IMAGE}</p>
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>  
              </Col>
              <Col md={4}>
                <Button color='primary' style={{margin: '5px'}} onClick={this.handleSave}>{BUTTONS.SAVE}</Button>
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
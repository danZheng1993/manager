import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Button } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import Loader from '../../containers/Loader'
import confirm from '../../containers/ConfirmModal'
import { ADDRESS, BUTTONS } from '../../constants'
import { getDateTimeStr, createNotification, showTestStatus } from '../../helpers'
import { mediaDetailSelector, mediasloadingSelector } from '../../redux/selectors'
import { getMedia, updateMedia } from '../../redux/modules/media'
// import VrPlayer from 'react-vr-player'

class MediaEdit extends Component {
  static propTypes = {
    getMedia: PropTypes.func,
    updateMedia: PropTypes.func,
    media: PropTypes.object
  };

  componentWillMount () {
    const { getMedia, match: { params } } = this.props
    params.id && getMedia({ id: params.id })
  }

  handleCheck = (id, isAllowed) => () => {
    const { updateMedia } = this.props
    if (isAllowed) {
      confirm('确定审核通过?').then(
        () => {
          updateMedia({ 
            id,
            body: {isAllowed},
            success: () => {
              this.props.history.goBack()
              createNotification('success')
            },
           })
        }
      )
    } else {
      confirm('确定审核不通过?').then(
        () => {
          updateMedia({ 
            id, 
            body: {isAllowed},
            success: () => {
              this.props.history.goBack()
              createNotification('success')
            },
          })
        }
      )
    }
  }

  render() {
    const { media, loading} = this.props
    // const keys = { // If you want to re-define the keys, here are the defaults
    //     left: 'A',
    //     right: 'D',
    //     up: 'W',
    //     down: 'S',
    //     rotateLeft: 'Q',
    //     rotateRight: 'E',
    //     fullScreen: 'F',
    //     zeroSensor: 'Z',
    //     playPause: ' '
    // }
    return (
      <div>
        <Loader active={loading} />
        {media &&
        <div>
          <h4 className='text-center mb-5'>VR信息审核</h4>
          <Row>
            <Col sm={12} md={{size: 4, offset: 4}}>
            <img src={ADDRESS.MEDIA_BASE_URL + media.snapshot}    
                  width="100%" height="90%" alt="snapshot" />
          </Col>
          </Row>
          <Row>
          <Col sm={12} md={{size: 4, offset: 4}}>
            <p>视频标题 : {media.title} </p>
            <p>审核状态 : {showTestStatus(media.isAllowed)} </p>
            <p>审核时间 : {getDateTimeStr(media.tested)} </p>
            <Button color='secondary' onClick={(this.handleCheck(media._id, false))}>{BUTTONS.DECLINE}</Button>
            <Button color='secondary' onClick={(this.handleCheck(media._id, true))}>{BUTTONS.ACCEPT}</Button>
            </Col>
          </Row>
        </div>}
      </div>
    )
  }
}

const selector = createStructuredSelector({
  media: mediaDetailSelector,
  loading: mediasloadingSelector,
})

const actions = {
  getMedia,
  updateMedia
}

export default compose(
  connect(selector, actions),
  withRouter
)(MediaEdit)

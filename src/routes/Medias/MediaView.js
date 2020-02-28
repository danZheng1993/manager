import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../containers/Loader'
import { ADDRESS } from '../../constants'
import { Col, Row, Table } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { getMedia } from 'redux/modules/media'
// import VrPlayer from 'react-vr-player'
import { getDateTimeStr } from '../../helpers'
import { mediaDetailSelector, mediasloadingSelector } from '../../redux/selectors'

class MediaView extends Component {
  static propTypes = {
    getMedia: PropTypes.func,
    media: PropTypes.object
  };

  componentWillMount () {
    const { getMedia, match: { params } } = this.props
    params.id && getMedia({ id: params.id })
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
          <Row>
            <Col sm={3}>
            <img src={ADDRESS.MEDIA_BASE_URL + media.snapshot}    
                  width="100%" height="90%" alt="snapshot" />
              {/* <VrPlayer
                sources={[ // Declare an array of video sources
                  { url: 'localhost:4000/mediaSource/media3.mp4', type: 'video/mp4' },
                ]}
                brand="Some Brand Name"
                title="Some Video Title"
                style={{width: '200px', height: '200px'}}
                keys={keys} /> */}
            </Col>
            <Col sm={6} >
              <p>标题 : {media.title} </p>
              <p>编号 : {media._id} </p>
              <p>是否公开 : {media.isPublic ? '是' : '否' } </p>
              <p>上传时间 : {getDateTimeStr(media.created)} </p>
              <p>播放次数 : {media.visits}次 </p>
              <p>收藏次数 : {media.favourites}次 </p>
              <p>分享次数 : {media.shares}次 </p>
            </Col>
          </Row>
          <h6 className='text-center mb-5'>项目信息</h6>
          <Table size="sm" bordered className="detail-table">
            <tbody>
              <tr>
                <th scope="row">需求方</th>
                <td>{media.poster.userName}</td>
              </tr>
              <tr>
                <th scope="row">手机号</th>
                <td>{media.poster.phoneNumber}</td>
              </tr>
              <tr>
                <th scope="row">所在城市</th>
                <td>{media.poster.location}</td>
              </tr>
            </tbody>
          </Table>
          <Table size="sm" bordered className="detail-table">
            <tbody>
              <tr>
                <th scope="row">服务方</th>
                <td>{media.creator.userName}</td>
              </tr>
              <tr>
                <th scope="row">手机号</th>
                <td>{media.creator.phoneNumber}</td>
              </tr>
              <tr>
                <th scope="row">所在城市</th>
                <td>{media.creator.location}</td>
              </tr>
              <tr>
                <th scope="row">服务方类型</th>
                <td>个人</td>
              </tr>
              <tr>
                <th scope="row">公司名称</th>
                <td>{media.creator.companyName}</td>
              </tr>
            </tbody>
          </Table>
          <Table size="sm" bordered className="detail-table">
            <tbody>
              <tr>
                <th scope="row">项目首付款(20%)</th>
                <td>{media.jobID.price}</td>
              </tr>
              <tr>
                <th scope="row">项目尾款(80%)</th>
                <td>{media.jobID.price}</td>
              </tr>
              <tr>
                <th scope="row">项目总金额</th>
                <td>{media.jobID.price}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        }
      </div>
    )
  }
}

const selector = createStructuredSelector({
  media: mediaDetailSelector,
  loading: mediasloadingSelector
})

const actions = {
  getMedia,
}

export default compose(
  connect(selector, actions),
  withRouter
)(MediaView)

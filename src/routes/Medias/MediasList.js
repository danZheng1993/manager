import { Button, Table } from 'reactstrap'
import React, { Component } from 'react'
import Loader from '../../containers/Loader'
import { deleteMedia, getMedias } from 'redux/modules/media'
import { mediasListSelector, mediasParamsSelector, mediasloadingSelector } from 'redux/selectors'
import constants from '../../constants'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import PropTypes from 'prop-types'
import ReportModal from 'containers/ReportModal'
import { compose } from 'redux'
import confirm from 'containers/ConfirmModal'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { show } from 'redux-modal'
import { getDateTimeStr } from 'helpers'
import { withRouter } from 'react-router'
class MediasList extends Component {
  static propTypes = {
    getMedias: PropTypes.func,
    mediasList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getMedias, params } = this.props
    getMedias({ params })
  }

  handleDeleteMedia = (id) => () => {
    const { deleteMedia } = this.props
    confirm('Are you sure to delete the media?').then(
      () => {
        deleteMedia({ id })
      }
    )
  }

  handleViewReport = (media) => () => {
    const { show } = this.props
    show('reportModal', { media })
  }

  handlePagination = (pagination) => {
    const { getMedias, params } = this.props
    getMedias({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination
      }
    })
  }

  render() {
    const { mediasList, params, loading } = this.props

    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <h2 className='text-center mb-5'>Manage Medias</h2>
        <Table striped>
          <thead>
            <tr>
              <th>编号</th>
              <th>封面</th>
              <th>标题</th>
              <th>是否公开</th>
              <th>审核状态</th>
              <th>发布时间</th>
              <th>推荐</th>
              <th className='text-right'>操作</th>
            </tr>
          </thead>
          <tbody>
            {mediasList && mediasList.map((media, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>
                  <img src={constants.MEDIA_BASE_URL + media.snapshot}    
                  width="30" height="30" alt="snapshot" />
                </td>
                <td>{media.title}</td>
                <td>{media.isPublic ? '是' : '否'}</td>
                <td>{media.title}</td>
                <td>{getDateTimeStr(media.created)}</td>
                <td>{media.title}</td>
                <td className='text-right'>
                  <Button color='primary' tag={Link} size='sm' to={`/medias/view/${media._id}`}>
                  查看
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteMedia(media._id)}>
                  审核
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
        <ReportModal />    
      </div>
    )
  }
}

const selector = createStructuredSelector({
  mediasList: mediasListSelector,
  params: mediasParamsSelector,
  loading: mediasloadingSelector
})

const actions = {
  getMedias,
  deleteMedia,
  show
}

export default compose(
  connect(selector, actions),
  withRouter
)(MediasList)

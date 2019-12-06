import { Button, Table } from 'reactstrap'
import React, { Component } from 'react'
import { deleteMedia, getMedias } from 'redux/modules/media'
import { mediasListSelector, mediasParamsSelector } from 'redux/selectors'

import { Link } from 'react-router-dom'
import MdPersonAdd from 'react-icons/lib/md/person-add'
import Pagination from 'components/Pagination'
import PropTypes from 'prop-types'
import ReportModal from 'containers/ReportModal'
import { compose } from 'redux'
import confirm from 'containers/ConfirmModal'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { show } from 'redux-modal'
import { ucFirst } from 'helpers'
import { withRouter } from 'react-router'

class MediasList extends Component {
  static propTypes = {
    deleteMedia: PropTypes.func,
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
    const { mediasList, params } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    console.log(">>>>>>>>>>>>>",mediasList,pagination)
    return (
      <div>
        <h2 className='text-center mb-5'>Manage Medias</h2>
        <div className='text-right mb-2'>
          <Link to='/medias/new' className='btn btn-primary'>
            <MdPersonAdd size='1.2em' /> Add a New Media
          </Link>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>phoneNumber</th>
              <th>Role</th>
              <th className='text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mediasList && mediasList.map((media, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{media.first_name} {media.last_name}</td>
                <td>{media.phoneNumber}</td>
                <td>{ucFirst(media.role)}</td>
                <td className='text-right'>
                  <Button color='info' size='sm' onClick={this.handleViewReport(media)}>
                    Report
                  </Button>
                  {' '}
                  <Button color='primary' tag={Link} size='sm' to={`/medias/edit/${media._id}`}>
                    Edit
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDeleteMedia(media._id)}>
                    Delete
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
  params: mediasParamsSelector
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

import { Button, Table } from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { withRouter } from 'react-router'
import { getDateTimeStr, showTestStatus } from '../../helpers'
import { BUTTONS, TABLE_HEADERS } from '../../constants'
import Pagination from '../../components/Pagination'
import Loader from '../../containers/Loader'
import { getMedias } from '../../redux/modules/media'
import { mediasListSelector, mediasParamsSelector, mediasloadingSelector } from '../../redux/selectors'

class MediasList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      filter : {},
    }
  }
  static propTypes = {
    getMedias: PropTypes.func,
    mediasList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getMedias, pageParams, match: { params } } = this.props
    params.id && getMedias({ params : {...pageParams, filter: {creator: params.id}} })
  }

  handlePagination = (pagination) => {
    const { getMedias, pageParams } = this.props
    const {filter} = this.state
    getMedias({
      params: {
        ...pick(pageParams, ['page', 'page_size', 'count']),
        ...pagination,
        filter,
      }
    })
  }

  handleKeyPress(target) {
    if(target.charCode===13){
      this.handleFilter()
    } 
  }
  
  render() {
    const { mediasList, pageParams, loading } = this.props
    const pagination = pick(pageParams, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>{TABLE_HEADERS.INDEX}</th>
              <th>{TABLE_HEADERS.TITLE}</th>
              <th>{TABLE_HEADERS.CLIENT}</th>
              <th>{TABLE_HEADERS.PROVIDER}</th>
              <th>{TABLE_HEADERS.CREATED}</th>
              <th>{TABLE_HEADERS.TEST_STATUS}</th>
              <th>{TABLE_HEADERS.ACTION}</th>
            </tr>
          </thead>
          <tbody>
            {mediasList && mediasList.map((media, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{media.title}</td>
                <td>{media.poster.userName}</td>
                <td>{media.creator.userName}</td>
                <td>{getDateTimeStr(media.created)}</td>
                <td>{showTestStatus(media.isAllowed)}</td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/medias/view/${media._id}`}>
                    {BUTTONS.VIEW}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination pagination={pagination} setPagination={this.handlePagination} />
      </div>
    )
  }
}

const selector = createStructuredSelector({
  mediasList: mediasListSelector,
  pageParams: mediasParamsSelector,
  loading: mediasloadingSelector
})

const actions = {
  getMedias,
}

export default compose(
  connect(selector, actions),
  withRouter
)(MediasList)

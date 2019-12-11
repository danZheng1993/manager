import { Button, Table, Row, Col, Label} from 'reactstrap'
import React, { Component } from 'react'
import Loader from '../../containers/Loader'
import { deleteBanner, getBanners, updateBanner } from 'redux/modules/banner'
import { bannersListSelector, bannersParamsSelector, bannersloadingSelector } from 'redux/selectors'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import Input from 'components/InputField/InputComponent'
import PropTypes from 'prop-types'
import ReportModal from 'containers/ReportModal'
import confirm from 'containers/ConfirmModal'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { getDateTimeStr, createNotification } from 'helpers'
import { withRouter } from 'react-router'
import DateTime from 'react-datetime'
import Switch from 'react-switch'
import constants from '../../constants'
class BannersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: '',
      title: '',
      filter: {}
    }
  }
  static propTypes = {
    getBanners: PropTypes.func,
    bannersList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getBanners, params } = this.props
    getBanners({ params })
  }

  handlePagination = (pagination) => {
    const { getBanners, params } = this.props
    const {filter} = this.state
    getBanners({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
        filter
      }
    })
  }

  handleFilter = () => {
    const { getBanners, params } = this.props
    const { title, checkOption, publicOption, startDate, endDate } = this.state
    let filter = {}
    if (title) filter['title'] = title
    if (startDate) filter['startDate'] = startDate
    if (endDate) filter['endDate'] = endDate
    this.setState({filter})
    getBanners({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter
      }
    })
  }

  handleSelect =(date)  => {
    this.setState({selectionRange: date.selection})
  }

  handleDelete = (id) => () => {
    const { deleteBanner } = this.props
    confirm('Are you sure to delete the Banner?').then(
      () => {
        deleteBanner({ id, success: () => createNotification('success') , fail: (payload) =>  createNotification('error', payload.data.message) })
      }
    )
  }

  handleChange = (id, value) => {
    const {updateBanner,} = this.props
    updateBanner({
      id,
      body: {status: !value},
      success: () => createNotification('success'),
      fail: (payload) => createNotification('error', payload.data.message)
    })
  }

  render() {
    const { bannersList, params, loading } = this.props
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Input
              label='title'
              type='text'
              placeholder='title'
              onChange={(e) => this.setState({title: e.target.value})}
              />
            </Col>
            <Col md={2} className="text-left">
              <Label>StartDate :</Label>
              <DateTime
                placeholder='From'
                dateFormat='YYYY-MM-DD'
                timeFormat={false}
                onChange={(startDate) => this.setState({startDate})}
              />
            </Col>
            <Col md={2} className="text-left">
            <Label>End Date :</Label>
              <DateTime 
                placeholder='From'
                dateFormat='YYYY-MM-DD'
                timeFormat={false}
                onChange={(endDate) => this.setState({endDate})}
              />
            </Col>
            <Col md={2}>
            <Button color='secondary' onClick={this.handleFilter}>Filter</Button>
          </Col>
        </Row>
        <Table striped>
          <thead>
            <tr>
              <th>选择</th>
              <th>编号</th>
              <th>广告名称</th>
              <th>广告图片</th>
              <th>开始时间</th>
              <th>到期时间</th>
              <th>上线/下线</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {bannersList && bannersList.map((banner, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td scope='row'>{index + 1}</td>
                <td>{banner.title}</td>
                <td>
                  <img src={constants.BANNER_BASE_URL + banner.image}    
                  width="30" height="30" alt="banner" />
                </td>
                <td>{getDateTimeStr(banner.from)}</td>
                <td>{getDateTimeStr(banner.to)}</td>
                <td><Switch onChange={() => this.handleChange(banner._id, banner.status)} checked={banner.status} /></td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/banners/edit/${banner._id}`}>
                  编辑
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDelete(banner._id)}>
                  删除
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
  bannersList: bannersListSelector,
  params: bannersParamsSelector,
  loading: bannersloadingSelector
})

const actions = {
  getBanners,
  deleteBanner,
  updateBanner
}

export default compose(
  connect(selector, actions),
  withRouter
)(BannersList)

import { Button, Table, Row, Col, Label} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { withRouter } from 'react-router'
import Switch from 'react-switch'

import ReportModal from '../../containers/ReportModal'
import confirm from '../../containers/ConfirmModal'
import { getDateTimeStr, createNotification } from '../../helpers'
import { ADDRESS, BUTTONS, LABEL, PLACEHOLDER, CONFIRM } from '../../constants'
import DateRangePicker from '../../components/DateRangePicker'
import Pagination from '../../components/Pagination'
import Input from '../../components/InputField/InputComponent'
import Loader from '../../containers/Loader'
import { deleteBanner, getBanners, updateBanner } from '../../redux/modules/banner'
import { bannersListSelector, bannersParamsSelector, bannersloadingSelector } from '../../redux/selectors'

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
    const { title, startDate, endDate } = this.state
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
    confirm(CONFIRM.DELETE).then(
      () => {
        deleteBanner({ id, success: () => createNotification('success')})
      }
    )
  }

  handleChange = (id, value) => {
    const {updateBanner,} = this.props
    updateBanner({
      id,
      body: {status: !value},
      success: () => createNotification('success'),
    })
  }

  onChangeRange = (picker) => {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    })
  }

  render() {
    const { bannersList, params, loading } = this.props
    const { startDate, endDate } = this.state
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Input
              label={LABEL.TITLE}
              type="text"
              placeholder={PLACEHOLDER.TITLE}
              onChange={(e) => this.setState({title: e.target.value})}
              />
            </Col>
            <Col md={6}>
              <Label>{LABEL.DATE}</Label>
              <Row>
                <Col md={8}>
                  <DateRangePicker startDate={startDate} endDate={endDate} onChangeRange={this.onChangeRange}/>
                </Col>
                <Col>
                  <Button color='secondary' onClick={this.handleFilter}>{BUTTONS.FILTER}</Button>
                </Col>
              </Row>
            </Col>
        </Row>
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>选择</th>
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
                <td>{banner.title}</td>
                <td>
                  <img src={ADDRESS.BANNER_BASE_URL + banner.image}    
                  width="30" height="30" alt="banner" />
                </td>
                <td>{getDateTimeStr(banner.from)}</td>
                <td>{getDateTimeStr(banner.to)}</td>
                <td><Switch onChange={() => this.handleChange(banner._id, banner.status)} checked={banner.status} /></td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/banners/edit/${banner._id}`}>
                    {BUTTONS.EDIT}
                  </Button>
                  {' '}
                  <Button color='danger' size='sm' onClick={this.handleDelete(banner._id)}>
                    {BUTTONS.DELETE}
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

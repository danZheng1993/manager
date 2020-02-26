import { Button, Table, Row, Col, Label} from 'reactstrap'
import React, { Component } from 'react'
import Loader from '../../containers/Loader'
import { updateMedia, getMedias } from 'redux/modules/media'
import { mediasListSelector, mediasParamsSelector, mediasloadingSelector } from 'redux/selectors'
import constants from '../../constants'
import { Link } from 'react-router-dom'
import Pagination from 'components/Pagination'
import Input from 'components/InputField/InputComponent'
import PropTypes from 'prop-types'
import ReportModal from 'containers/ReportModal'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { getDateTimeStr, createNotification } from 'helpers'
import { withRouter } from 'react-router'
import DateTime from 'react-datetime'
import Switch from 'react-switch'
import InputField from 'components/InputField'
import { handleError } from '../../helpers'

const checkOptions = [
  {label: '全部', value: '' }, 
  {label: '未审核', value: '未审核' }, 
  {label: '审核通过', value: '审核通过' }, 
  {label: '审核未通过', value: '审核未通过' }, 
]
const publicOptions = [
  {label: '全部', value: '' }, 
  {label: '公开', value: true }, 
  {label: '不公开', value: false }, 
]
class MediasList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: '',
      title: '',
      checkOption: '',
      publicOption: '',
      filter: {}
    }
  }
  static propTypes = {
    getMedias: PropTypes.func,
    mediasList: PropTypes.array,
    history: PropTypes.object,
  };

  componentWillMount () {
    const { getMedias, params } = this.props
    getMedias({ params })
  }
  
  handleChange = (id, value) => {
    const {updateMedia} = this.props
    updateMedia({
      id,
      body: {recommend: !value},
      success: () => createNotification('success'),
    })
  }

  handlePagination = (pagination) => {
    const { getMedias, params } = this.props
    const {filter} = this.state
    getMedias({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        ...pagination,
        filter
      }
    })
  }

  handleFilter = () => {
    const { getMedias, params } = this.props
    const { title, checkOption, publicOption, startDate, endDate } = this.state
    let filter = {}
    if (title) filter['title'] = title
    if (checkOption) filter['checkOption'] = checkOption
    if (publicOption != '') filter['publicOption'] = publicOption
    if (startDate) filter['startDate'] = startDate
    if (endDate) filter['endDate'] = endDate
    this.setState({filter})
    getMedias({
      params: {
        ...pick(params, ['page', 'page_size', 'count']),
        filter
      }
    })
  }

  handleSelect =(date)  => {
    this.setState({selectionRange: date.selection})
  }

  render() {
    const { mediasList, params, loading } = this.props
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
            <Col md={2}>
              <Input
                label='审核状态 : '
                name='checkOption'
                type='select'
                options={checkOptions}
                component={InputField}
                onChange={(e) => this.setState({checkOption: e.target.value})}
              />
            </Col>
            <Col md={2}>
              <Input
                label='审核状态 : '
                name='publicOption'
                type='select'
                options={publicOptions}
                component={InputField}
                onChange={(e) => this.setState({publicOption: e.target.value})}
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
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>编号</th>
              <th>封面</th>
              <th>标题</th>
              <th>是否公开</th>
              <th>审核状态</th>
              <th>发布时间</th>
              <th>推荐</th>
              <th>操作</th>
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
                <td><Switch onChange={() => this.handleChange(media._id, media.recommend)} checked={media.recommend} /></td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/medias/view/${media._id}`}>
                  查看
                  </Button>
                  {' '}
                  <Button color='primary' tag={Link} size='sm' to={`/medias/edit/${media._id}`}>
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
  updateMedia,
}

export default compose(
  connect(selector, actions),
  withRouter
)(MediasList)

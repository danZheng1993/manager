import { Button, Table, Row, Col, Label} from 'reactstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick } from 'lodash'
import { getDateTimeStr, createNotification } from '../../helpers'
import { withRouter } from 'react-router'
import Switch from 'react-switch'
import InputField from '../../components/InputField'
import DateRangePicker from '../../components/DateRangePicker'
import ReportModal from '../../containers/ReportModal'
import Pagination from '../../components/Pagination'
import Input from '../../components/InputField/InputComponent'
import { ADDRESS, BUTTONS, LABEL } from '../../constants'
import Loader from '../../containers/Loader'
import { updateMedia, getMedias } from '../../redux/modules/media'
import { mediasListSelector, mediasParamsSelector, mediasloadingSelector } from '../../redux/selectors'
import { showTestStatus } from '../../helpers'

const checkOptions = [
  {label: '全部', value: '' }, 
  {label: '未审核', value: 'null' }, 
  {label: '审核通过', value: true }, 
  {label: '审核未通过', value: false }, 
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
    if (checkOption !== '') filter['checkOption'] = checkOption
    if (publicOption !== '') filter['publicOption'] = publicOption
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

  onChangeRange = (picker) => {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate,
    })
  }

  render() {
    const { mediasList, params, loading } = this.props
    const { startDate, endDate } = this.state
    const pagination = pick(params, ['page', 'page_size', 'count'])
    return (
      <div>
        <Loader active={loading} />
        <Row className='mb-3'>
          <Col md={2} xs={12}>
            <Input
              label={LABEL.TITLE}
              type='text'
              placeholder={LABEL.TITLE}
              onChange={(e) => this.setState({title: e.target.value})}
              />
            </Col>
            <Col md={2}>
              <Input
                label={LABEL.CHECK_OPTION}
                name='checkOption'
                type='select'
                options={checkOptions}
                component={InputField}
                onChange={(e) => this.setState({checkOption: e.target.value})}
              />
            </Col>
            <Col md={2}>
              <Input
                label={LABEL.ISPUBLIC}
                name='publicOption'
                type='select'
                options={publicOptions}
                component={InputField}
                onChange={(e) => this.setState({publicOption: e.target.value})}
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
                  <img src={ADDRESS.MEDIA_BASE_URL + media.snapshot}    
                  width="30" height="30" alt="snapshot" />
                </td>
                <td>{media.title}</td>
                <td>{media.isPublic ? '是' : '否'}</td>
                <td>{showTestStatus(media.isAllowed)}</td>
                <td>{getDateTimeStr(media.created)}</td>
                <td><Switch onChange={() => this.handleChange(media._id, media.recommend)} checked={media.recommend} /></td>
                <td>
                  <Button color='primary' tag={Link} size='sm' to={`/medias/view/${media._id}`}>
                    {BUTTONS.VIEW}
                  </Button>
                  {' '}
                  <Button color='info' tag={Link} size='sm' to={`/medias/edit/${media._id}`}>
                    {BUTTONS.TEST}
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

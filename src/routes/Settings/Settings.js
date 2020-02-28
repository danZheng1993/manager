import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Col, Form, Row} from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router'
import { getSettings, updateSettings } from 'redux/modules/setting'
import { isFieldRequired, createNotification } from 'helpers'
import InputField from 'components/InputField'
import * as selectors from 'redux/selectors'
import { BUTTONS } from '../../constants'

class Settings extends Component {
  static propTypes = {
    getSettings: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    initialValues: PropTypes.object,
    updateSettings: PropTypes.func,
    settingsState: PropTypes.object
  }

  componentWillMount () {
    const { getSettings } = this.props
    getSettings()
  }

  handleSave = (values) => {
    const { updateSettings } = this.props
    updateSettings({
      body: values,
      success: () => createNotification('success'),
    })
  }
  
  render() {
    const { handleSubmit} = this.props
    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='mb-5'>
            常规设置
          </h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='热门搜索关键字'
              name='popularSearch'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <p className="description">热门搜索关键字,请用半角逗号(,)分隔多个关键字</p>
            <Field
              label='首付款比例设置'
              name='upfrontRate'
              type='number'
              min={0}
              max={100}
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='平台提点设置'
              name='feeRate'
              type='number'
              min={0}
              max={100}
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <h2>发布需求设置</h2>
            <Field
              label='服务类别设置'
              name='type'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <p className="description">请用半角逗号(,)分隔多个选项</p>
            <Field
              label='拍摄场景设置'
              name='scene'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <p className="description">请用半角逗号(,)分隔多个选项</p>
            <Field
              label='行业类别设置'
              name='subcategory'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <p className="description">请用半角逗号(,)分隔多个选项</p>
            <Field
              label='全景制作单个镜头预估价格设置'
              name='panoramaPrice'
              type='number'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='VR直播每小时预估价格设置'
              name='liveVRHourlyPrice'
              type='number'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Row>
              <Col>
                <Button color='primary' type='submit'>{BUTTONS.SAVE}</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

const selector = createStructuredSelector({
  initialValues: (state) => selectors.settingsListSelector(state),
})

const actions = {
  getSettings,
  updateSettings
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'settingsForm',
    enableReinitialize: true,
  }),
  withRouter
)(Settings)

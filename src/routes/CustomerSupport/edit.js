import React, { Component } from 'react'
import { Button, Col, Form, Row, FormGroup, Input, Label } from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { createSupportItem, getSupportItem, updateSupportItem } from '../../redux/modules/customerSupport'
import { isFieldRequired, createNotification } from '../../helpers'
import InputField from '../../components/InputField'
import * as selectors from '../../redux/selectors'
import { BUTTONS, CUSTOMER_TYPE } from '../../constants'

class SupportItemEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solved : true,
    }
  }

  componentWillMount () {
    const { getSupportItem, match: { params } } = this.props
    params.id && getSupportItem({ id: params.id,  success: (payload) => this.setState({solved: payload.data.solved})})
  }

  handleSave = (values) => {
    const { createSupportItem, updateSupportItem, match: { params } } = this.props
    const {solved} = this.state
    params.id
    ? updateSupportItem({
      id: params.id,
      body: {...values, solved},
      success: this.handleSuccess,
      fail: err => alert(err)
    })
    : createSupportItem({
      body: {...values, solved},
      success: this.handleSuccess,
      fail: err => alert(err)
    })
  }

  handleSuccess = () => {
    createNotification('success')
    this.props.history.push('/customer_support')
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <Row>
        <Col sm={12} md={{ size: 10, offset: 1 }}>          
          <h2 className='text-center mb-5'>工单填写</h2>
          <Form onSubmit={handleSubmit(this.handleSave)}>
            <Field
              label='客户类型'
              name='type'
              type='select'
              required
              validate={[isFieldRequired]}
              component={InputField}
              options={CUSTOMER_TYPE}
            />
            <Field
              label='联系电话'
              name='contact'
              type='text'
              required
              validate={[isFieldRequired]}
              component={InputField}
            />
            <Field
              label='问题描述'
              name='description'
              type='textarea'
              component={InputField}
              validate={[isFieldRequired]}
            />
            <Row>
              <Col md={4}>
                <Label>是否解决</Label>
              </Col>
              <Col md={8}>
                <FormGroup check>
                  <Label check style={{ marginRight: 10 }}>
                    <Input type="radio" name="solved" checked={this.state.solved} onChange={() => this.setState({solved : true})}/>是
                  </Label>
                  <Label check>
                    <Input type="radio" name="solved" checked={!this.state.solved} onChange={() => this.setState({solved : false})}/>否
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <Field
              label='备注'
              name='remark'
              type='textarea'
              component={InputField}
            />
            <Row>
              <Col xs={6}>
                <Link to='/customer_support' className='btn btn-secondary'>
                  Cancel
                </Link>
              </Col>
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
  initialValues: (state, props) =>
    props.match.params.id ?  selectors.supportItemDetailSelector(state) : {},
})

const actions = {
  createSupportItem,
  getSupportItem,
  updateSupportItem
}

export default compose(
  connect(selector, actions),
  reduxForm({
    form: 'supportItemForm',
    enableReinitialize: true,
  }),
  withRouter
)(SupportItemEdit)

import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table
} from 'reactstrap'
import { Field, reduxForm } from 'redux-form'

import DateTimeField from 'components/DateTimeField'
import InputField from 'components/InputField'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectModal } from 'redux-modal'
import { createStructuredSelector } from 'reselect'

class AwardModal extends React.Component {

  handleFilter = (values) => {

  }

  render() {
    const { show, handleHide, handleSubmit, award, user } = this.props

    return (
      <Modal isOpen={show} toggle={handleHide} size='sm'>
        <ModalHeader toggle={this.toggle} className="text-center">红包设置</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm={12}>
              <Form onSubmit={handleSubmit(this.handleFilter)}>
                <FormGroup row>
                  <Label sm={4}>发放人数</Label>
                  <Col sm={8}>
                    <Input static>
                      共选中768798人
                    </Input>
                  </Col>
                </FormGroup>
                <Field
                  label="红包总额"
                  name='amount'
                  dateFormat='YYYY-MM-DD'
                  type="number"
                  timeFormat={false}
                  component={InputField}
                />
                <Field
                  label="开始时间"
                  placeholder='请选择时间'
                  name='from'
                  dateFormat='YYYY-MM-DD'
                  timeFormat={false}
                  component={DateTimeField}
                />
                <Field
                  label="结束时间"
                  placeholder='请选择时间'
                  name='to'
                  dateFormat='YYYY-MM-DD'
                  timeFormat={false}
                  component={DateTimeField}
                />
                <Button color='secondary'>提交</Button>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleHide}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const selector = createStructuredSelector({
})

const actions = {
}

export default compose(
  connectModal({ name: 'awardModal', destroyOnHide: false }),
  connect(selector, actions),
  reduxForm({
    form: 'awardFilterForm',
    enableReinitialize: true
  }),
)(AwardModal)

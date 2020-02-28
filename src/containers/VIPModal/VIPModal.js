import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from 'reactstrap'
import { Field, reduxForm } from 'redux-form'
import InputField from 'components/InputField'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectModal } from 'redux-modal'
import { createStructuredSelector } from 'reselect'
import { BUTTONS } from '../../constants'

class VIPModal extends React.Component {

  handleFilter = (values) => {

  }

  render() {
    const { show, handleHide, handleSubmit } = this.props

    return (
      <Modal isOpen={show} toggle={handleHide} size='sm'>
        <ModalBody>
          <Row>
            <Col sm={12}>
              <Form onSubmit={handleSubmit(this.handleFilter)}>
                <Field
                  label="公司名称"
                  name='companyName'
                  component={InputField}
                />
                <Field
                  label="联系电话"
                  type="number"
                  name='phoneNumber'
                  component={InputField}
                />
                <Field
                  label="所在城市"
                  name='location'
                  component={InputField}
                />
                <Button color='secondary'>{BUTTONS.POST}</Button>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleHide}>{BUTTONS.CANCEL}</Button>
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
  connectModal({ name: 'vipModal', destroyOnHide: false }),
  connect(selector, actions),
  reduxForm({
    form: 'awardFilterForm',
    enableReinitialize: true
  }),
)(VIPModal)

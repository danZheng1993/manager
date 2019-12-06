import React from 'react'
import { Modal, } from 'reactstrap'
import Spinner from 'react-spinkit'

const ConfirmModal = ({active}) => (
    active &&
    <div style={{width: '100%', height: '100vh', flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <p><Spinner name='double-bounce' /></p>
        <p>Loading...</p>
        <Modal isOpen={active}>
        </Modal>
    </div>
)
export default ConfirmModal

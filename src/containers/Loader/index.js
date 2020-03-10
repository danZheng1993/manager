import React from 'react'
import { Modal, } from 'reactstrap'

const ConfirmModal = ({active}) => (
    active &&
    <div style={{width: '100%', height: '100vh', flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <div className="whirl double-up">
        </div>
        <Modal isOpen={active} backdropClassName="bg-gray">
        </Modal>
    </div>
)
export default ConfirmModal

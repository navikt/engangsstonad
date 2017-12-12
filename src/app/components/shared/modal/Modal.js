import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'nav-frontend-modal';

import ModalHeader from './Modal.header';

import './modal.less';

const FpModal = ({
    children,
    title,
    type
}) => (
    <Modal className="modal" isOpen closeButton={false}>
        <ModalHeader type={type} title={title} />
        {children}
    </Modal>
);

FpModal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default FpModal;

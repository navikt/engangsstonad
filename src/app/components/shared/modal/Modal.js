import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'nav-frontend-modal';

import ModalHeader from './Modal.header';

import styles from './modal.less';

const TestModal = ({
    children,
    title,
    type
}) => (
    <div>
        <Modal
            className={styles.modal}
            isOpen
            closeButton={false}
            contentLabel="Heisann."
        >
            <ModalHeader type={type} title={title} />
            {children}
        </Modal>
    </div>
);

TestModal.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default TestModal;

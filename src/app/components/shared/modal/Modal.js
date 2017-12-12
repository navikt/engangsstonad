import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'nav-frontend-modal';
import { Normaltekst } from 'nav-frontend-typografi';

import ModalHeader from './Modal.header';
import ModalFooter from './Modal.footer';

import styles from './modal.less';

const TestModal = ({
    children, text, title, type
}) => (
    <div>
        <Modal
            className={styles.modal}
            isOpen
            onRequestClose={() => console.log('close modal')}
            closeButton={false}
            contentLabel="Heisann."
        >
            <ModalHeader type={type} title={title} />
            {children}
        </Modal>
    </div>
);

TestModal.propTypes = {
    text: PropTypes.string
};

TestModal.defaultProps = {
    text: ''
};
export default TestModal;

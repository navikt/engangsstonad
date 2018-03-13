import * as React from 'react';
import ModalHeader, { AnsattType } from './ModalHeader';
const { Modal } = require('nav-frontend-modal').default;

import './modal.less';

interface Props {
    children: JSX.Element;
    contentLabel: string;
    isOpen: boolean;
    title: string;
    type: AnsattType;
}

const EngangsstonadModal: React.StatelessComponent<Props> = ({ children, contentLabel, title, type, ...other }) => (
    <Modal
        className="modal"
        closeButton={false}
        contentLabel={contentLabel}
        {...other}
    >
        <ModalHeader type={type} title={title} />
        {children}
    </Modal>
);

export default EngangsstonadModal;

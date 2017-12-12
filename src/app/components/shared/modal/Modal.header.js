import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';

import infoIcon from '../../../assets/svg/employee_nautral.svg';
import alertIcon from '../../../assets/svg/employee_sad.svg';
import warningIcon from '../../../assets/svg/employee_warning.svg';
import successIcon from '../../../assets/svg/employee_happy.svg';

import CustomSVG from '../../shared/custom-svg/CustomSVG';
import styles from './modal.header.less';

const getIcon = (type) => {
    switch (type) {
        case 'success': return successIcon;
        case 'alert': return alertIcon;
        case 'warning': return warningIcon;
        default: return infoIcon;
    }
};

const ModalHeader = ({ className, title, type }) => (
    <div className={className}>
        <CustomSVG iconRef={getIcon(type)} />
        <Undertittel className={styles.modalTitle}>{title}</Undertittel>
    </div>
);


ModalHeader.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string
};

ModalHeader.defaultProps = {
    title: '',
    className: undefined,
    type: 'info'
};

export default ModalHeader;

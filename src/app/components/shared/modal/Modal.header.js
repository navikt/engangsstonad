import React from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';

import infoIcon from 'assets/svg/employee_nautral.svg';
import alertIcon from 'assets/svg/employee_sad.svg';
import warningIcon from 'assets/svg/employee_warning.svg';
import successIcon from 'assets/svg/employee_happy.svg';
import CustomSVG from 'shared/custom-svg/CustomSVG';

const getIcon = (type) => {
    switch (type) {
        case 'success': return successIcon;
        case 'alert': return alertIcon;
        case 'warning': return warningIcon;
        default: return infoIcon;
    }
};

const ModalHeader = ({ title, type }) => (
    <div className="header">
        <CustomSVG iconRef={getIcon(type)} className="header__illustration" />
        <Undertittel className="header__title">{title}</Undertittel>
    </div>
);


ModalHeader.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string
};

ModalHeader.defaultProps = {
    title: '',
    type: 'info'
};

export default ModalHeader;

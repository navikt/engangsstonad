import * as React from 'react';
import CustomSVG from 'components/custom-svg/CustomSVG';

const { Undertittel } = require('nav-frontend-typografi');

const alertIcon = require('assets/svg/employee_sad.svg').default;
const infoIcon = require('assets/svg/employee_nautral.svg').default;
const successIcon = require('assets/svg/employee_happy.svg').default;
const warningIcon = require('assets/svg/employee_warning.svg').default;

export enum AnsattType {
    'alarm' = 'alarm',
    'advarsel' = 'advarsel',
    'info' = 'info',
    'suksess' = 'suksess',
}

interface Props {
    title: string;
    type: AnsattType;
}

const getIcon = (type: AnsattType) => {
    switch (type) {
        case AnsattType.suksess:
            return successIcon;
        case AnsattType.alarm:
            return alertIcon;
        case AnsattType.advarsel:
            return warningIcon;
        default:
            return infoIcon;
    }
};

const ModalHeader: React.StatelessComponent<Props> = ({ title, type }) => (
    <div className="header">
        <CustomSVG iconRef={getIcon(type)} className="header__illustration" />
        <Undertittel className="header__title">{title}</Undertittel>
    </div>
);

export default ModalHeader;

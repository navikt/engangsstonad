import * as React from 'react';
import * as classnames from 'classnames';
import CustomSVG from '../custom-svg/CustomSVG';

const infoIcon = require('assets/svg/employee_nautral.svg');
const alertIcon = require('assets/svg/employee_sad.svg');
const warningIcon = require('assets/svg/employee_warning.svg');
const successIcon = require('assets/svg/employee_happy.svg');

import './dialogBox.less';

const getIcon = (type: string) => {
    switch (type) {
        case 'success':
            return successIcon.default;
        case 'alert':
            return alertIcon.default;
        case 'warning':
            return warningIcon.default;
        default:
            return infoIcon.default;
    }
};

const getClassnames = (type: string, overflow: boolean) =>
    classnames('dialogBox', {
        'dialogBox--info': type === 'info',
        'dialogBox--alert': type === 'alert',
        'dialogBox--warning': type === 'warning',
        'dialogBox--success': type === 'success',
        'm_overflow-horizontal': overflow === true
    });

interface Props {
    type: string;
    overflow: boolean;
}

const DialogBox: React.StatelessComponent<Props> = (props) => {
    const { type, overflow } = props;
    return (
        <div className={getClassnames(type, overflow)}>
            <div className="dialogBox__image">
                <CustomSVG iconRef={getIcon(type)} size={96} />
            </div>
            <div className="dialogBox__content">
                <div>{props.children}</div>
            </div>
        </div>
    );
};
export default DialogBox;

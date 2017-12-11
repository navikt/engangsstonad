import React from 'react';

import infoIcon from '../../../assets/svg/employee_nautral.svg';
import alertIcon from '../../../assets/svg/employee_sad.svg';
import warningIcon from '../../../assets/svg/employee_warning.svg';
import successIcon from '../../../assets/svg/employee_happy.svg';

import styles from './dialogBox.less';

type Props = {
    type: string,
    children: any
}

const getIcon = (type) => {
    switch (type) {
        case 'success': return successIcon;
        case 'alert': return alertIcon;
        case 'warning': return warningIcon;
        default: return infoIcon;
    }
};

const getStyle = (type) => {
    switch (type) {
        case 'success': return styles.successBox;
        case 'alert': return styles.alertBox;
        case 'warning': return styles.warningBox;
        default: return styles.infoBox;
    }
};

const DialogBoxBase = (props: Props) => {
    const { type } = props;

    return (
        <div className={getStyle(type)}>
            {getIcon(type)}
            <div className={styles.dialogText}>
                {props.children}
            </div>
        </div>
    );
};

const DialogBox = (props) => (<DialogBoxBase {...props} />);
export default DialogBox;

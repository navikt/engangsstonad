import * as React from 'react';
const { VenstreChevron } = require('nav-frontend-chevron');
import classnames from 'classnames';

import './backStep.less';

interface Props {
    text?: string;
    className?: string;
    onClick: () => void;
}

const BackStep: React.StatelessComponent<Props> = ({ text = 'Tilbake', onClick, className }) => (
    <div className={classnames('backStep', className)} onClick={onClick}>
        <VenstreChevron />
        {text}
    </div>
);

export default BackStep;

import * as React from 'react';
const { VenstreChevron } = require('nav-frontend-chevron');

import './backStep.less';

interface Props {
    text?: string;
    onClick: () => void;
}

const BackStep: React.StatelessComponent<Props> = ({ text = 'Tilbake', onClick }) => (
    <div className="backStep" onClick={onClick}>
        <VenstreChevron />
        {text}
    </div>
);

export default BackStep;

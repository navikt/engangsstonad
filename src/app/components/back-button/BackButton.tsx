import * as React from 'react';
import classnames from 'classnames';
const { VenstreChevron } = require('nav-frontend-chevron');

import './backButton.less';

interface Props {
    text?: string;
    hidden: boolean;
    onClick: () => void;
}

const BackButton: React.StatelessComponent<Props> = ({ onClick, hidden, text = 'Tilbake' }) => (
    <button className={classnames('backButton', {'backButton__hidden': hidden })} onClick={onClick} type="button">
        <VenstreChevron />
        {text}
    </button>
);

export default BackButton;

import * as React from 'react';
import classnames from 'classnames';
const { VenstreChevron } = require('nav-frontend-chevron');
const { Knapp } = require('nav-frontend-knapper');

import './backButton.less';

interface Props {
    text?: string;
    hidden: boolean;
    onClick: () => void;
}

const BackButton: React.StatelessComponent<Props> = ({ onClick, hidden, text = 'Tilbake' }) => (
    <Knapp className={classnames('backButton', {'backButton__hidden': hidden })} onClick={onClick} mini={true} htmlType="button">
        <VenstreChevron />
        {text}
    </Knapp>
);

export default BackButton;

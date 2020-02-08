import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
const { VenstreChevron } = require('nav-frontend-chevron');

import './backButton.less';

interface Props {
    text?: string;
    hidden: boolean;
    onClick: () => void;
}

const BackButton: React.StatelessComponent<Props> = ({ onClick, hidden, text = 'Tilbake' }) => {
    return hidden ? null : (
        <Knapp className="backButton" onClick={onClick} mini={true} htmlType="button">
            <span className="backButton__chevron">
                <VenstreChevron />
            </span>
            {text}
        </Knapp>
    );
};

export default BackButton;

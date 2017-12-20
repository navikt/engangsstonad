import React from 'react';
import PropTypes from 'prop-types';

import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';

import './displayTextWithLabel.less';

type Props = {
    label: string,
    text: string
};

export const DisplayTextWithLabel = (props: Props) => (
    <div className="textWithLabel">
        <EtikettLiten className="textWithLabel__label">{props.label}</EtikettLiten>
        <Normaltekst className="textWithLabel__text">{props.text}</Normaltekst>
    </div>
);

DisplayTextWithLabel.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default DisplayTextWithLabel;

import * as React from 'react';
import { EtikettLiten, Element } from 'nav-frontend-typografi';

import './displayTextWithLabel.less';

interface Props {
    label: string;
    text: string;
}

const DisplayTextWithLabel: React.StatelessComponent<Props> = ({ label, text }) => (
    <div className="textWithLabel">
        <EtikettLiten className="textWithLabel__label">{label}</EtikettLiten>
        <Element className="textWithLabel__text">{text}</Element>
    </div>
);
export default DisplayTextWithLabel;

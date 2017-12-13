// @flow
import React from 'react';

import { Undertittel } from 'nav-frontend-typografi';
import Icon from 'nav-frontend-ikoner-assets';
import './iconWithText.less';

type Props = {
    kind: string,
    text: string
};

const IconWithText = (props: Props) => (
    <div className="iconWithText">
        <Icon kind={props.kind} className="iconWithText__icon" />
        <Undertittel className="iconWithText__text">{props.text}</Undertittel>
    </div>
);

export default IconWithText;

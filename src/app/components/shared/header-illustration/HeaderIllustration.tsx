import * as React from 'react';

const { Sidetittel } = require('nav-frontend-typografi');

import CustomSVG, { IconRef } from '../custom-svg/CustomSVG';
import SpeechBubble from '../speech-bubble/SpeechBubble';

import './headerIllustration.less';

enum Theme {
    'purple' = 'purple',
    'green' = 'green',
    'orange' = 'orange'
}

type Dialog = {
    title: string,
    text: string
};

interface Props {
    title: string | JSX.Element;
    dialog: Dialog;
    svg: IconRef;
    theme: Theme;
}

const HeaderIllustration: React.StatelessComponent<Props> = ({ title, dialog, svg, theme }) => (
    <div className={`headerIllustration headerIllustration--${theme}`}>
        <div className="headerIllustration__title">
            <Sidetittel>{title}</Sidetittel>
        </div>
        {dialog && (
            <div className="headerIllustration__speechBubble">
                <SpeechBubble title={dialog.title} text={dialog.text} theme={theme} />
            </div>
        )}
        <div className="headerIllustration__illustration">
            <CustomSVG iconRef={svg} />
        </div>
    </div>
);

export default HeaderIllustration;

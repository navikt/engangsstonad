import * as React from 'react';

const { Element } = require('nav-frontend-typografi');

import './speechBubble.less';

interface Props {
    title: string;
    text: string;
    theme: string;
}

const SpeechBubble: React.StatelessComponent<Props> = ({ title = null, text, theme = 'purple' }) => (
    <div className={`speechBubble speechBubble--${theme}`}>
        <div className="speechBubble__content">
            {title && (
                <div className="speechBubble__title">
                    <Element className="m_no-margin">{title}</Element>
                </div>
            )}
            <div className="speechBubble__text">{text}</div>
        </div>
    </div>
);
export default SpeechBubble;

import * as React from 'react';
import CustomSVG, { IconRef } from '../custom-svg/CustomSVG';
import SpeechBubble from '../speech-bubble/SpeechBubble';

import './simpleIllustration.less';

interface Props {
    svg: IconRef;
    dialog?: Dialog;
}

type Dialog = {
    title: string;
    text: string | React.ReactNode;
};

const SimpleIllustration: React.StatelessComponent<Props> = ({ svg, dialog }) => {
    return (
        <div className="simpleIllustration">
            {dialog && (
                <div className="simpleIllustration__speechBubble">
                    <SpeechBubble title={dialog.title} text={dialog.text} />
                </div>
            )}
            <CustomSVG iconRef={svg} />
        </div>
    );
};

export default SimpleIllustration;

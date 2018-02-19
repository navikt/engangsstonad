import * as React from 'react';
import * as classnames from 'classnames';

import './languageToggle.less';

interface Props {
    language: string;
    toggleLanguage: (langaugeCode: string) => void;
}

const LangaugeToggle: React.StatelessComponent<Props> = ({ language, toggleLanguage }) => (
    <div className="languageToggle">
        <a
            className={classnames({ unactive: language === 'nb' })}
            href="#"
            onClick={() => toggleLanguage('nb')}
        >
            Bokmål
        </a>
        <a
            className={classnames({ unactive: language === 'nn' })}
            href="#"
            onClick={() => toggleLanguage('nn')}
        >
            Nynorsk
        </a>
    </div>
);
export default LangaugeToggle;

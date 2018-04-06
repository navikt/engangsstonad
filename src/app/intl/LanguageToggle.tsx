import * as React from 'react';
import 'nav-frontend-lenker-style';
import './languageToggle.less';

interface Props {
    language: string;
    toggleLanguage: (langaugeCode: string) => void;
}

const LangaugeToggle: React.StatelessComponent<Props> = ({ language, toggleLanguage }) => (
    <div className="languageToggle">
        {language === 'nn' && (
            <a className="lenke" href="#" onClick={() => toggleLanguage('nb')}>
                Endre målform til bokmål
            </a>
        )}
        {language === 'nb' && (
            <a className="lenke" onClick={() => toggleLanguage('nn')}>
                Endre målform til nynorsk
            </a>
        )}
    </div>
);
export default LangaugeToggle;

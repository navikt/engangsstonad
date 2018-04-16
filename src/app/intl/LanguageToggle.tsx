import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'util/i18n/i18nUtils';
import 'nav-frontend-lenker-style';
import './languageToggle.less';

interface Props {
    language: string;
    toggleLanguage: (langaugeCode: string) => void;
}

const stopEvent = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
};

const LangaugeToggle: React.StatelessComponent<Props & InjectedIntlProps> = ({ intl, language, toggleLanguage }) => {
    return (
        <div className="languageToggle">
            <a
                className="lenke"
                onClick={e => {
                    stopEvent(e);
                    language === 'nb' ? toggleLanguage('nn') : toggleLanguage('nb');
                }}
                href="#"
            >
                {getMessage(intl, 'intro.text.endreMålform')}
            </a>
        </div>
    );
};
export default injectIntl(LangaugeToggle);

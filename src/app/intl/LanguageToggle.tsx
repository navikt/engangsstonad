import * as React from 'react';
import { injectIntl, InjectedIntlProps, InjectedIntl } from 'react-intl';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
const { NedChevron } = require('nav-frontend-chevron');
import 'nav-frontend-lenker-style';

import NorwayFlagSVG from 'components/flags/NorwayFlagSVG';
import UKFlagSVG from 'components/flags/UKFlagSVG';
import getMessage from 'common/util/i18nUtils';
import { Language } from './IntlProvider';

import './languageToggle.less';

interface Props {
    toggleLanguage: (langaugeCode: string) => void;
    language: string;
}

const getLanguageCodeFromValue = (value: string) => {
    if (value === 'Bokmål - Norsk') {
        return Language.BOKMÅL;
    } else if (value === 'Nynorsk - Norsk') {
        return Language.NYNORSK;
    } else {
        return Language.ENGELSK;
    }
};

const getLanguageTextFromCode = (intl: InjectedIntl, code: string) => {
    if (code === Language.BOKMÅL) {
        return getMessage(intl, 'languageToggle.bokmål');
    } else if (code === Language.NYNORSK) {
        return getMessage(intl, 'languageToggle.nynorsk');
    } else {
        return getMessage(intl, 'languageToggle.english');
    }
};

const renderMenuItem = (intl: InjectedIntl, languageCode: string) => {
    return (
        <li key={languageCode}>
            <MenuItem className="languageToggle__menu__item">
                <div className="languageToggle__button__flag">
                    {languageCode === Language.ENGELSK ? <UKFlagSVG /> : <NorwayFlagSVG />}
                </div>
                <div className="languageToggle__button__language">{getLanguageTextFromCode(intl, languageCode)}</div>
            </MenuItem>
        </li>
    );
};

const handleSelection = (value: JSX.Element[], e: any, toggleLanguage: any) => {
    toggleLanguage(getLanguageCodeFromValue(value[1].props.children));
};

const LanguageToggle: React.StatelessComponent<Props & InjectedIntlProps> = ({ intl, language, toggleLanguage }) => {
    const menuLanguages = [Language.BOKMÅL, Language.NYNORSK, Language.ENGELSK].filter((code) => code !== language);

    return (
        <div className="languageToggle">
            <Wrapper
                className="languageToggle__wrapper"
                onSelection={(value: JSX.Element[], e: any) => handleSelection(value, e, toggleLanguage)}
            >
                <Button className="languageToggle__button">
                    <div className="languageToggle__button__flag">
                        {language === Language.ENGELSK ? <UKFlagSVG /> : <NorwayFlagSVG />}
                    </div>
                    <div className="languageToggle__button__language">{getLanguageTextFromCode(intl, language)}</div>
                    <div>
                        <NedChevron />
                    </div>
                </Button>
                <Menu className="languageToggle__menu">
                    <ul>{menuLanguages.map((code) => renderMenuItem(intl, code))}</ul>
                </Menu>
            </Wrapper>
        </div>
    );
};
export default injectIntl(LanguageToggle);

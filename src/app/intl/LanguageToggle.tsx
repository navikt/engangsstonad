import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
// import getMessage from 'util/i18n/i18nUtils';
import 'nav-frontend-lenker-style';

import './languageToggle.less';
import NorwayFlagSVG from 'components/flags/NorwayFlagSVG';
import UKFlagSVG from 'components/flags/UKFlagSVG';
import getMessage from 'common/util/i18nUtils';

interface Props {
    language: string;
    toggleLanguage: (langaugeCode: string) => void;
}

{
    /* <a
                className="lenke"
                onClick={e => {
                    stopEvent(e);
                    language === 'nb'
                        ? toggleLanguage('en')
                        : toggleLanguage('nb');
                }}
                href="#"
            >
                {getMessage(intl, 'intro.text.endreMålform')}
            </a> */
}

// const stopEvent = (evt: React.MouseEvent<HTMLAnchorElement>) => {
//     evt.stopPropagation();
//     evt.preventDefault();
// };

const getLanguageCodeFromValue = (value: string) => {
    if (value === 'Bokmål - Norsk') {
        return 'nb';
    } else if (value === 'Nynorsk - Norsk') {
        return 'nn';
    } else {
        return 'en';
    }
};

const handleSelection = (value: JSX.Element[], e: any, toggleLanguage: any) => {
    toggleLanguage(getLanguageCodeFromValue(value[1].props.children));
};

const LanguageToggle: React.StatelessComponent<Props & InjectedIntlProps> = ({
    intl,
    language,
    toggleLanguage
}) => {
    return (
        <div className="languageToggle">
            <Wrapper
                className="languageToggle__wrapper"
                onSelection={(value: JSX.Element[], e: any) =>
                    handleSelection(value, e, toggleLanguage)
                }
                closeOnSelection={false}
            >
                <Button className="languageToggle__button">
                    <div className="languageToggle__button__flag">
                        <NorwayFlagSVG />
                    </div>
                    <div className="languageToggle__button__language">
                        Norsk - Bokmål
                    </div>
                </Button>
                <Menu>
                    <ul>
                        <li>
                            <MenuItem>
                                <div className="languageToggle__button__flag">
                                    <NorwayFlagSVG />
                                </div>
                                <div className="languageToggle__button__language">
                                    {getMessage(intl, 'languageToggle.bokmål')}
                                </div>
                            </MenuItem>
                        </li>
                        <li>
                            <MenuItem>
                                <div className="languageToggle__button__flag">
                                    <NorwayFlagSVG />
                                </div>
                                <div className="languageToggle__button__language">
                                    Nynorsk - Norsk
                                </div>
                            </MenuItem>
                        </li>
                        <li>
                            <MenuItem>
                                <div className="languageToggle__button__flag">
                                    <UKFlagSVG />
                                </div>
                                <div className="languageToggle__button__language">
                                    English
                                </div>
                            </MenuItem>
                        </li>
                    </ul>
                </Menu>
            </Wrapper>
        </div>
    );
};
export default injectIntl(LanguageToggle);

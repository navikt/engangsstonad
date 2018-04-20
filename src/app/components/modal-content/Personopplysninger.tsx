import React from 'react';
import getMessage from 'util/i18n/i18nUtils';
import { InjectedIntlProps } from 'react-intl';
const { FormattedMessage, injectIntl } = require('react-intl');
const { Undertittel, Normaltekst } = require('nav-frontend-typografi');
import Lenke from 'nav-frontend-lenker';

type Props = InjectedIntlProps;

const Personopplysninger: React.StatelessComponent<Props> = (props: Props) => {
    const { intl } = props;
    return (
        <div className="modalContent">
            <Undertittel className="modalContent__header">{getMessage(intl, 'personopplysninger.sectionheading')}</Undertittel>
            <ul>
                <li>
                    <Normaltekst>{getMessage(intl, 'personopplysninger.text.1')}</Normaltekst>
                </li>
                <li>
                    <Normaltekst>{getMessage(intl, 'personopplysninger.text.innhenteOpplysninger')}</Normaltekst>
                    <ul className="modalContent__sublist">
                        <li>
                            <Normaltekst>{getMessage(intl, 'personopplysninger.text.innhenteOpplysninger.1')}</Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>{getMessage(intl, 'personopplysninger.text.innhenteOpplysninger.2')}</Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>{getMessage(intl, 'personopplysninger.text.innhenteOpplysninger.3')}</Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>{getMessage(intl, 'personopplysninger.text.innhenteOpplysninger.4')}</Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>{getMessage(intl, 'personopplysninger.text.innhenteOpplysninger.5')}</Normaltekst>
                        </li>
                        <li>
                            <Normaltekst>{getMessage(intl, 'personopplysninger.text.innhenteOpplysninger.6')}</Normaltekst>
                        </li>
                    </ul>
                </li>
                <li>
                    <Normaltekst>{getMessage(intl, 'personopplysninger.text.2')}</Normaltekst>
                </li>
                <li>
                    <Normaltekst>{getMessage(intl, 'personopplysninger.text.3')}</Normaltekst>
                </li>
                <li>
                    <Normaltekst>
                        <FormattedMessage
                            id="personopplysninger.text.personvernerklering"
                            values={{
                                link: (
                                    <Lenke
                                        href={
                                            'https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/' +
                                            'Teknisk+brukerstotte/Snarveier/' +
                                            'personvernerkl%C3%A6ring-for-arbeids-og-velferdsetaten'
                                        }
                                        target="_blank"
                                    >
                                        <FormattedMessage id="personopplysninger.text.personvernerklering.link" />
                                    </Lenke>
                                )
                            }}
                        />
                    </Normaltekst>
                </li>
            </ul>
        </div>
    );
};
export default injectIntl(Personopplysninger);

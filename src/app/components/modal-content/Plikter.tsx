import * as React from 'react';
const { FormattedMessage, injectIntl } = require('react-intl');
const { Undertittel, Normaltekst } = require('nav-frontend-typografi');
import getMessage from '../../util/i18n/i18nUtils';
import Lenke from 'nav-frontend-lenker';

import './modalContent.less';
import InjectedIntl = ReactIntl.InjectedIntl;

interface Props {
    intl: InjectedIntl;
}

const Plikter: React.StatelessComponent<Props> = ({ intl }) => (
    <div className="modalContent">
        <Undertittel className="modalContent__header">{getMessage(intl, 'rettigheter.sectionheading')}</Undertittel>
        <ul>
            <li>
                <Normaltekst>{getMessage(intl, 'rettigheter.text.2')}</Normaltekst>
            </li>
            <li>
                <Normaltekst>
                    <FormattedMessage
                        id="rettigheter.text.lestOgForstått"
                        values={{
                            link: (
                                <Lenke href="https://nav.no/rettOgPlikt" target="_blank">
                                    <FormattedMessage id="rettigheter.text.lestOgForstått.link" />
                                </Lenke>
                            )
                        }}
                    />
                </Normaltekst>
            </li>
        </ul>
    </div>
);

export default injectIntl(Plikter);

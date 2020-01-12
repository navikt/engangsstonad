import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntl } from 'react-intl';
const { Undertittel, Normaltekst } = require('nav-frontend-typografi');
import getMessage from 'common/util/i18nUtils';
import Lenke from 'nav-frontend-lenker';
import { lenker } from 'util/lenker';

import './modalContent.less';

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
                                <Lenke href={lenker.plikter} target="_blank">
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

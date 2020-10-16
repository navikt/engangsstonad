import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
const { Undertittel, Normaltekst } = require('nav-frontend-typografi');
import getMessage from 'common/util/i18nUtils';
import Lenke from 'nav-frontend-lenker';
import { lenker } from 'util/lenker';

import './modalContent.less';

const Plikter = () => {
    const intl = useIntl();
    return (
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
                                ),
                            }}
                        />
                    </Normaltekst>
                </li>
            </ul>
        </div>
    );
};

export default Plikter;

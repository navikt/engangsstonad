import * as React from 'react';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import getMessage from 'common/util/i18nUtils';
import { lenker } from 'util/lenker';

import './modalContent.less';

const Plikter: React.StatelessComponent<WrappedComponentProps> = ({ intl }) => (
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

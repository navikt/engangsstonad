import * as React from 'react';

const { injectIntl, intlShape } = require('react-intl');
const { Undertittel, Normaltekst } = require('nav-frontend-typografi');
import getMessage from '../../util/i18n/i18nUtils';

import './modalContent.less';
import InjectedIntl = ReactIntl.InjectedIntl;

interface Props {
    intl: InjectedIntl;
}

const OmTerminbekreftelsen: React.StatelessComponent<Props> = ({ intl }) => (
    <div className="modalContent">
        <Undertittel className="modalContent__header">
            {getMessage(intl, 'terminbekreftelsen.sectionheading')}
        </Undertittel>
        <Normaltekst className="modalContent__paragraph">
            {getMessage(intl, 'terminbekreftelsen.text.terminbekreftelsen')}
        </Normaltekst>
    </div>
);

OmTerminbekreftelsen.propTypes = {
    intl: intlShape.isRequired
};
export default injectIntl(OmTerminbekreftelsen);

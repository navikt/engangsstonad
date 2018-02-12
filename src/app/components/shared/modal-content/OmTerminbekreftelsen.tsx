import * as React from 'react';

const { injectIntl, intlShape } = require('react-intl');
const { Undertittel, Normaltekst } = require('nav-frontend-typografi');
import getMessage from '../../../util/i18n';

import './modalContent.less';

interface Props {
    intl: object;
}

const OmTerminbekreftelsen: React.StatelessComponent<Props> = ({ intl }) => (
    <div className="modalContent">
        <Undertittel className="modalContent__header">
            {getMessage(intl, 'terminbekreftelsen.sectionheading.terminbekreftelsen')}
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

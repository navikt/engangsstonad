import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import getMessage from '../../../util/i18n';
import './modalContent.less';

const OmTerminbekreftelsen = ({ intl }) => (
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

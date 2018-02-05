import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
import getMessage from '../../intl/util';
import './modalContent.less';

const OmTerminbekreftelsen = ({ intl }) => (
	<div className="modalContent">
		<Undertittel className="modalContent__header">
			{getMessage(intl, 'terminbekrefelsen.sectionheading.terminbekrefelsen')}
		</Undertittel>
		<Normaltekst className="modalContent__paragraph">
			{getMessage(intl, 'terminbekrefelsen.text.terminbekrefelsen')}
		</Normaltekst>
	</div>
);

OmTerminbekreftelsen.propTypes = {
	intl: intlShape.isRequired
};
export default injectIntl(OmTerminbekreftelsen);

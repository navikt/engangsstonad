import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';

import { FormattedMessage } from 'react-intl';

export const Step5 = () => (
	<div>
		<Normaltekst>
			<FormattedMessage
				id="kvittering.sectionheading.innsendtInfo"
				values={{
					'0': 'klokkeslett',
					'1': 'dato',
					linkText: (
						<Lenke href="#">
							<FormattedMessage id="kvittering.sectionheading.innsendtInfo.linkText" />
						</Lenke>
					)
				}}
			/>
		</Normaltekst>
	</div>
);
export default Step5;

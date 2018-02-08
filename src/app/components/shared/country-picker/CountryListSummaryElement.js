import React from 'react';
import PropTypes from 'prop-types';
import countries from 'i18n-iso-countries';
import { injectIntl, intlShape } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { ISODateToMaskedInput } from '../../../util/date';
import getMessage from '../../../util/i18n/index';
import './countryPicker.less';

const CountryListSummaryElement = (props) => {
	const { land, startDato, sluttDato } = props.visit;

	return (
		<div className="countrySummaryElement">
			<span
				className={`countrySummaryElement__flagIcon flag-icon flag-icon-${land.toLowerCase()}`}
			/>
			<div className="countrySummaryElement__textWrapper">
				<Normaltekst className="countrySummaryElement__country">
					{countries.getName(land, 'nb')}
				</Normaltekst>
				<Normaltekst className="countrySummaryElement__date">
					{getMessage(props.intl, 'standard.text.fromTo', {
						from: ISODateToMaskedInput(startDato),
						to: ISODateToMaskedInput(sluttDato)
					})}
				</Normaltekst>
			</div>
		</div>
	);
};

CountryListSummaryElement.propTypes = {
	visit: PropTypes.shape({
		land: PropTypes.string,
		startDato: PropTypes.string,
		sluttDato: PropTypes.string
	}).isRequired,
	intl: intlShape.isRequired
};
export default injectIntl(CountryListSummaryElement);

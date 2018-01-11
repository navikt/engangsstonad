import React from 'react';
import PropTypes from 'prop-types';
import { Normaltekst } from 'nav-frontend-typografi';
import Icon from 'nav-frontend-ikoner-assets';
import { ISODateToMaskedInput } from '../../../util/date';
import './countryPicker.less';

const CountryListElement = (props) => {
	const { country, startDate, endDate } = props.visit;

	return (
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
			id="helediv"
			className="skjemaelement__input countryElement"
			onClick={() => props.onEditClick(props.visit)}>
			<Normaltekst className="countryElement__country">{country}</Normaltekst>
			<Normaltekst className="countryElement__date">
				{ISODateToMaskedInput(startDate)} - {ISODateToMaskedInput(endDate)}
			</Normaltekst>
			<button
				type="button"
				className="js-toggle countryElement__toggleDayPicker"
				onClick={(e) => {
					e.stopPropagation();
					props.onDeleteClick(props.visit);
				}}>
				<Icon kind="trashcan" size={20} />
			</button>
		</div>
	);
};

CountryListElement.propTypes = {
	visit: PropTypes.shape({
		country: PropTypes.string,
		startDate: PropTypes.string,
		endDate: PropTypes.string
	}).isRequired,
	onDeleteClick: PropTypes.func.isRequired,
	onEditClick: PropTypes.func.isRequired
};
export default CountryListElement;

import React from 'react';
import PropTypes from 'prop-types';

import { Normaltekst } from 'nav-frontend-typografi';
import Icon from 'nav-frontend-ikoner-assets';
import { ISODateToMaskedInput } from '../../../util/date/dateUtils';
import './countryPicker.less';

const CountryListElement = (props) => {
	const { land, startDato, sluttDato } = props.visit;
	return (
		<div // eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
			id="helediv"
			className="countryElement"
			onClick={() => props.onEditClick(props.visit)}>
			<span className={`flag-icon flag-icon-${land.toLowerCase()}`} />
			<Normaltekst className="countryElement__date">
				{ISODateToMaskedInput(startDato)} - {ISODateToMaskedInput(sluttDato)}
			</Normaltekst>
			<button
				type="button"
				className="js-toggle countryElement__deleteButton"
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
		land: PropTypes.string,
		startDato: PropTypes.string,
		sluttDato: PropTypes.string
	}).isRequired,
	onDeleteClick: PropTypes.func.isRequired,
	onEditClick: PropTypes.func.isRequired
};
export default CountryListElement;

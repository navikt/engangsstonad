import React from 'react';
import PropTypes from 'prop-types';
import CountryListElement from './CountryListElement';
import './countryPicker.less';

const renderCountryListElement = ({ visits, onEditClick, onDeleteClick }) =>
	visits.map((visit, index) => (
		<CountryListElement
			key={visit.startDate.concat(index)}
			visit={visit}
			tabIndex={0}
			onEditClick={() => onEditClick(visit)}
			onDeleteClick={() => onDeleteClick(visit)}
		/>
	));

const CountryList = (props) => (
	<div>{props.visits && renderCountryListElement(props)}</div>
);

CountryList.propTypes = {
	visits: PropTypes.arrayOf(
		PropTypes.shape({
			country: PropTypes.string,
			startDate: PropTypes.string,
			endDate: PropTypes.string
		})
	)
};

CountryList.defaultProps = {
	visits: []
};

export default CountryList;

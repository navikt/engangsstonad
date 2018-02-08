import React from 'react';
import PropTypes from 'prop-types';
import CountryListElement from './CountryListElement';
import CountryListSummaryElement from './CountryListSummaryElement';
import './countryPicker.less';

const renderCountryListElement = ({ visits, onEditClick, onDeleteClick }) =>
	visits.map((visit, index) => (
		<CountryListElement
			key={visit.startDato.concat(index)}
			visit={visit}
			tabIndex={0}
			onEditClick={() => onEditClick(visit)}
			onDeleteClick={() => onDeleteClick(visit)}
		/>
	));

const renderCountryListSummaryElement = ({ visits }) =>
	visits.map((visit, index) => (
		<CountryListSummaryElement
			key={visit.startDato.concat(index)}
			visit={visit}
			tabIndex={0}
		/>
	));

const CountryList = (props) => {
	if (props.type === 'oppsummering') {
		return <div>{props.visits && renderCountryListSummaryElement(props)}</div>;
	}
	return <div>{props.visits && renderCountryListElement(props)}</div>;
};

CountryList.propTypes = {
	type: PropTypes.string,
	visits: PropTypes.arrayOf(
		PropTypes.shape({
			country: PropTypes.string,
			startDate: PropTypes.string,
			endDate: PropTypes.string
		})
	)
};

CountryList.defaultProps = {
	type: 'editable',
	visits: []
};

export default CountryList;

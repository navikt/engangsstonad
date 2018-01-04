import React from 'react';
import PropTypes from 'prop-types';

import { Checkbox } from 'nav-frontend-skjema';

import DisplayTextWithLabel from '../display-text-with-label/DisplayTextWithLabel';
import './checkboxWithLine.less';

const CheckboxWithLine = (props) => {
	const renderTexts = () =>
		props.content.map((entry, index) => (
			<DisplayTextWithLabel
				{...entry}
				// eslint-disable-next-line react/no-array-index-key
				key={`${entry.label}-${index}`}
			/>
		));

	return (
		<div className="checkboxWithLine">
			<Checkbox label="" />
			<div className="checkboxWithLine__content">{renderTexts()}</div>
		</div>
	);
};

CheckboxWithLine.propTypes = {
	content: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default CheckboxWithLine;

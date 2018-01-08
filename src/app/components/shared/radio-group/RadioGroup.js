import React from 'react';
import PropTypes from 'prop-types';

import { Radio, SkjemaGruppe } from 'nav-frontend-skjema';

import './radioGroup.less';

const RadioGroup = (props) => (
	<SkjemaGruppe className="radioGroup">
		{props.listOfRadioData.map((radioData) => (
			<Radio
				className="radioGroup__radioButton"
				key={radioData.value}
				name={props.name}
				{...radioData}
			/>
		))}
	</SkjemaGruppe>
);

RadioGroup.propTypes = {
	name: PropTypes.string.isRequired,
	listOfRadioData: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default RadioGroup;

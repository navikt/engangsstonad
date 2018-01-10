import React from 'react';
import { Select } from 'nav-frontend-skjema';

import DateInput from './../date-input/DateInput';

import './countryPicker.less';

const CountryPicker = () => (
	<div>
		<Select label="">
			<option value="" />
			<option value="marshalloyene">Marshalløyene</option>
		</Select>
		<div className="dateWrapper">
			<DateInput
				id="termindato"
				input={{ value: '' }}
				label="fra den.."
				onChange={(e) => console.log(e)}
				errorMessage=""
			/>
			<DateInput
				id="termindato"
				input={{ value: '' }}
				label="fra den.."
				onChange={(e) => console.log(e)}
				errorMessage=""
			/>
		</div>
	</div>
);

export default CountryPicker;

import React from "react";

import { Element } from "nav-frontend-typografi";
import { Select } from "nav-frontend-skjema";

import DateInput from "./../date-input/DateInput";

import "./countryPicker.less";

const CountryPicker = () => (
	<div>
		<Select label="">
			<option value="" />
			<option value="marshalloyene">Marshalløyene</option>
		</Select>
		<div className="dateWrapper">
			<DateInput label={<Element>fra den...</Element>} />
			<DateInput label={<Element>til den...</Element>} />
		</div>
	</div>
);

export default CountryPicker;

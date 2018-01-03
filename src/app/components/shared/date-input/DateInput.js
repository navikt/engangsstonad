import React from "react";
import PropTypes from "prop-types";

import { Input } from "nav-frontend-skjema";

const DateInput = (props) => (
	<Input
		className={props.className}
		inputClassName="dateInput"
		placeholder="dd.mm.yyyy"
		label={props.label}
		bredde="S"
		onChange={props.onChange}
	/>
);

DateInput.propTypes = {
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	onChange: PropTypes.func
};

DateInput.defaultProps = {
	className: "",
	onChange: () => undefined
};

export default DateInput;

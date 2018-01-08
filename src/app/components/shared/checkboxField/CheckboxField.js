import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';

import './checkboxField.less';

export const Checkbox = (props) => {
	const { checked, type, ...other } = props;
	return (
		<NavCheckbox
			className={classNames('checkboxField', `checkboxField--${type}`, {
				'checkboxField--checked': checked,
				'checkboxField--unchecked': !checked
			})}
			checked={checked}
			{...other}
		/>
	);
};

Checkbox.propTypes = {
	className: PropTypes.string,
	checked: PropTypes.bool,
	type: PropTypes.oneOf(['info', 'confirm'])
};

Checkbox.defaultProps = {
	className: undefined,
	checked: undefined,
	type: 'info'
};

export default Checkbox;

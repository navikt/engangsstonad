import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';

import './checkbox.less';

export const Checkbox = (props) => {
	const { className, checked, ...other } = props;

	return (
		<NavCheckbox
			className={classNames('checkboxField', className, {
				checkboxField__success: checked,
				checkboxField__info: !checked
			})}
			checked={checked}
			{...other}
		/>
	);
};

Checkbox.propTypes = {
	className: PropTypes.string,
	checked: PropTypes.bool
};

Checkbox.defaultProps = {
	className: undefined,
	checked: undefined
};

export default Checkbox;

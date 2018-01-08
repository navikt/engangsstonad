import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';

import './checkbox.less';

export const Checkbox = (props) => {
	const { className, checked, type, ...other } = props;

	return (
		<NavCheckbox
			className={classNames('checkbox', className, {
				checkbox__success: type === 'confirmation' && checked,
				checkbox__info: type === 'confirmation' && !checked,
				checkbox__normal: type === 'normal' && checked
			})}
			checked={checked}
			{...other}
		/>
	);
};

Checkbox.propTypes = {
	className: PropTypes.string,
	checked: PropTypes.bool,
	type: PropTypes.string
};

Checkbox.defaultProps = {
	className: undefined,
	checked: undefined,
	type: 'normal'
};

export default Checkbox;

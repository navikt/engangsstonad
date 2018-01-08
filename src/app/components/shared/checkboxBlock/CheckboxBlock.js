import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';

import './checkboxBlock.less';

export const CheckboxBlock = (props) => {
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

CheckboxBlock.propTypes = {
	checked: PropTypes.bool,
	type: PropTypes.oneOf(['info', 'confirm'])
};

CheckboxBlock.defaultProps = {
	checked: undefined,
	type: 'info'
};

export default CheckboxBlock;

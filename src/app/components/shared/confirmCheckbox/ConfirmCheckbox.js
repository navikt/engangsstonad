import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';

import './confirmCheckbox.less';

export const Checkbox = (props) => {
	const { checked, ...other } = props;

	return (
		<NavCheckbox
			className={classNames('confirmCheckbox', {
				'confirmCheckbox--checked': checked,
				'confirmCheckbox--unchecked': !checked
			})}
			checked={checked}
			{...other}
		/>
	);
};

Checkbox.propTypes = {
	checked: PropTypes.bool
};

Checkbox.defaultProps = {
	checked: undefined
};

export default Checkbox;

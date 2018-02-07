import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Normaltekst } from 'nav-frontend-typografi';
import { Checkbox as NavCheckbox } from 'nav-frontend-skjema';
import './confirmCheckbox.less';

export const Checkbox = (props) => {
	const { checked, labelHeader, ...other } = props;

	return (
		<div
			className={classNames('confirmCheckbox', {
				'confirmCheckbox--checked': checked,
				'confirmCheckbox--unchecked': !checked
			})}>
			{labelHeader && (
				<Normaltekst className="confirmCheckbox__text">
					{labelHeader}
				</Normaltekst>
			)}
			<NavCheckbox checked={checked} {...other} />
		</div>
	);
};

Checkbox.propTypes = {
	checked: PropTypes.bool,
	labelHeader: PropTypes.node
};

Checkbox.defaultProps = {
	checked: undefined,
	labelHeader: ''
};

export default Checkbox;

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import infoIcon from 'assets/svg/employee_nautral.svg';
import alertIcon from 'assets/svg/employee_sad.svg';
import warningIcon from 'assets/svg/employee_warning.svg';
import successIcon from 'assets/svg/employee_happy.svg';
import CustomSVG from '../custom-svg/CustomSVG';

import './dialogBox.less';

const getIcon = (type) => {
	switch (type) {
		case 'success':
			return successIcon;
		case 'alert':
			return alertIcon;
		case 'warning':
			return warningIcon;
		default:
			return infoIcon;
	}
};

const getClassnames = (type, overflow) =>
	classNames('dialogBox', {
		'dialogBox--info': type === 'info',
		'dialogBox--alert': type === 'alert',
		'dialogBox--warning': type === 'warning',
		'dialogBox--success': type === 'success',
		'dialogBox--overflow': overflow === true
	});

const DialogBoxBase = (props) => {
	const { type, overflow } = props;

	return (
		<div className={getClassnames(type, overflow)}>
			<CustomSVG
				className="dialogBox__image"
				iconRef={getIcon(type)}
				size={96}
			/>
			<div className="dialogBox__text">{props.children}</div>
		</div>
	);
};

DialogBoxBase.propTypes = {
	type: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node)
	]).isRequired,
	overflow: PropTypes.bool
};

DialogBoxBase.defaultProps = {
	type: '',
	overflow: false
};

const DialogBox = (props) => <DialogBoxBase {...props} />;

export default DialogBox;

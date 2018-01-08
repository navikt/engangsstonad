import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Radio } from 'nav-frontend-skjema';
import './transformingRadioGroup.less';

export default class TransformingRadioGroup extends Component {
	radioGroupClsNames() {
		return classNames('transformingRadioGroup', {
			'transformingRadioGroup--expanded': this.props.expanded === true,
			'transformingRadioGroup--collapsed': this.props.collapsed === true
		});
	}

	render() {
		const { legend, name, radios } = this.props.stage;
		return (
			<div className={this.radioGroupClsNames()}>
				<legend>{legend}</legend>
				{radios.map((radioAttrs) => (
					<Radio
						key={radioAttrs.value}
						name={name}
						onClick={($e) => {
							this.props.onClick($e, radioAttrs.value);
						}}
						{...radioAttrs}
					/>
				))}
			</div>
		);
	}
}

TransformingRadioGroup.propTypes = {
	collapsed: PropTypes.bool,
	expanded: PropTypes.bool,
	stage: PropTypes.shape({
		legend: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		radios: PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired
			}).isRequired
		).isRequired
	}).isRequired,
	onClick: PropTypes.func
};

TransformingRadioGroup.defaultProps = {
	onClick: () => {},
	collapsed: false,
	expanded: false
};

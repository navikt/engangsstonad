import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Radio } from 'nav-frontend-skjema';
import './transformingRadioGroup.less';

export default class TransformingRadioGroup extends Component {
	radioGroupClsNames() {
		return classNames('transformingRadioGroup', {
			'transformingRadioGroup--expanded': this.props.expanded === true
		});
	}

	render() {
		const { legend, name, radios } = this.props;
		return (
			<div className={this.radioGroupClsNames()}>
				<legend>{legend}</legend>
				{radios.map((radioAttrs) => (
					<Radio {...radioAttrs} key={radioAttrs.value} name={name} />
				))}
			</div>
		);
	}
}

TransformingRadioGroup.propTypes = {
	expanded: PropTypes.bool,
	legend: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	radios: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired
		}).isRequired
	).isRequired
};

TransformingRadioGroup.defaultProps = {
	expanded: false
};

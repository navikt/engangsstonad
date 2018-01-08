import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransformingRadioGroup from './../transforming-radio-group/TransformingRadioGroup';

// eslint-disable-next-line react/prefer-stateless-function
export default class TransformingRadioGroupCollection extends Component {
	render() {
		return (
			<div className="transformingRadioGroupCollection">
				{this.props.stages.map((stage) => (
					<TransformingRadioGroup {...stage} key={stage.name} />
				))}
			</div>
		);
	}
}

TransformingRadioGroupCollection.propTypes = {
	stages: PropTypes.arrayOf(
		PropTypes.shape({
			expanded: PropTypes.bool,
			legend: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			radios: PropTypes.arrayOf(
				PropTypes.shape({
					label: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired
				}).isRequired
			).isRequired
		})
	)
};

TransformingRadioGroupCollection.defaultProps = {
	stages: [
		{
			name: 'whenInTime',
			legend: 'Søknaden gjelder en fødsel som er...',
			expanded: true,
			radios: [
				{ label: 'frem i tid', value: 'ahead' },
				{ label: 'tilbake i tid', value: 'before' }
			]
		},
		{
			name: 'numberOfExpected',
			legend: 'og jeg venter...',
			radios: [
				{ label: 'ett barn', value: '1' },
				{ label: 'tvillinger', value: '2' },
				{ label: 'flere barn', value: '3' }
			]
		}
	]
};

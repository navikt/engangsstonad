import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import renderChildRoutes from 'util/routing';

import StepBasedForm from 'shared/step-based-form/StepBasedForm';
import { getDataRequested } from 'ducks/Engangsstonad.duck';

import './engangsstonad.less';

const steps = [
	{
		title: 'Skal fjernes fra søknadsdialog',
		label: '1'
	},
	{
		title: 'Relasjon til barn',
		label: '2'
	},
	{
		title: 'Tilknytning til Norge',
		label: '3'
	},
	{
		title: 'Oppsummering og godkjenning av søknadsinformasjon',
		label: '4'
	},
	{
		title: 'Skal fjernes fra søknadsdialog',
		label: '5'
	},
	{
		title: 'Skal fjernes fra søknadsdialog',
		label: '6'
	}
];

// eslint-disable-next-line react/prefer-stateless-function
export class EngangsstonadIndex extends React.Component {
	componentWillMount() {
		this.props.dispatch(getDataRequested());
	}

	render() {
		return (
			<div className="engangsstonad">
				<StepBasedForm
					nextButtonEnabled
					routes={renderChildRoutes(this.props.routes) || []}
					title="Søknad om engangsstønad"
					location={this.props.location}
					steps={steps}
					withStepIndicator
				/>
				{this.props.data && <div>Data: {JSON.stringify(this.props.data)}</div>}
				{this.props.error && (
					<div>Error getting data: {JSON.stringify(this.props.error)}</div>
				)}
			</div>
		);
	}
}

EngangsstonadIndex.propTypes = {
	routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	location: PropTypes.shape({}).isRequired,
	dispatch: PropTypes.func.isRequired,
	data: PropTypes.shape({}),
	error: PropTypes.shape({})
};

EngangsstonadIndex.defaultProps = {
	data: null,
	error: null
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data,
	error: state.engangsstonadReducer.error
});

export default connect(mapStateToProps)(EngangsstonadIndex);

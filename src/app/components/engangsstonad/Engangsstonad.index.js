import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import renderChildRoutes from 'util/routing';

import StepBasedForm from 'shared/step-based-form/StepBasedForm';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import { getDataRequested } from './../../redux/ducks/Engangsstonad.duck';

import VelkommenIllustration from '../../assets/svg/frontpage.svg';

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
		title: 'Oppsummering',
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

	// eslint-disable-next-line class-methods-use-this
	handleOnNextButtonClicked() {}

	render() {
		const title = 'Søknad om engangsstønad';
		return (
			<div className="engangsstonad">
				<StepBasedForm
					showStepper
					onNextButtonClicked={($e, route) =>
						this.handleOnNextButtonClicked($e, route)
					}
					routes={renderChildRoutes(this.props.routes) || []}
					title={title}
					location={this.props.location}
					steps={steps}
					withStepIndicator
					illustrations={{
						'0': (
							<HeaderIllustration
								dialog={{
									title: 'Hei Lise',
									text:
										'Jeg skal veilede deg gjennom søknaden. Vi har tre steg vi skal gjennom.'
								}}
								title={title}
								svg={VelkommenIllustration}
							/>
						)
					}}
				/>
				{this.props.data && <div>Data: {JSON.stringify(this.props.data)}</div>}
			</div>
		);
	}
}

EngangsstonadIndex.propTypes = {
	routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	location: PropTypes.shape({}).isRequired,
	dispatch: PropTypes.func.isRequired,
	data: PropTypes.shape({})
};

EngangsstonadIndex.defaultProps = {
	data: null
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data
});

export default connect(mapStateToProps)(EngangsstonadIndex);

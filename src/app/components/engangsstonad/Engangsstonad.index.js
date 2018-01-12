import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import renderChildRoutes from 'util/routing';

import StepBasedForm from 'shared/step-based-form/StepBasedForm';
import { getDataRequested, activeRouteChanged } from 'actions';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
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
	formIsValidPOC() {
		return true;
	}

	handleOnNextButtonClicked($e, activeRoute, href) {
		if (this.formIsValidPOC()) {
			const nextRouteIndex =
				this.props.routes.findIndex(
					(route) => route.path === activeRoute.props.path
				) + 1;
			this.props.dispatch(
				activeRouteChanged(this.props.routes[nextRouteIndex])
			);
		}
		this.props.history.push(href);
	}

	render() {
		const title = 'Søknad om engangsstønad';
		return (
			<div className="engangsstonad">
				<StepBasedForm
					showStepper={this.props.showStepper}
					onNextButtonClicked={($e, route, href) =>
						this.handleOnNextButtonClicked($e, route, href)
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
	data: PropTypes.shape({}),
	showStepper: PropTypes.bool,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

EngangsstonadIndex.defaultProps = {
	data: null,
	showStepper: true
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data,
	showStepper: state.engangsstonadReducer.showStepper
});

export default withRouter(connect(mapStateToProps)(EngangsstonadIndex));

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryStringParser from 'query-string';
import { FormattedMessage } from 'react-intl';
import renderChildRoutes from 'util/routing';
import StepBasedForm from 'shared/step-based-form/StepBasedForm';
import { getDataRequested, activeRouteChanged } from 'actions';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import VelkommenIllustration from '../../assets/svg/frontpage.svg';
import './engangsstonad.less';

export class EngangsstonadIndex extends React.Component {
	constructor(props) {
		super(props);

		this.steps = [
			{
				title: <FormattedMessage id="relasjonBarn.text.fodselTidspunkt" />,
				label: '1'
			},
			{
				title: (
					<FormattedMessage id="relasjonBarn.sectionheading.relasjonBarn" />
				),
				label: '2'
			},
			{
				title: <FormattedMessage id="medlemmskap.sectionheading.medlemmskap" />,
				label: '3'
			},
			{
				title: (
					<FormattedMessage id="oppsummering.sectionheading.oppsummering" />
				),
				label: '4'
			},
			{
				title: '',
				label: '5'
			}
		];
	}

	componentWillMount() {
		const queryParams = this.getQueryParams();

		if (Object.keys(queryParams).length > 0) {
			this.props.dispatch(getDataRequested(queryParams));
		} else {
			this.props.dispatch(getDataRequested());
		}
	}

	getQueryParams() {
		return queryStringParser.parse(this.props.location.search);
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

	// eslint-disable-next-line class-methods-use-this
	renderIllustration(title, text, theme) {
		return (
			<HeaderIllustration
				dialog={{ title, text }}
				svg={VelkommenIllustration}
				theme={theme || 'purple'}
				title={<FormattedMessage id="intro.pageheading.soknadES" />}
			/>
		);
	}

	render() {
		if (this.props.data) {
			const title = <FormattedMessage id="intro.pageheading.soknadES" />;
			const illustrations = {
				'0': this.renderIllustration(
					<FormattedMessage
						id="intro.snakkeboble.bruker"
						values={{ name: 'Kalle' }}
					/>,
					<FormattedMessage id="intro.text.hjelpedeg" />
				),
				'4': this.renderIllustration(
					<FormattedMessage id="kvittering.snakkeboble.overskrift" />,
					<FormattedMessage id="kvittering.sectionheading.soknadMottatt" />
				)
			};

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
						steps={this.steps}
						withStepIndicator
						illustrations={illustrations}
					/>
				</div>
			);
		}
		return <div className="engangsstonad" />;
	}
}

EngangsstonadIndex.propTypes = {
	routes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
	location: PropTypes.shape({
		search: PropTypes.string
	}).isRequired,
	dispatch: PropTypes.func.isRequired,
	data: PropTypes.shape({
		fornavn: PropTypes.string
	}),
	showStepper: PropTypes.bool,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

EngangsstonadIndex.defaultProps = {
	showStepper: true,
	data: null
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data,
	showStepper: state.engangsstonadReducer.showStepper
});

export default withRouter(connect(mapStateToProps)(EngangsstonadIndex));

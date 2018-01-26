import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { withRouter } from 'react-router-dom';
import queryStringParser from 'query-string';

import { Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import ConfirmCheckbox from 'shared/confirmCheckbox/ConfirmCheckbox';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import VelkommenIllustration from 'assets/svg/frontpage.svg';
import { getDataRequested, approveConditions } from 'actions';

import './engangsstonad.less';

export class EngangsstonadConfirmation extends Component {
	constructor(props) {
		super(props);

		this.handleConfirmCheckboxChange = this.handleConfirmCheckboxChange.bind(
			this
		);
		this.handleStartApplicationClick = this.handleStartApplicationClick.bind(
			this
		);
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

	handleConfirmCheckboxChange() {
		this.props.dispatch(approveConditions());
	}

	handleStartApplicationClick() {
		this.props.history.push('/engangsstonad/step1');
	}

	render() {
		const { data, approvedConditions } = this.props;

		if (!data) {
			return null;
		}

		return (
			<div className="engangsstonad">
				<DocumentTitle title="Samtykke - NAV Engangsstønad" />
				<HeaderIllustration
					dialog={{
						title: `Hei, ${this.props.data.fornavn}`,
						text: 'Jeg skal hjelpe deg med å fylle ut søknaden'
					}}
					svg={VelkommenIllustration}
					theme={'purple'}
					title="Søknad om engangsstønad"
				/>
				<Ingress>
					Engangsstønad er en skattefri engangssum du kan få for hvert barn du
					føder eller adopterer.
				</Ingress>
				<ConfirmCheckbox
					name="egenerklaring"
					label="Jeg bekrefter at jeg har lest og forstått mine rettigheter og plikter."
					onChange={this.handleConfirmCheckboxChange}
					checked={approvedConditions}
				/>
				<div className="engangsstonad__centerButton">
					<Hovedknapp
						onClick={this.handleStartApplicationClick}
						disabled={!approvedConditions}>
						Begynn med søknaden
					</Hovedknapp>
				</div>
			</div>
		);
	}
}

EngangsstonadConfirmation.propTypes = {
	approvedConditions: PropTypes.bool,
	dispatch: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	location: PropTypes.shape({
		search: PropTypes.string
	}).isRequired,
	data: PropTypes.shape({
		fornavn: PropTypes.string
	})
};

EngangsstonadConfirmation.defaultProps = {
	approvedConditions: false,
	data: undefined
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data,
	approvedConditions: state.engangsstonadReducer.approvedConditions
});

export default withRouter(connect(mapStateToProps)(EngangsstonadConfirmation));

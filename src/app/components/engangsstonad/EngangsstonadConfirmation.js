import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { withRouter } from 'react-router-dom';

import { Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import ConfirmCheckbox from 'shared/confirmCheckbox/ConfirmCheckbox';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import VelkommenIllustration from 'assets/svg/frontpage.svg';
import { approveConditions } from 'actions';

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

	handleConfirmCheckboxChange() {
		this.props.dispatch(approveConditions());
	}

	handleStartApplicationClick() {
		this.props.history.push('/engangsstonad/step1');
	}

	render() {
		const { approvedConditions } = this.props;
		return (
			<div className="engangsstonad">
				<DocumentTitle title="Samtykke - NAV Engangsstønad" />
				<HeaderIllustration
					dialog={{
						title: 'Hei, Test',
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
				<Hovedknapp onClick={this.handleStartApplicationClick}>
					Begynn med søknaden
				</Hovedknapp>
			</div>
		);
	}
}

EngangsstonadConfirmation.propTypes = {
	approvedConditions: PropTypes.bool,
	dispatch: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired
};

EngangsstonadConfirmation.defaultProps = {
	approvedConditions: false
};

const mapStateToProps = (state) => ({
	approvedConditions: state.engangsstonadReducer.approvedConditions
});

export default withRouter(connect(mapStateToProps)(EngangsstonadConfirmation));

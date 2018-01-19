import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import { Ingress } from 'nav-frontend-typografi';

import ConfirmCheckbox from 'shared/confirmCheckbox/ConfirmCheckbox';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import VelkommenIllustration from 'assets/svg/frontpage.svg';
import { approveConditions } from 'actions';

import './engangsstonad.less';

export class EngangsstonadConfirmation extends Component {
	constructor(props) {
		super(props);

		this.handleConfirmCheckboxChanged = this.handleConfirmCheckboxChanged.bind(
			this
		);
	}

	handleConfirmCheckboxChanged() {
		this.props.dispatch(approveConditions());
	}

	render() {
		const { approvedConditions } = this.props;
		return (
			<div className="engangsstonad">
				<HeaderIllustration
					dialog={{
						title: 'test',
						text: 'Jeg skal hjelpe deg med å fylle ut søknaden'
					}}
					svg={VelkommenIllustration}
					theme={'purple'}
					title="Søknad om engangsstønad"
				/>
				<DocumentTitle title="Samtykke - NAV Engangsstønad" />
				<Ingress>
					Engangsstønad er en skattefri engangssum du kan få for hvert barn når
					du ikke har rett på foreldrepenger.
				</Ingress>
				<ConfirmCheckbox
					name="egenerklaring"
					label="Jeg har lest og forstått mine rettigheter og plikter."
					onChange={this.handleConfirmCheckboxChanged}
					checked={approvedConditions}
				/>
			</div>
		);
	}
}

EngangsstonadConfirmation.propTypes = {
	approvedConditions: PropTypes.bool,
	dispatch: PropTypes.func.isRequired
};

EngangsstonadConfirmation.defaultProps = {
	approvedConditions: false
};

const mapStateToProps = (state) => ({
	approvedConditions: state.engangsstonadReducer.approvedConditions
});

export default connect(mapStateToProps)(EngangsstonadConfirmation);

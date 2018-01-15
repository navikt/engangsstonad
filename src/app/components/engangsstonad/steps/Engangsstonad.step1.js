import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';

import { Ingress } from 'nav-frontend-typografi';

import ConfirmCheckbox from 'shared/confirmCheckbox/ConfirmCheckbox';
import { approveConditions } from 'actions';

// eslint-disable-next-line react/prefer-stateless-function
export class Step1 extends Component {
	render() {
		// eslint-disable-next-line no-shadow
		const { approveConditions, approvedConditions } = this.props;

		return (
			<div className="step1">
				<DocumentTitle title="NAV Engangsstønad - Samtykke" />
				<Ingress>
					Engangsstønad er en skattefri engangssum du kan få for hvert barn når
					du ikke har rett på foreldrepenger.
				</Ingress>
				<ConfirmCheckbox
					name="egenerklaring"
					label="Jeg har lest og forstått mine rettigheter og plikter."
					onChange={approveConditions}
					checked={approvedConditions}
				/>
			</div>
		);
	}
}

Step1.propTypes = {
	approvedConditions: PropTypes.bool,
	approveConditions: PropTypes.func.isRequired
};

Step1.defaultProps = {
	approvedConditions: false
};

const mapStateToProps = (state) => ({
	approvedConditions: state.engangsstonadReducer.approvedConditions
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			approveConditions
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Step1);

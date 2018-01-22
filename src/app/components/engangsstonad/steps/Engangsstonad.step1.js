import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Ingress } from 'nav-frontend-typografi';
import Modal from 'nav-frontend-modal';

import ConfirmCheckbox from 'shared/confirmCheckbox/ConfirmCheckbox';
import { approveConditions } from 'actions';
import RettigheterOgPlikter from 'shared/modal-content/RettigheterOgPlikter';

// eslint-disable-next-line react/prefer-stateless-function
export class Step1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};
	}

	componentDidMount() {
		Modal.setAppElement('#app');
	}

	openRettigheterOgPlikterModal(e) {
		e.preventDefault();
		this.setState({ isModalOpen: true });
	}

	closeRettigheterOgPlikterModal() {
		this.setState({ isModalOpen: false });
	}

	render() {
		// eslint-disable-next-line no-shadow
		const { approveConditions, approvedConditions } = this.props;

		return (
			<div className="step1">
				<DocumentTitle title="Samtykke - NAV Engangsstønad" />
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
				<Modal
					isOpen={this.state.isModalOpen}
					closeButton
					onRequestClose={() => this.closeRettigheterOgPlikterModal()}
					contentLabel="rettigheter og plikter">
					<RettigheterOgPlikter />
				</Modal>
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

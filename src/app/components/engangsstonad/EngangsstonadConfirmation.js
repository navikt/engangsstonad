import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { withRouter } from 'react-router-dom';
import queryStringParser from 'query-string';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';

import RettigheterOgPlikter from 'shared/modal-content/RettigheterOgPlikter';
import ConfirmCheckbox from 'shared/confirmCheckbox/ConfirmCheckbox';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import VelkommenIllustration from 'assets/svg/frontpage.svg';
import { getDataRequested, approveConditions } from 'actions';

import './engangsstonad.less';

export class EngangsstonadConfirmation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};

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

	openRettigheterOgPlikterModal(e) {
		e.preventDefault();
		this.setState({ isModalOpen: true });
	}

	closeRettigheterOgPlikterModal() {
		this.setState({ isModalOpen: false });
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
		const { data, approvedConditions, intl } = this.props;

		if (!data) {
			return null;
		}

		const confirmBoxLabel = () => (
			<FormattedMessage
				id="intro.text.samtykke"
				values={{
					link: (
						// eslint-disable-next-line jsx-a11y/anchor-is-valid
						<a href="#" onClick={(e) => this.openRettigheterOgPlikterModal(e)}>
							<FormattedMessage id="intro.text.samtykke.link" />
						</a>
					)
				}}
			/>
		);

		return (
			<div className="engangsstonad">
				<DocumentTitle title="Samtykke - NAV Engangsstønad" />
				<HeaderIllustration
					dialog={{
						title: intl.formatMessage(
							{ id: 'intro.snakkeboble.overskrift' },
							{ name: this.props.data.fornavn }
						),
						text: intl.formatMessage({ id: 'intro.text.hjelpedeg' })
					}}
					svg={VelkommenIllustration}
					theme={'purple'}
					title={intl.formatMessage({ id: 'intro.pageheading.soknadES' })}
				/>
				<Ingress>{intl.formatMessage({ id: 'intro.text.omES' })}</Ingress>
				<ConfirmCheckbox
					name="egenerklaring"
					label={confirmBoxLabel()}
					onChange={this.handleConfirmCheckboxChange}
					checked={approvedConditions}
				/>
				<div className="engangsstonad__centerButton">
					<Hovedknapp
						onClick={this.handleStartApplicationClick}
						disabled={!approvedConditions}>
						{intl.formatMessage({ id: 'intro.button.startSoknad' })}
					</Hovedknapp>
				</div>
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
	}),
	intl: intlShape.isRequired
};

EngangsstonadConfirmation.defaultProps = {
	approvedConditions: false,
	data: undefined
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data,
	approvedConditions: state.engangsstonadReducer.approvedConditions
});

const withIntl = injectIntl(EngangsstonadConfirmation);
export default withRouter(connect(mapStateToProps)(withIntl));

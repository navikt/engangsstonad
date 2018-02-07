import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import { Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';

import RettigheterOgPlikter from 'shared/modal-content/RettigheterOgPlikter';
import ConfirmCheckbox from 'shared/confirmCheckbox/ConfirmCheckbox';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import VelkommenIllustration from 'assets/svg/frontpage.svg';
import { approveConditions, toggleLanguage } from '../../redux/actions/actions';
import LanguageToggle from '../intl/LanguageToggle';
import getMessage from '../../util/i18n';

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

	openRettigheterOgPlikterModal(e) {
		e.preventDefault();
		this.setState({ isModalOpen: true });
	}

	closeRettigheterOgPlikterModal() {
		this.setState({ isModalOpen: false });
	}

	handleConfirmCheckboxChange() {
		this.props.dispatch(approveConditions());
	}

	handleStartApplicationClick() {
		this.props.history.push('/engangsstonad/step1');
	}

	toggleLanguage(languageCode) {
		this.props.dispatch(toggleLanguage(languageCode));
	}

	render() {
		const { data, approvedConditions, intl } = this.props;

		if (!data) {
			return null;
		}

		const confirmBoxLabelHeader = () => (
			<FormattedMessage
				id="intro.text.samtykkeIntro"
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
				<LanguageToggle
					language={this.props.language}
					toggleLanguage={(e) => this.toggleLanguage(e)}
				/>
				<HeaderIllustration
					dialog={{
						title: getMessage(intl, 'intro.snakkeboble.overskrift', {
							name: this.props.data.fornavn
						}),
						text: getMessage(intl, 'intro.text.hjelpedeg')
					}}
					svg={VelkommenIllustration}
					theme={'purple'}
					title={getMessage(intl, 'intro.pageheading.soknadES')}
				/>
				<Ingress>{getMessage(intl, 'intro.text.omES')}</Ingress>
				<ConfirmCheckbox
					name="egenerklaring"
					labelHeader={confirmBoxLabelHeader()}
					label={getMessage(intl, 'intro.text.samtykke')}
					onChange={this.handleConfirmCheckboxChange}
					checked={approvedConditions}
				/>
				<div className="engangsstonad__centerButton">
					<Hovedknapp
						onClick={this.handleStartApplicationClick}
						disabled={!approvedConditions}>
						{getMessage(intl, 'intro.button.startSoknad')}
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
	data: PropTypes.shape({
		fornavn: PropTypes.string
	}),
	intl: intlShape.isRequired,
	language: PropTypes.string.isRequired
};

EngangsstonadConfirmation.defaultProps = {
	approvedConditions: false,
	data: undefined
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data,
	approvedConditions: state.engangsstonadReducer.approvedConditions,
	language: state.engangsstonadReducer.language
});

const withIntl = injectIntl(EngangsstonadConfirmation);
export default withRouter(connect(mapStateToProps)(withIntl));

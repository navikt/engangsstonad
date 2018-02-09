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
import {
	apiActionCreators as api,
	commonActionCreators as common
} from '../../redux-ts/actions';
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

	componentWillMount() {
		const queryParams = this.getQueryParams();

		if (Object.keys(queryParams).length > 0) {
			this.props.dispatch(api.getPerson(queryParams));
		} else {
			this.props.dispatch(api.getPerson());
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
		const { godkjentVilkar } = this.props;
		this.props.dispatch(common.setGodkjentVilkar(!godkjentVilkar));
	}

	handleStartApplicationClick() {
		this.props.history.push('/engangsstonad/step1');
	}

	toggleLanguage(languageCode) {
		this.props.dispatch(common.setLanguage(languageCode));
	}

	render() {
		const { person, godkjentVilkar, intl } = this.props;

		if (!person) {
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
							name: this.props.person.fornavn
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
					checked={godkjentVilkar}
				/>
				<div className="engangsstonad__centerButton">
					<Hovedknapp
						onClick={this.handleStartApplicationClick}
						disabled={!godkjentVilkar}>
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
	godkjentVilkar: PropTypes.bool.isRequired,
	language: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired
	}).isRequired,
	location: PropTypes.shape({
		search: PropTypes.string
	}).isRequired,
	person: PropTypes.shape({
		fornavn: PropTypes.string
	}),
	intl: intlShape.isRequired
};

EngangsstonadConfirmation.defaultProps = {
	person: undefined
};

const mapStateToProps = (state) => ({
	person: state.apiReducer.person,
	godkjentVilkar: state.commonReducer.godkjentVilkar,
	language: state.commonReducer.language
});

const withIntl = injectIntl(EngangsstonadConfirmation);
export default withRouter(connect(mapStateToProps)(withIntl));

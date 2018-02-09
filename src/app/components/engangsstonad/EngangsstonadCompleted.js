import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import { Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import moment from 'moment';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import VelkommenIllustration from 'assets/svg/frontpage.svg';

import './engangsstonad.less';
import { apiActionCreators as api } from '../../redux/actions';

export class EngangsstonadCompleted extends React.Component {
	summaryText() {
		const { soknad } = this.props;
		return (
			<FormattedMessage
				id="kvittering.text.innsendtInfo"
				values={{
					0: moment(soknad.opprettet).format('HH:mm'),
					1: moment(soknad.opprettet).format('DD. MMMM YYYY'),
					linkText: (
						// eslint-disable-next-line jsx-a11y/anchor-is-valid
						<a href="#" onClick={(e) => this.openRettigheterOgPlikterModal(e)}>
							<FormattedMessage id="kvittering.text.innsendtInfo.linkText" />
						</a>
					)
				}}
			/>
		);
	}

	render() {
		const { intl, person } = this.props;

		if (!person) {
			return null;
		}

		return (
			<div className="engangsstonad">
				<DocumentTitle title="Kvittering - NAV Engangsstønad" />
				<HeaderIllustration
					dialog={{
						title: intl.formatMessage(
							{
								id: 'kvittering.snakkeboble.overskrift'
							},
							{ name: person.fornavn }
						),
						text: intl.formatMessage({ id: 'kvittering.text.soknadMottatt' })
					}}
					title={intl.formatMessage({ id: 'intro.pageheading.soknadES' })}
					svg={VelkommenIllustration}
					theme="purple"
				/>
				<Ingress>{this.summaryText()}</Ingress>
				<div className="engangsstonad__centerButton">
					<Hovedknapp>
						{intl.formatMessage({ id: 'kvittering.text.lukkVinduet' })}
					</Hovedknapp>
				</div>
			</div>
		);
	}
}

EngangsstonadCompleted.propTypes = {
	dispatch: PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	soknad: PropTypes.shape({}),
	person: PropTypes.shape({
		fornavn: PropTypes.string
	})
};

EngangsstonadCompleted.defaultProps = {
	person: null,
	soknad: {}
};

const mapStateToProps = (state) => ({
	person: state.apiReducer.person,
	soknad: state.apiReducer.soknad
});

const withIntl = injectIntl(EngangsstonadCompleted);
export default connect(mapStateToProps, null)(withIntl);

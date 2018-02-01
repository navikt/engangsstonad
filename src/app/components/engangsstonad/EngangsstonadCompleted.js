import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import { Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import VelkommenIllustration from 'assets/svg/frontpage.svg';

import './engangsstonad.less';

export const EngangsstonadCompleted = (props) => {
	const summaryText = () => (
		<FormattedMessage
			id="kvittering.text.innsendtInfo"
			values={{
				0: 'kl',
				1: 'dato',
				linkText: (
					// eslint-disable-next-line jsx-a11y/anchor-is-valid
					<a href="#" onClick={(e) => this.openRettigheterOgPlikterModal(e)}>
						<FormattedMessage id="kvittering.text.innsendtInfo.dittNav" />
					</a>
				)
			}}
		/>
	);

	const { intl } = props;
	return (
		<div className="engangsstonad">
			<DocumentTitle title="Kvittering - NAV Engangsstønad" />
			<HeaderIllustration
				dialog={{
					title: intl.formatMessage(
						{
							id: 'kvittering.snakkeboble.overskrift'
						},
						{ name: props.data.fornavn }
					),
					text: intl.formatMessage({ id: 'kvittering.text.soknadMottatt' })
				}}
				title="Søknad om engangsstønad"
				svg={VelkommenIllustration}
				theme="purple"
			/>
			<Ingress>{summaryText()}</Ingress>
			<div className="engangsstonad__centerButton">
				<Hovedknapp>
					{intl.formatMessage({ id: 'kvittering.text.lukkVinduet' })}
				</Hovedknapp>
			</div>
		</div>
	);
};

EngangsstonadCompleted.propTypes = {
	intl: intlShape.isRequired,
	data: PropTypes.shape({
		fornavn: PropTypes.string
	})
};

EngangsstonadCompleted.defaultProps = {
	data: null
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data,
	postReponse: state.engangsstonadReducer.postReponse
});

const withIntl = injectIntl(EngangsstonadCompleted);
export default connect(mapStateToProps, null)(withIntl);

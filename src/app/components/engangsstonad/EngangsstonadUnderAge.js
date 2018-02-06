import React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import { Ingress } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import HeaderIllustration from 'shared/header-illustration/HeaderIllustration';
import VelkommenIllustration from 'assets/svg/frontpage.svg';
import getMessage from '../intl/util';

import './engangsstonad.less';

export const EngangsstønadUnderAge = (props) => {
	const { intl } = props;

	return (
		<div className="engangsstonad">
			<DocumentTitle title="Kvittering - NAV Engangsstønad" />
			<HeaderIllustration
				dialog={{
					title: getMessage(intl, 'kvittering.snakkeboble.overskrift', {
						name: props.data.fornavn
					}),
					text: getMessage(intl, 'intro.text.under18')
				}}
				title={getMessage(intl, 'intro.pageheading.soknadES')}
				svg={VelkommenIllustration}
				theme="orange"
			/>
			<Ingress>{intl.formatMessage({ id: 'intro.text.omES' })}</Ingress>
			<a className="paperVersionLink" href="#">
				{getMessage(intl, 'intro.text.lastNedPapirsoknad')}
			</a>
			<div className="engangsstonad__centerButton">
				<Hovedknapp>
					{intl.formatMessage({ id: 'kvittering.text.lukkVinduet' })}
				</Hovedknapp>
			</div>
		</div>
	);
};

EngangsstønadUnderAge.propTypes = {
	intl: intlShape.isRequired,
	data: PropTypes.shape({
		fornavn: PropTypes.string
	})
};

EngangsstønadUnderAge.defaultProps = {
	data: undefined
};

const mapStateToProps = (state) => ({
	data: state.engangsstonadReducer.data,
	postReponse: state.engangsstonadReducer.postReponse
});

const withIntl = injectIntl(EngangsstønadUnderAge);
export default connect(mapStateToProps, null)(withIntl);

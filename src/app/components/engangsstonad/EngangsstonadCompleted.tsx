import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
const { Ingress } = require('nav-frontend-typografi');
import { Hovedknapp } from 'nav-frontend-knapper';
import * as moment from 'moment';
import HeaderIllustration, { Theme } from 'shared/header-illustration/HeaderIllustration';
const VelkommenIllustration = require('assets/svg/frontpage.svg').default;

import './engangsstonad.less';
import Person from '../../types/domain/Person';
import { EngangsstonadSoknadResponse } from '../../types/services/EngangsstonadSoknadResponse';

interface StateProps {
    person: Person;
    soknad: EngangsstonadSoknadResponse;
}

type Props = StateProps & InjectedIntlProps;
export class EngangsstonadCompleted extends React.Component<Props> {
    receiptText() {
        const { soknad } = this.props;
        return (
            <FormattedMessage
                id="kvittering.text.innsendtInfo"
                values={{
                    0: moment(soknad.opprettet).format('HH:mm'),
                    1: moment(soknad.opprettet).format('DD. MMMM YYYY'),
                    linkText: (
                        <a href="#">
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
                    theme={Theme.purple}
                />
                <Ingress>{this.receiptText()}</Ingress>
                <div className="engangsstonad__centerButton">
                    <Hovedknapp>{intl.formatMessage({ id: 'kvittering.text.lukkVinduet' })}</Hovedknapp>
                </div>
            </div>
        );

    }
}

// tslint:disable-next-line no-any
const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    soknad: state.apiReducer.soknad
});

export default connect(mapStateToProps, null)(injectIntl(EngangsstonadCompleted));

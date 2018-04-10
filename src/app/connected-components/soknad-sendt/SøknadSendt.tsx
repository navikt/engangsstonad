import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import * as moment from 'moment';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import CustomSVG from './../../components/custom-svg/CustomSVG';
import Lenke from 'nav-frontend-lenker';

const SpotlightLetter = require('assets/svg/spotlight_letter.svg').default;

import Person from '../../types/domain/Person';
import { EngangsstonadSoknadResponse } from '../../types/services/EngangsstonadSoknadResponse';

import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import getMessage from 'util/i18n/i18nUtils';

import 'nav-frontend-lenker-style';
import '../../styles/engangsstonad.less';

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
                id="kvittering.text.soknadMottatt"
                values={{
                    referansenr: 1,
                    0: moment(soknad.opprettet).format('HH:mm'),
                    1: moment(soknad.opprettet).format('DD. MMMM YYYY'),
                    linkText: (
                        <Lenke href="https://www.nav.no/no/Ditt+NAV">
                            <FormattedMessage id="kvittering.text.soknadMottatt.linkText" />
                        </Lenke>
                    )
                }}
            />
        );
    }

    render() {
        const { intl, person } = this.props;

        return (
            <div className="engangsstonad">
                <DocumentTitle title="Kvittering - NAV Engangsstønad" />
                <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
                <div className="responsiveContainer">
                    <CustomSVG iconRef={SpotlightLetter} className="spotlightLetter" />
                    <Innholdstittel className="blokk-s">
                        {getMessage(intl, 'kvittering.text.takk', {
                            navn: person.fornavn
                        })}
                    </Innholdstittel>
                    <Ingress>{this.receiptText()}</Ingress>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    soknad: state.apiReducer.soknad
});

export default connect<StateProps>(mapStateToProps)(injectIntl(EngangsstonadCompleted));

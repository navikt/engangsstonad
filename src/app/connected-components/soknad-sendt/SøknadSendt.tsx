import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import * as moment from 'moment';
import 'moment/locale/nb';
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
    kvittering: EngangsstonadSoknadResponse;
}

type Props = StateProps & InjectedIntlProps;

class SøknadSendt extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        moment.locale('nb');
    }

    componentDidMount() {
        setTimeout(() => (window as any).hj('trigger', 'es_kvittering_feedback'), 5000);
    }

    receiptText() {
        const { kvittering } = this.props;
        return (
            <FormattedMessage
                id="kvittering.text.soknadMottatt"
                values={{
                    referansenr: kvittering.referanseId,
                    0: moment(kvittering.mottattDato).format('HH:mm'),
                    1: moment(kvittering.mottattDato).format('LL'),
                    dittNavLink: (
                        <Lenke href="https://tjenester.nav.no/saksoversikt/">
                            <FormattedMessage id="kvittering.text.soknadMottatt.dittNavLink" />
                        </Lenke>
                    )
                }}
            />
        );
    }

    bankAccountText() {
        const { bankkonto } = this.props.person;
        return (
            <FormattedMessage
                id="kvittering.text.kontonummer"
                values={{
                    kontonummer: bankkonto.kontonummer,
                    dinProfilLink: (
                        <Lenke href="https://tjenester.nav.no/saksoversikt/">
                            <FormattedMessage id="kvittering.text.soknadMottatt.dinProfilLink" />
                        </Lenke>
                    )
                }}
            />
        );
    }

    render() {
        const { intl, person } = this.props;
        const { kontonummer } = person.bankkonto;

        return (
            <div className="engangsstonad">
                <DocumentTitle title={getMessage(intl, 'kvittering.sectionheading')} />
                <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
                <div className="responsiveContainer">
                    <CustomSVG iconRef={SpotlightLetter} className="spotlightLetter" />
                    <Innholdstittel className="blokk-s">
                        {getMessage(intl, 'kvittering.text.takk')}
                        <span className="capitalizeName"> {person.fornavn.toLowerCase()}!</span>
                    </Innholdstittel>
                    <Ingress>
                        {this.receiptText()}
                        {kontonummer && this.bankAccountText()}
                    </Ingress>
                    <Hovedknapp
                        className="responsiveButton responsiveButton--søknadSendt"
                        onClick={() => (window as any).location = 'https://tjenester.nav.no/dittnav/oversikt'}
                    >
                        {getMessage(intl, 'kvittering.text.soknadMottatt.avsluttText')}
                    </Hovedknapp>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.apiReducer.person,
    kvittering: state.apiReducer.kvittering
});

export default connect<StateProps>(mapStateToProps)(injectIntl(SøknadSendt));

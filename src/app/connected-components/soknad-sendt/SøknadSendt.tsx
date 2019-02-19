import * as React from 'react';
import 'moment/locale/nb';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import * as moment from 'moment';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';

import CustomSVG from 'common/components/custom-svg/CustomSVG';
import getMessage from 'util/i18n/i18nUtils';
import Kvittering from 'app/types/services/Kvittering';
import Person from '../../types/domain/Person';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';

import 'nav-frontend-lenker-style';
import '../../styles/engangsstonad.less';

const SpotlightLetter = require('assets/svg/spotlight_letter.svg').default;

interface StateProps {
    person: Person;
    kvittering: Kvittering;
}

type Props = StateProps & InjectedIntlProps;

class SøknadSendt extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        moment.locale('nb');
    }

    componentDidMount() {
        setTimeout(() => {
            if ((window as any).hj) {
                (window as any).hj('trigger', 'es_kvittering_feedback');
            }
        },         5000);
    }

    receiptText() {
        const { kvittering } = this.props;
        return kvittering.saksNr ? (
            <FormattedMessage
                id="kvittering.text.soknadMottattMedSaksnummer"
                values={{
                    klokkeslett: moment(kvittering.mottattDato).format('HH:mm'),
                    dato: moment(kvittering.mottattDato).format('LL'),
                    saksNr: kvittering.saksNr
                }}
            />
        ) : (
            <FormattedMessage
                id="kvittering.text.soknadMottatt"
                values={{
                    klokkeslett: moment(kvittering.mottattDato).format('HH:mm'),
                    dato: moment(kvittering.mottattDato).format('LL')
                }}
            />
        );
    }

    bankAccountText(kontonummer: string) {
        return (
            <FormattedMessage
                id="kvittering.text.kontonummer"
                values={{
                    kontonummer: kontonummer,
                    dinProfilLink: (
                        <Lenke href="https://tjenester.nav.no/brukerprofil/">
                            <FormattedMessage id="kvittering.text.soknadMottatt.dinProfilLink" />
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
                <DocumentTitle title={getMessage(intl, 'kvittering.sectionheading')} />
                <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
                <div className="responsiveContainer">
                    <CustomSVG iconRef={SpotlightLetter} className="spotlightLetter" />
                    <Innholdstittel className="blokk-s">
                        {getMessage(intl, 'kvittering.text.takk')}
                        <span className="capitalizeName"> {person.fornavn.toLowerCase()}!</span>
                    </Innholdstittel>
                    <Ingress className="blokk-xs">{this.receiptText()}</Ingress>
                    <Ingress className="blokk-xs">
                        <FormattedMessage
                            id="kvittering.text.dittNav"
                            values={{
                                dittNavLink: (
                                    <Lenke href="https://foreldrepenger.nav.no">
                                        <FormattedMessage id="kvittering.text.dittNavLink" />
                                    </Lenke>
                                )
                            }}
                        />
                    </Ingress>
                    <Ingress className="blokk-s">
                        {person.bankkonto &&
                            person.bankkonto.kontonummer &&
                            this.bankAccountText(person.bankkonto.kontonummer)}
                    </Ingress>
                    <Hovedknapp
                        className="responsiveButton responsiveButton--søknadSendt"
                        onClick={() => ((window as any).location = 'https://tjenester.nav.no/dittnav/oversikt')}>
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

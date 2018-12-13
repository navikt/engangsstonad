import * as React from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import { Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import * as moment from 'moment';
import 'moment/locale/nb';
import { Innholdstittel, Ingress } from 'nav-frontend-typografi';
import CustomSVG from 'common/components/custom-svg/CustomSVG';
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
        setTimeout(() => {
            (window as any).hj('trigger', 'es_kvittering_feedback');
            (window as any).hj('vpv', '/engangsstonad/end');
            // tslint:disable-next-line:align
        }, 5000);
    }

    receiptText() {
        const { kvittering } = this.props;
        return (
            <FormattedMessage
                id="kvittering.text.soknadMottatt"
                values={{
                    0: moment(kvittering.mottattDato).format('HH:mm'),
                    1: moment(kvittering.mottattDato).format('LL'),
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
                    <Ingress className="blokk-xs">
                        {this.receiptText()}
                    </Ingress>
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
                        {
                            person.bankkonto &&
                            person.bankkonto.kontonummer &&
                            this.bankAccountText(person.bankkonto.kontonummer)
                        }
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

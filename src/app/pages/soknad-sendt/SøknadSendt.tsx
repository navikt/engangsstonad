import * as React from 'react';
import 'moment/locale/nb';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Ingress, Undertittel } from 'nav-frontend-typografi';
import * as moment from 'moment';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';

import { Søkerinfo } from 'app/types/domain/Søkerinfo';
import Kvittering from 'app/types/services/Kvittering';
import CustomSVG from 'common/components/custom-svg/CustomSVG';
import Søknadstittel from 'components/søknadstittel/Søknadstittel';
import { Language } from 'intl/IntlProvider';

const SpotlightLetter = require('assets/svg/spotlight_letter.svg').default;

import { lenker } from 'util/lenker';
import { redirect } from 'util/login';
import { AppState } from 'reducers/index';
import getMessage from 'common/util/i18nUtils';

import '../../styles/engangsstonad.less';

interface StateProps {
    søkerinfo: Søkerinfo;
    kvittering: Kvittering;
}

type Props = StateProps & WrappedComponentProps;

class SøknadSendt extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        moment.locale(Language.BOKMÅL);
    }

    componentDidMount() {
        setTimeout(() => {
            if ((window as any).hj) {
                (window as any).hj('trigger', 'es_kvittering_feedback');
            }
        }, 5000);
    }

    render() {
        const { intl, kvittering, søkerinfo } = this.props;
        return (
            <>
                <DocumentTitle title={getMessage(intl, 'kvittering.sectionheading')} />
                <Søknadstittel tittel={getMessage(intl, 'søknad.pageheading')} />
                <div className="responsiveContainer">
                    <CustomSVG iconRef={SpotlightLetter} className="spotlightLetter" />
                    <Innholdstittel className="blokk-s">
                        {getMessage(intl, 'kvittering.text.takk')}
                        <span className="capitalizeName"> {søkerinfo.fornavn.toLowerCase()}!</span>
                    </Innholdstittel>
                    <Ingress className="blokk-xs">
                        <FormattedMessage
                            id="kvittering.text.soknadMottatt"
                            values={{
                                klokkeslett: moment(kvittering.mottattDato).format('HH:mm'),
                                dato: moment(kvittering.mottattDato).format('LL'),
                                harSaksnummer: kvittering.saksNr !== undefined,
                                saksNr: kvittering.saksNr
                            }}
                        />
                    </Ingress>
                    <Undertittel className="blokk-xs">
                        {getMessage(intl, 'kvittering.text.hvorFinnerJegStatus')}
                    </Undertittel>
                    <Ingress className="blokk-xs">
                        <FormattedMessage
                            id="kvittering.text.dittNav"
                            values={{
                                dittNavLink: (
                                    <Lenke href={lenker.foreldrepenger}>
                                        <FormattedMessage id="kvittering.text.dittNavLink" />
                                    </Lenke>
                                )
                            }}
                        />
                    </Ingress>

                    {søkerinfo.bankkonto && søkerinfo.bankkonto.kontonummer && (
                        <Ingress className="blokk-s">
                            <FormattedMessage
                                id="kvittering.text.kontonummer"
                                values={{
                                    kontonummer: søkerinfo.bankkonto.kontonummer,
                                    dinProfilLink: (
                                        <Lenke href={lenker.brukerprofil}>
                                            <FormattedMessage id="kvittering.text.soknadMottatt.dinProfilLink" />
                                        </Lenke>
                                    )
                                }}
                            />
                        </Ingress>
                    )}
                    <Hovedknapp
                        className="responsiveButton responsiveButton--søknadSendt"
                        onClick={() => redirect(lenker.dittNav)}
                    >
                        {getMessage(intl, 'kvittering.text.soknadMottatt.avsluttText')}
                    </Hovedknapp>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    søkerinfo: state.apiReducer.søkerinfo!,
    kvittering: state.apiReducer.kvittering!
});

export default connect<StateProps>(mapStateToProps)(injectIntl(SøknadSendt));

import * as React from 'react';
import { CountrySummaryList } from 'components/country-picker/CountryList';
import { EtikettLiten } from 'nav-frontend-typografi';
import { useIntl } from 'react-intl';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import InformasjonOmUtenlandsopphold, {
    Tidsperiode,
    Utenlandsopphold,
} from '../../types/domain/InformasjonOmUtenlandsopphold';
import * as moment from 'moment';
import Barn, { FodtBarn, UfodtBarn } from '../../types/domain/Barn';
import getMessage from 'common/util/i18nUtils';

import '../../styles/engangsstonad.less';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: Barn;
}

// TODO fjerne denne  logikken og bruke funksjonalitet fra datovelgeren v4
const erDatoITidsperiode = (dato: Date, tidsperiode: Tidsperiode) => {
    return moment(dato).isBetween(moment(tidsperiode.fom), moment(tidsperiode.tom), 'day', '[]');
};

const erFamiliehendelsedatoIEnUtenlandsoppholdPeriode = (
    familiehendelsedato: string,
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold
) => {
    const d = moment(familiehendelsedato).toDate();
    return (
        informasjonOmUtenlandsopphold.tidligereOpphold.some((tidligereOpphold: Utenlandsopphold) =>
            erDatoITidsperiode(d, tidligereOpphold.tidsperiode)
        ) ||
        informasjonOmUtenlandsopphold.senereOpphold.some((senereOpphold: Utenlandsopphold) =>
            erDatoITidsperiode(d, senereOpphold.tidsperiode)
        )
    );
};

const UtenlandsoppholdOppsummering: React.FunctionComponent<Props> = (props) => {
    const { barn, informasjonOmUtenlandsopphold } = props;
    const { iNorgeNeste12Mnd, iNorgeSiste12Mnd, tidligereOpphold, senereOpphold } = informasjonOmUtenlandsopphold;

    const intl = useIntl();

    return (
        <div className="blokk-m">
            {iNorgeSiste12Mnd ? (
                <DisplayTextWithLabel label={getMessage(intl, 'oppsummering.text.boddSisteTolv')} text="Norge" />
            ) : (
                <div className="textWithLabel">
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'oppsummering.text.boddSisteTolv')}
                    </EtikettLiten>
                    <CountrySummaryList utenlandsoppholdListe={tidligereOpphold} />
                </div>
            )}
            {iNorgeNeste12Mnd ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.neste12mnd')}
                    text={getMessage(intl, 'medlemmskap.radiobutton.boNorge')}
                />
            ) : (
                <div className="textWithLabel">
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'medlemmskap.text.oppsummering.neste12mnd')}
                    </EtikettLiten>
                    <CountrySummaryList utenlandsoppholdListe={senereOpphold} />
                </div>
            )}
            {barn.erBarnetFødt === false && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.ogKommerPåFødselstidspunktet')}
                    text={
                        erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                            (barn as UfodtBarn).termindato!,
                            informasjonOmUtenlandsopphold
                        )
                            ? getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet')
                            : getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
                    }
                />
            )}
            {barn.erBarnetFødt === true && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.varPåFødselstidspunktet')}
                    text={
                        erFamiliehendelsedatoIEnUtenlandsoppholdPeriode(
                            (barn as FodtBarn).fødselsdatoer[0]!,
                            informasjonOmUtenlandsopphold
                        )
                            ? getMessage(intl, 'medlemmskap.radiobutton.iUtlandet')
                            : getMessage(intl, 'medlemmskap.radiobutton.iNorge')
                    }
                />
            )}
        </div>
    );
};
export default UtenlandsoppholdOppsummering;

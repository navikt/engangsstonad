import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import * as moment from 'moment';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import InformasjonOmUtenlandsopphold, { Tidsperiode, Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import Barn, { FodtBarn, UfodtBarn } from '../../types/domain/Barn';
import getMessage from 'common/util/i18nUtils';

import '../../styles/engangsstonad.less';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    barn: Barn;
}

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

const UtenlandsoppholdOppsummering: React.StatelessComponent<Props & WrappedComponentProps> = (props) => {
    const { intl, barn, informasjonOmUtenlandsopphold } = props;
    const {
        tidligereOpphold,
        senereOpphold
    } = informasjonOmUtenlandsopphold;

    return (
        <div className="blokk-m">
            {tidligereOpphold.length === 0 ? (
                <DisplayTextWithLabel label={getMessage(intl, 'oppsummering.text.boddSisteTolv')} text="Norge" />
            ) : (
                <div className="textWithLabel">
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'oppsummering.text.boddSisteTolv')}
                    </EtikettLiten>
                    {/* <CountryList utenlandsoppholdListe={tidligereOpphold} /> */}
                </div>
            )}
            {senereOpphold.length === 0 ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.neste12mnd')}
                    text={getMessage(intl, 'medlemmskap.radiobutton.boNorge')}
                />
            ) : (
                <div className="textWithLabel">
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'medlemmskap.text.oppsummering.neste12mnd')}
                    </EtikettLiten>
                    {/* <CountryList utenlandsoppholdListe={senereOpphold} /> */}
                </div>
            )}
            {barn.erBarnetFødt === false && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.ogKommerPåFødselstidspunktet')}
                    text={
                        erFamiliehendelsedatoIEnUtenlandsoppholdPeriode((barn as UfodtBarn).termindato!, informasjonOmUtenlandsopphold)
                            ? getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet')
                            : getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
                    }
                />
            )}
            {barn.erBarnetFødt === true && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.varPåFødselstidspunktet')}
                    text={
                        erFamiliehendelsedatoIEnUtenlandsoppholdPeriode((barn as FodtBarn).fødselsdatoer[0]!, informasjonOmUtenlandsopphold)
                            ? getMessage(intl, 'medlemmskap.radiobutton.iUtlandet')
                            : getMessage(intl, 'medlemmskap.radiobutton.iNorge')
                    }
                />
            )}
        </div>
    );
};
export default injectIntl(UtenlandsoppholdOppsummering);

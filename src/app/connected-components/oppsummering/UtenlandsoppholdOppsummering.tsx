import * as React from 'react';
import { CountrySummaryList } from 'components/country-picker/CountryList';
import { EtikettLiten } from 'nav-frontend-typografi';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'util/i18n/i18nUtils';
import InformasjonOmUtenlandsopphold from '../../types/domain/InformasjonOmUtenlandsopphold';
import '../../styles/engangsstonad.less';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    erBarnetFødt?: boolean;
}

const UtenlandsoppholdOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { intl, erBarnetFødt } = props;
    const {
        iNorgePåHendelsestidspunktet,
        iNorgeNeste12Mnd,
        iNorgeSiste12Mnd,
        tidligereOpphold,
        senereOpphold
    } = props.informasjonOmUtenlandsopphold;

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
            {erBarnetFødt === false && iNorgePåHendelsestidspunktet !== undefined && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.ogKommerPåFødselstidspunktet')}
                    text={
                        iNorgePåHendelsestidspunktet
                            ? getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
                            : getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet')
                    }
                />
            )}
            {erBarnetFødt === true && iNorgePåHendelsestidspunktet !== undefined && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.varPåFødselstidspunktet')}
                    text={
                        iNorgePåHendelsestidspunktet
                            ? getMessage(intl, 'medlemmskap.radiobutton.iNorge')
                            : getMessage(intl, 'medlemmskap.radiobutton.iUtlandet')
                    }
                />
            )}
        </div>
    );
};
export default injectIntl(UtenlandsoppholdOppsummering);

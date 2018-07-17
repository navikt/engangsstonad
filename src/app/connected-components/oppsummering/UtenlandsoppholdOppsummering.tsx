import * as React from 'react';
import { EtikettLiten } from 'nav-frontend-typografi';

import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import { CountrySummaryList } from 'components/country-picker/CountryList';
import InformasjonOmUtenlandsopphold from '../../types/domain/InformasjonOmUtenlandsopphold';
import getMessage from 'util/i18n/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import '../../styles/engangsstonad.less';
import SummaryBlock from 'components/summary-block/SummaryBlock';

interface Props {
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    erBarnetFødt?: boolean;
}

const UtenlandsoppholdOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = props => {
    const { intl, erBarnetFødt } = props;
    const {
        fødselINorge,
        iNorgeNeste12Mnd,
        iNorgeSiste12Mnd,
        tidligerePerioder,
        senerePerioder
    } = props.informasjonOmUtenlandsopphold;

    return (
        <SummaryBlock title={getMessage(intl, 'medlemmskap.sectionheading')}>
            {iNorgeSiste12Mnd ? (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.boddSisteTolv')}
                    text="Norge"
                />
            ) : (
                    <div>
                        <EtikettLiten className="textWithLabel__label">
                            {getMessage(intl, 'oppsummering.text.boddSisteTolv')}
                        </EtikettLiten>
                        <CountrySummaryList utenlandsoppholdListe={tidligerePerioder} />
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
                        <CountrySummaryList utenlandsoppholdListe={senerePerioder} />
                    </div>
                )}
            {erBarnetFødt === false && fødselINorge !== undefined && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.ogKommerPåFødselstidspunktet')}
                    text={fødselINorge
                        ? getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
                        : getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet')}
                />
            )}
            {erBarnetFødt === true && fødselINorge !== undefined && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.varPåFødselstidspunktet')}
                    text={fødselINorge
                        ? getMessage(intl, 'medlemmskap.radiobutton.iNorge')
                        : getMessage(intl, 'medlemmskap.radiobutton.iUtlandet')}
                />
            )}
        </SummaryBlock>
    );
};
export default injectIntl(UtenlandsoppholdOppsummering);

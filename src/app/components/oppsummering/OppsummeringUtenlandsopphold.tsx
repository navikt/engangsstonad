import * as React from 'react';
import Utenlandsopphold from '../../types/domain/Utenlandsopphold';
import DisplayTextWithLabel from 'shared/display-text-with-label/DisplayTextWithLabel';
import Ingress from 'nav-frontend-typografi/lib/ingress';
import getMessage from 'util/i18n/i18nUtils';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { CountrySummaryList } from 'shared/country-picker/CountryList';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import '../engangsstonad/engangsstonad.less';

interface Props {
    utenlandsopphold: Utenlandsopphold;
}

const OppsummeringUtenlandsopphold: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
    const { fødselINorge, iNorgeNeste12Mnd, iNorgeSiste12Mnd, perioder } = props.utenlandsopphold;

    const iNorgeNeste12MndText = iNorgeNeste12Mnd
        ? getMessage(intl, 'medlemmskap.radiobutton.boNorge')
        : getMessage(intl, 'medlemmskap.radiobutton.boUtlandet');

    const fødselINorgeMndText = fødselINorge
        ? getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
        : getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet');

    return (
        <div>
            <Ingress className="engangsstonadOppsumering__underTitle">
                {getMessage(intl, 'medlemmskap.sectionheading.medlemmskap')}
            </Ingress>

            {iNorgeSiste12Mnd ? (
                <DisplayTextWithLabel label={getMessage(intl, 'oppsummering.text.boddSisteTolv')} text="Norge"/>
            ) : (
                <div>
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'oppsummering.text.boddSisteTolv')}
                    </EtikettLiten>
                    <CountrySummaryList utenlandsoppholdListe={perioder} />
                </div>
            )}
            <DisplayTextWithLabel
                label={getMessage(intl, 'medlemmskap.text.neste12mnd')}
                text={iNorgeNeste12MndText}
            />
            <DisplayTextWithLabel
                label={getMessage(intl, 'oppsummering.text.ogKommerPåFødselstidspunktet')}
                text={fødselINorgeMndText}
            />
        </div>
    );
};
export default injectIntl(OppsummeringUtenlandsopphold);
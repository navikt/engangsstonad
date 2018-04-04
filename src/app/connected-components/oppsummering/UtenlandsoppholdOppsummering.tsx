import * as React from 'react';
import { EtikettLiten, Ingress } from 'nav-frontend-typografi';

import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import { CountrySummaryList } from 'components/country-picker/CountryList';
import Utenlandsopphold from '../../types/domain/Utenlandsopphold';
import getMessage from 'util/i18n/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import '../../styles/engangsstonad.less';

interface Props {
    utenlandsopphold: Utenlandsopphold;
}

const UtenlandsoppholdOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
    const { fødselINorge, iNorgeNeste12Mnd, iNorgeSiste12Mnd, tidligerePerioder, senerePerioder } = props.utenlandsopphold;

    const iNorgeNeste12MndText = iNorgeNeste12Mnd
        ? getMessage(intl, 'medlemmskap.radiobutton.boNorge')
        : getMessage(intl, 'medlemmskap.radiobutton.boUtlandet');

    const fødselINorgeMndText = fødselINorge
        ? getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
        : getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet');

    return (
        <div>
            <Ingress className="engangsstonadOppsumering__underTitle">
                {getMessage(intl, 'medlemmskap.sectionheading')}
            </Ingress>

            {iNorgeSiste12Mnd ? (
                <DisplayTextWithLabel label={getMessage(intl, 'oppsummering.text.boddSisteTolv')} text="Norge" />
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
                    label={getMessage(intl, 'medlemmskap.text.neste12mnd')}
                    text={getMessage(intl, 'medlemmskap.radiobutton.boNorge')}
                />
            ) : (
                    <div>
                        <EtikettLiten className="textWithLabel__label">
                            {getMessage(intl, 'medlemmskap.text.neste12mnd')}
                        </EtikettLiten>
                        <CountrySummaryList utenlandsoppholdListe={senerePerioder} />
                    </div>
                )}
            {fødselINorge &&
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.ogKommerPåFødselstidspunktet')}
                    text={fødselINorgeMndText}
                />
            }
        </div>
    );
};
export default injectIntl(UtenlandsoppholdOppsummering);

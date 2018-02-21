import * as React from 'react';
import Medlemsskap from '../../types/domain/Medlemsskap';
import DisplayTextWithLabel from 'shared/display-text-with-label/DisplayTextWithLabel';
import Ingress from 'nav-frontend-typografi/lib/ingress';
import getMessage from 'util/i18n/i18nUtils';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { CountrySummaryList } from 'shared/country-picker/CountryList';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import '../engangsstonad/engangsstonad.less';

interface Props {
    medlemsskap: Medlemsskap;
}

const OppsummeringMedlemskap: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const {intl } = props;
    const {fodselINorge, iNorgeNeste12, iNorgeSiste12, utenlandsopphold} = props.medlemsskap;

    const iNorgeNeste12Text = iNorgeNeste12
        ? getMessage(intl, 'medlemmskap.radiobutton.boNorge')
        : getMessage(intl, 'medlemmskap.radiobutton.boUtlandet');

    const fodselINorgeText = fodselINorge
        ? getMessage(intl, 'medlemmskap.radiobutton.vareNorge')
        : getMessage(intl, 'medlemmskap.radioButton.vareUtlandet');

    return (
        <div>
            <Ingress className="engangsstonadOppsumering__underTitle">
                {getMessage(intl, 'medlemmskap.sectionheading.medlemmskap')}
            </Ingress>

            {iNorgeSiste12 ? (
                <DisplayTextWithLabel label={getMessage(intl, 'oppsummering.text.boddSisteTolv')} text="Norge"/>
            ) : (
                <div>
                    <EtikettLiten className="textWithLabel__label">
                        {getMessage(intl, 'oppsummering.text.boddSisteTolv')}
                    </EtikettLiten>
                    <CountrySummaryList utenlandsoppholdListe={utenlandsopphold}/>
                </div>
            )}
            <DisplayTextWithLabel
                label={getMessage(intl, 'medlemmskap.text.neste12mnd')}
                text={iNorgeNeste12Text}
            />
            <DisplayTextWithLabel
                label={getMessage(intl, 'oppsummering.text.ogKommerPåFødselstidspunktet')}
                text={fodselINorgeText}
            />
        </div>
    );
};
export default injectIntl(OppsummeringMedlemskap);
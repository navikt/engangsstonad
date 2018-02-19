import * as React from 'react';
import DisplayTextWithLabel from 'shared/display-text-with-label/DisplayTextWithLabel';
import Ingress from 'nav-frontend-typografi/lib/ingress';
import getMessage from 'util/i18n/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RelasjonTilFodtBarn, RelasjonTilUfodtBarn } from 'app/types/domain/RelasjonTilBarn';
import { ISODateToMaskedInput } from 'util/date/dateUtils';

import '../engangsstonad/engangsstonad.less';

interface Props {
    barnErFodt?: boolean;
    relasjonTilBarn: RelasjonTilFodtBarn & RelasjonTilUfodtBarn;
}

const OppsummeringRelasjonTilBarn: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { intl, barnErFodt } = props;
    const { fodselsdato, terminDato, utstedtDato } = props.relasjonTilBarn;

    if (barnErFodt && fodselsdato) {
        return(
            <DisplayTextWithLabel
                label="Søknaden gjelder bla bla..."
                text={fodselsdato}
            />);
    } else if (terminDato && utstedtDato) {

        let antallBarnSummaryText;
        const { antallBarn } = props.relasjonTilBarn;
        if (antallBarn === 1) {
            antallBarnSummaryText = getMessage(intl, 'relasjonBarn.radiobutton.ettbarn');
        } else if (antallBarn === 2) {
            antallBarnSummaryText = getMessage(intl, 'relasjonBarn.radiobutton.tvillinger');
        } else {
            antallBarnSummaryText = getMessage(intl, 'relasjonBarn.radiobutton.flere');
        }

        return (
            <div>
                <Ingress className="engangsstonadOppsumering__underTitle">
                    {getMessage(intl, 'relasjonBarn.sectionheading.relasjonBarn')}
                </Ingress>

                <DisplayTextWithLabel
                    label={getMessage(intl, 'relasjonBarn.radiobutton.tvillinger')}
                    text={antallBarnSummaryText}
                />
                <DisplayTextWithLabel
                    label={getMessage(intl, 'relasjonBarn.text.termindato')}
                    text={ISODateToMaskedInput(terminDato)}
                />
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                    text="<link til vedlegg her>"
                />
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                    text={ISODateToMaskedInput(utstedtDato)}
                />
            </div>
        );
    }
    return null;
};
export default injectIntl(OppsummeringRelasjonTilBarn);
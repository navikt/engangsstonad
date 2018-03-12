import * as React from 'react';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import Ingress from 'nav-frontend-typografi/lib/ingress';
import getMessage from 'util/i18n/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { FodtBarn, UfodtBarn } from '../../types/domain/Barn';
import { ISODateToMaskedInput } from 'util/date/dateUtils';

import '../../styles/engangsstonad.less';

interface Props {
    barn: FodtBarn & UfodtBarn;
}

const BarnOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = (props) => {
    const { intl } = props;
    const { erBarnetFødt, fødselsdatoer, termindato, terminbekreftelseDato } = props.barn;

    if (erBarnetFødt && fødselsdatoer && fødselsdatoer.length > 0) {
        return (
            <DisplayTextWithLabel
                label="Søknaden gjelder bla bla..."
                text={fødselsdatoer[0]}
            />
        );
    } else if (termindato && terminbekreftelseDato) {

        let antallBarnSummaryText;
        const { antallBarn } = props.barn;
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
                    {getMessage(intl, 'relasjonBarn.sectionheading')}
                </Ingress>

                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.soknadenGjelder')}
                    text={antallBarnSummaryText}
                />
                <DisplayTextWithLabel
                    label={getMessage(intl, 'relasjonBarn.text.termindato')}
                    text={ISODateToMaskedInput(termindato)}
                />
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                    text="<link til vedlegg her>"
                />
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                    text={ISODateToMaskedInput(terminbekreftelseDato)}
                />
            </div>
        );
    }
    return null;
};
export default injectIntl(BarnOppsummering);

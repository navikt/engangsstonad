import * as React from 'react';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'util/i18n/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { FodtBarn, UfodtBarn } from '../../types/domain/Barn';
import { ISODateToMaskedInput } from 'util/date/dateUtils';

import '../../styles/engangsstonad.less';
import { containsUnlikeValues } from 'util/arrayUtil';
import SummaryBlock from 'components/summary-block/SummaryBlock';

interface Props {
    barn: FodtBarn & UfodtBarn;
    vedlegg: File[];
}

const BarnOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = props => {
    const { intl } = props;
    const {
        antallBarn,
        erBarnetFødt,
        fødselsdatoer,
        termindato,
        terminbekreftelseDato
    } = props.barn;
    const vedleggSummary = props.vedlegg.map(vedleggElement => vedleggElement.name);

    const fødselsdatoerSummary = containsUnlikeValues(props.barn.fødselsdatoer)
        ? fødselsdatoer.map(fødselsdato => ISODateToMaskedInput(fødselsdato))
        : ISODateToMaskedInput(fødselsdatoer[0]);

    let antallBarnSummaryText;
    if (antallBarn === 1) {
        antallBarnSummaryText = getMessage(intl, 'relasjonBarn.radiobutton.ettbarn');
    } else if (antallBarn === 2) {
        antallBarnSummaryText = getMessage(intl, 'relasjonBarn.radiobutton.tvillinger');
    } else {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.text.flereAntallBarn', {
            antall: antallBarn
        });
    }

    return (
        <SummaryBlock title={getMessage(intl, 'relasjonBarn.sectionheading')}>
            <DisplayTextWithLabel
                label={getMessage(intl, 'oppsummering.text.soknadenGjelder')}
                text={antallBarnSummaryText}
            />
            {erBarnetFødt && (
                <DisplayTextWithLabel label={'Med fødselsdato...'} text={fødselsdatoerSummary} />
            )}
            {!erBarnetFødt &&
                termindato &&
                terminbekreftelseDato && (
                    <div>
                        <DisplayTextWithLabel
                            label={getMessage(intl, 'relasjonBarn.text.termindato')}
                            text={ISODateToMaskedInput(termindato)}
                        />
                        <DisplayTextWithLabel
                            label={getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                            text={vedleggSummary}
                        />
                        <DisplayTextWithLabel
                            label={getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                            text={ISODateToMaskedInput(terminbekreftelseDato)}
                        />
                    </div>
                )}
        </SummaryBlock>
    );
};
export default injectIntl(BarnOppsummering);

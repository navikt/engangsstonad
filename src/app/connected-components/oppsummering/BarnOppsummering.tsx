import * as React from 'react';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'util/i18n/i18nUtils';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { FodtBarn, UfodtBarn } from '../../types/domain/Barn';
import { ISODateToMaskedInput } from 'util/date/dateUtils';

import '../../styles/engangsstonad.less';
import SummaryBlock from 'components/summary-block/SummaryBlock';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';

interface Props {
    barn: FodtBarn & UfodtBarn;
}

const BarnOppsummering: React.StatelessComponent<Props & InjectedIntlProps> = props => {
    const { intl } = props;
    const {
        antallBarn,
        erBarnetFødt,
        fødselsdatoer,
        terminbekreftelse,
        termindato,
        terminbekreftelseDato
    } = props.barn;

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
        // tslint:disable-next-line:jsx-alignment
        <SummaryBlock title={getMessage(intl, 'oppsummering.text.informasjonOmBarnet', {
            antallBarn: antallBarn && antallBarn > 1 ?
                getMessage(intl, 'medlemmskap.text.barnFlertall') :
                getMessage(intl, 'medlemmskap.text.barnEntall') }
            )}
        >
            <DisplayTextWithLabel
                label={getMessage(intl, 'oppsummering.text.soknadenGjelder', )}
                text={antallBarnSummaryText}
            />
            {erBarnetFødt && (
                <DisplayTextWithLabel label={getMessage(intl, 'oppsummering.text.medFødselsdato')} text={ISODateToMaskedInput(fødselsdatoer[0])} />
            )}
            {!erBarnetFødt &&
                termindato &&
                terminbekreftelseDato && (
                    <div>
                        <DisplayTextWithLabel
                            label={getMessage(intl, 'oppsummering.text.medTermindato')}
                            text={ISODateToMaskedInput(termindato)}
                        />
                        <DisplayTextWithLabel
                            label={getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                            text={terminbekreftelse.filter((a: Attachment) => !isAttachmentWithError(a)).map((a: Attachment) => a.filename)}
                        />
                        <DisplayTextWithLabel
                            label={getMessage(intl, 'oppsummering.text.somErDatert')}
                            text={ISODateToMaskedInput(terminbekreftelseDato)}
                        />
                    </div>
                )}
        </SummaryBlock>
    );
};
export default injectIntl(BarnOppsummering);

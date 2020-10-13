import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { EtikettLiten } from 'nav-frontend-typografi';
import { FodtBarn, UfodtBarn } from '../../types/domain/Barn';
import { useIntl } from 'react-intl';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import { ISODateToMaskedInput } from 'util/date/dateUtils';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'common/util/i18nUtils';
import '../../styles/engangsstonad.less';

interface Props {
    barn: FodtBarn & UfodtBarn;
}

const BarnOppsummering: React.FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const {
        antallBarn,
        erBarnetFødt,
        fødselsdatoer,
        terminbekreftelse,
        termindato,
        terminbekreftelseDato,
    } = props.barn;

    let antallBarnSummaryText;
    if (antallBarn === 1) {
        antallBarnSummaryText = getMessage(intl, 'relasjonBarn.radiobutton.ettbarn');
    } else if (antallBarn === 2) {
        antallBarnSummaryText = getMessage(intl, 'relasjonBarn.radiobutton.tvillinger');
    } else {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.text.flereAntallBarn', {
            antall: antallBarn,
        });
    }

    return (
        <div className=" blokk-m">
            <DisplayTextWithLabel
                label={getMessage(intl, 'oppsummering.text.soknadenGjelder')}
                text={antallBarnSummaryText}
            />
            {erBarnetFødt && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.medFødselsdato')}
                    text={ISODateToMaskedInput(fødselsdatoer[0])}
                />
            )}
            {!erBarnetFødt && termindato && terminbekreftelseDato && (
                <div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.medTermindato')}
                        text={ISODateToMaskedInput(termindato)}
                    />
                    <div className="oppsummering__attachments">
                        <EtikettLiten className="textWithLabel__label">
                            {getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                        </EtikettLiten>
                        <AttachmentList
                            attachments={terminbekreftelse.filter((a: Attachment) => !isAttachmentWithError(a))}
                        />
                    </div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.somErDatert')}
                        text={ISODateToMaskedInput(terminbekreftelseDato)}
                    />
                </div>
            )}
        </div>
    );
};
export default BarnOppsummering;

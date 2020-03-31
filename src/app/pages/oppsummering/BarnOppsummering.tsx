import * as React from 'react';
import { useIntl } from 'react-intl';
import { EtikettLiten } from 'nav-frontend-typografi';

import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';

import { FodtBarn, UfodtBarn } from '../../types/domain/Barn';

import getMessage from 'common/util/i18nUtils';
import { formatDate } from 'common/util/datoUtils';

import '../../styles/engangsstonad.less';

interface Props {
    barn: FodtBarn & UfodtBarn;
}

const BarnOppsummering: React.StatelessComponent<Props> = (props) => {
    const intl = useIntl();
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
        antallBarnSummaryText = getMessage(intl, 'numberOfChildren.1');
    } else if (antallBarn === 2) {
        antallBarnSummaryText = getMessage(intl, 'numberOfChildren.2');
    } else {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.text.flereAntallBarn', {
            antall: antallBarn!
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
                    text={formatDate(fødselsdatoer[0])}
                />
            )}
            {!erBarnetFødt && termindato && terminbekreftelseDato && (
                <div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'termindato')}
                        text={formatDate(termindato)}
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
                        text={formatDate(terminbekreftelseDato)}
                    />
                </div>
            )}
        </div>
    );
};
export default BarnOppsummering;

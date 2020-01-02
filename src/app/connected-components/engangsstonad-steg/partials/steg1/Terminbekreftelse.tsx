import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import AttachmentInput from 'components/attachment-input/AttachmentInput';
import { validerSamletFilstørrelse } from 'components/attachment-input/utils';
import { bytesString } from 'util/attachment/utils';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'components/veileder/Veileder';

const MAX_TOTAL_SIZE = 1024 * 1024 * 7.5;

export interface OwnProps {
    vedlegg: File[];
    onFilesSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
}

const Terminbekreftelse: React.StatelessComponent<
    OwnProps & InjectedIntlProps
> = props => (
    <div className="terminbekreftelse">
        <div className="blokk-m">
            <Veilederpanel kompakt={true} svg={<Veileder />}>
                <FormattedMessage id="terminbekreftelsen.text.terminbekreftelsen" />
            </Veilederpanel>
        </div>
        <AttachmentInput
            vedlegg={props.vedlegg}
            onFileDelete={props.onFileDelete}
            onFilesSelect={props.onFilesSelect}
            visFilstørrelse={true}
            uploadValidation={{
                name: 'vedleggInput',
                validators: [
                    {
                        test: () => props.vedlegg.length > 0,
                        failText: props.intl.formatMessage({
                            id:
                                'relasjonBarn.vedlegg.feilmelding.vedleggMangler'
                        })
                    }
                ]
            }}
            listValidation={{
                name: 'vedleggListe',
                validators: [
                    {
                        test: () =>
                            validerSamletFilstørrelse(
                                props.vedlegg,
                                MAX_TOTAL_SIZE
                            ),
                        failText: props.intl.formatMessage(
                            {
                                id:
                                    'relasjonBarn.vedlegg.feilmelding.forstorefiler'
                            },
                            {
                                antall: props.vedlegg.length,
                                maks: bytesString(MAX_TOTAL_SIZE)
                            }
                        )
                    }
                ]
            }}
        />
    </div>
);

export default injectIntl(Terminbekreftelse);

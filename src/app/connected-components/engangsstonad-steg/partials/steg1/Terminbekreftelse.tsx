import * as React from 'react';
import Veilederinfo from 'components/veileder-info/Veilederinfo';
import { FormattedMessage } from 'react-intl';
import { Feil } from 'components/skjema-input-element/types';
import AttachmentInput from 'components/attachment-input/AttachmentInput';
import { validerSamletFilstørrelse } from 'components/attachment-input/utils';

const MAX_TOTAL_SIZE = 1024 * 1024 * 2;

export interface OwnProps {
    vedlegg: File[];
    onFilesSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
    feil?: Feil;
}

const Terminbekreftelse: React.StatelessComponent<OwnProps> = props => (
    <div className="terminbekreftelse">
        <div className="blokk-m">
            <Veilederinfo>
                <FormattedMessage id="terminbekreftelsen.text.terminbekreftelsen" />
            </Veilederinfo>
        </div>
        <AttachmentInput
            {...props}
            visFilstørrelse={true}
            validators={[
                {
                    test: () =>
                        validerSamletFilstørrelse(
                            props.vedlegg,
                            MAX_TOTAL_SIZE
                        ),
                    failText: 'Maks størrelse på filene er toooo much'
                }
            ]}
        />
    </div>
);

export default Terminbekreftelse;

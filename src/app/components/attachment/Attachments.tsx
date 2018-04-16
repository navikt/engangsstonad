import * as React from 'react';
import AttachmentButton from 'components/attachment/AttachmentButton';
import AttachmentList from 'components/attachment/AttachmentList';
import SkjemaInputElement from 'components/skjema-input-element/SkjemaInputElement';
import { Feil } from 'components/skjema-input-element/types';
import LabelText from 'components/labeltext/LabelText';
import { FormattedMessage } from 'react-intl';

export interface Props {
    vedlegg: File[];
    onFileSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
    feil?: Feil;
}

const Attachments: React.StatelessComponent<Props> = ({
    vedlegg,
    onFileDelete,
    onFileSelect,
    feil
}) => (
    <div className="attachments">
        <div className="blokk-m">
            <AttachmentButton
                id="vedlegg"
                onFileSelected={(files: File[]) => onFileSelect(files)}
            />
        </div>
        {vedlegg.length > 0 && (
            <div>
                <SkjemaInputElement
                    label={
                        <div className="blokk-xs">
                            <LabelText>
                                <FormattedMessage id="vedlegg.liste.tittel" />
                            </LabelText>
                        </div>
                    }
                    feil={feil}
                >
                    <AttachmentList
                        vedlegg={vedlegg}
                        onDelete={(file: File) => onFileDelete(file)}
                    />
                </SkjemaInputElement>
            </div>
        )}
    </div>
);

export default Attachments;

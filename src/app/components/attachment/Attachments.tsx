import * as React from 'react';
import AttachmentButton from 'components/attachment/AttachmentButton';
import AttachmentList from 'components/attachment/AttachmentList';
import LabelText from 'components/labeltext/LabelText';

export interface Props {
    vedlegg: File[];
    onFileSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
}

const Attachments: React.StatelessComponent<Props> = ({ vedlegg, onFileDelete, onFileSelect }) => (
    <div className="attachments">
        <div className="blokk-m">
            <AttachmentButton
                id="vedlegg"
                onFileSelected={(files: File[]) => onFileSelect(files)}
            />
        </div>
        {vedlegg.length > 0 && (
            <div>
                <div className="blokk-xs">
                    <LabelText>Valgte vedlegg</LabelText>
                </div>
                <AttachmentList vedlegg={vedlegg} onDelete={(file: File) => onFileDelete(file)} />
            </div>
        )}
    </div>
);

export default Attachments;

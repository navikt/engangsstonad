import * as React from 'react';
import AttachmentButton from 'components/attachment/AttachmentButton';
import AttachmentList from 'components/attachment/AttachmentList';

export interface Props {
    vedlegg?: File[];
    onFileSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
}

const Attachments: React.StatelessComponent<Props> = ({ vedlegg = [], onFileDelete, onFileSelect }) => (
    <div className="attachments">
        <div className="attachments__addButton">
            <AttachmentButton id="vedlegg" onFileSelected={(files: File[]) => onFileSelect(files)} />
        </div>
        {vedlegg &&
            vedlegg.length > 0 && (
                <div className="attachments__list">
                    <AttachmentList vedlegg={vedlegg} onDelete={(file: File) => onFileDelete(file)} />
                </div>
            )}
    </div>
);

export default Attachments;

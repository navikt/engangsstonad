import * as React from 'react';
import { Attachment, AttachmentType, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';

export interface AttachmentsUploaderProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    onFilesSelect: (attachments: Attachment[]) => void;
    onFileDelete: (attachment: Attachment) => void;
}

export default class AttachmentsUploaderPure extends React.Component<
    AttachmentsUploaderProps
> {
    constructor(props: AttachmentsUploaderProps) {
        super(props);
        this.onFileDelete = this.onFileDelete.bind(this);
        this.onFilesSelect = this.onFilesSelect.bind(this);
    }

    onFilesSelect(files: Attachment[]) {
        const { onFilesSelect } = this.props;
        onFilesSelect(files);
    }

    onFileDelete(files: Attachment[]) {
        const { onFileDelete } = this.props;
        files.forEach((file) => {
            onFileDelete(file);
        })
    }

    render() {
        const { attachments, attachmentType, skjemanummer } = this.props;
        return (
            <AttachmentOverview
                attachments={attachments}
                attachmentType={attachmentType}
                skjemanummer={skjemanummer}
                onFilesSelect={this.onFilesSelect}
                onFileDelete={this.onFileDelete}
            />
        );
    }
}

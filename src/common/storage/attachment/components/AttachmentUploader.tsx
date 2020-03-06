import * as React from 'react';
import { Attachment, AttachmentType, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import AttachmentApi from 'common/storage/api/attachmentApi';

export interface AttachmentsUploaderProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    onFilesUploadStart: (attachments: Attachment[]) => void;
    onFileUploadFinish: (attachment: Attachment) => void;
    onFileDelete: (attachments: Attachment[]) => void;
}

export default class AttachmentsUploader extends React.Component<AttachmentsUploaderProps> {
    constructor(props: AttachmentsUploaderProps) {
        super(props);
        this.onFilesSelect = this.onFilesSelect.bind(this);
    }

    onFilesSelect(files: Attachment[]) {
        files.forEach((file: Attachment) => {
            file.pending = true;
        });
        this.props.onFilesUploadStart(files);
        files.forEach((file: Attachment) =>
            AttachmentApi.saveAttachment(file)
                .then((response: any) => {
                    file.url = response.headers.location;
                })
                .catch((error) => {
                    file.error = error;
                })
                .finally(() => {
                    file.pending = false;
                    this.props.onFileUploadFinish(file);
                })
        );
    }

    render() {
        const { attachments, attachmentType, skjemanummer } = this.props;
        return (
            <AttachmentOverview
                attachments={attachments}
                attachmentType={attachmentType}
                skjemanummer={skjemanummer}
                onFilesSelect={this.onFilesSelect}
                onFileDelete={this.props.onFileDelete}
            />
        );
    }
}

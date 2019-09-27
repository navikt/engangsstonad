import React from 'react';
import { FieldProps } from 'formik';
import { Skjemanummer, AttachmentType, Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';

interface Props {
    fieldProps: FieldProps;
    skjemanummer: Skjemanummer;
}

const AttachmentUploader: React.StatelessComponent<Props> = ({ fieldProps, skjemanummer }) => {
    const { field, form } = fieldProps;
    const attachments = field.value || [];

    return (
        <AttachmentsUploader
            attachments={attachments}
            attachmentType={AttachmentType.TERMINBEKREFTELSE}
            skjemanummer={skjemanummer}
            onFilesUploadStart={(newAttachments: Attachment[]) => {
                form.setFieldValue(field.name, [...attachments, ...newAttachments]);
            }}
            onFileUploadFinish={(attachment: Attachment) => {
                if (Array.isArray(form.values)) {
                    const index = form.values.findIndex(({ id }) => id === attachment.id)
                    form.values[index].url = attachment.url;
                }
            }}
            onFileDelete={(attachments) => {
                attachments.forEach(({ id }) =>
                    form.setFieldValue(
                        field.name,
                        field.value.filter((attachment: Attachment) => attachment.id !== id)
                    )
                );
            }}
        />
    );
};

export default AttachmentUploader;

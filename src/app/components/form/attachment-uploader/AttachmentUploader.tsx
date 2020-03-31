import React from 'react';
import { FieldProps, Field } from 'formik';

import { Skjemanummer, AttachmentType, Attachment } from 'common/storage/attachment/types/Attachment';
import AttachmentsUploader from 'common/storage/attachment/components/AttachmentUploader';
import { FormComponentProps, withGradualVisibility } from '../visibility-hoc/withVisibility';
import { visibilityHook } from '../hooks/hooks';
import { VisibilityContext } from '../visibility-context/VisibilityContext';

interface Props extends FormComponentProps {
    skjemanummer: Skjemanummer;
}

const AttachmentUploader: React.StatelessComponent<Props> = ({ name, skjemanummer }) => {
    const visibilityContext = React.useContext(VisibilityContext);
    visibilityHook(visibilityContext.updateVisibility, name);
    return (
        <Field
            name={name}
            render={(fieldProps: FieldProps) => {
                const { field, form } = fieldProps;
                const attachments: Attachment[] = field.value || [];
                return (
                    <AttachmentsUploader
                        attachments={attachments}
                        attachmentType={AttachmentType.TERMINBEKREFTELSE}
                        skjemanummer={skjemanummer}
                        onFilesUploadStart={(newAttachments: Attachment[]) => {
                            form.setFieldValue(field.name, [...attachments, ...newAttachments]);
                        }}
                        onFileUploadFinish={(attachment: Attachment) => {
                            const index = attachments.findIndex(({ id }) => id === attachment.id);
                            attachments[index].url = attachment.url;
                            form.setFieldValue(field.name, [...attachments]);
                        }}
                        onFileDelete={(attachmentsToDelete) => {
                            attachmentsToDelete.forEach(({ id }) =>
                                form.setFieldValue(
                                    field.name,
                                    field.value.filter((attachment: Attachment) => attachment.id !== id)
                                )
                            );
                        }}
                    />
            )}}
            />
    );
};

export default withGradualVisibility<Props>(AttachmentUploader);

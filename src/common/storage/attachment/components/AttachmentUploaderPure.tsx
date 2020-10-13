import React from 'react';
import { Attachment, AttachmentType, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import AttachmentOverview from 'common/storage/attachment/components/AttachmentOverview';
import UtvidetInformasjon from 'components/utvidet-informasjon/UtvidetInformasjon';
import PictureScanningGuide from 'components/picture-scanning-guide/PictureScanningGuide';
import { FormattedMessage } from 'react-intl';

export interface AttachmentsUploaderProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    onFilesSelect: (attachments: Attachment[]) => void;
    onFileDelete: (attachment: Attachment) => void;
}

const AttachmentsUploaderPure: React.FunctionComponent<AttachmentsUploaderProps> = ({
    attachments,
    attachmentType,
    skjemanummer,
    onFilesSelect,
    onFileDelete,
}) => {
    const handleOnFilesSelect = (files: Attachment[]) => {
        onFilesSelect(files);
    };

    const handleOnFileDelete = (files: Attachment[]) => {
        files.forEach((file) => {
            onFileDelete(file);
        });
    };

    return (
        <>
            <AttachmentOverview
                attachments={attachments}
                attachmentType={attachmentType}
                skjemanummer={skjemanummer}
                onFilesSelect={handleOnFilesSelect}
                onFileDelete={handleOnFileDelete}
            />
            <UtvidetInformasjon apneLabel={<FormattedMessage id="psg.åpneLabel" />}>
                <PictureScanningGuide />
            </UtvidetInformasjon>
        </>
    );
};
export default AttachmentsUploaderPure;

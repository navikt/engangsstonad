import { Attachment, AttachmentType, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import { guid } from 'nav-frontend-js-utils';

const generateAttachmentId = () => 'V'.concat(guid().replace(/-/g, ''));

export const mapFileToAttachment = (
    file: File,
    type: AttachmentType,
    skjemanummer: Skjemanummer
): Attachment => {
    return ({
        id: generateAttachmentId(),
        file,
        filename: file.name,
        filesize: file.size,
        pending: false,
        type,
        skjemanummer
    });
};

export const isAttachmentWithError = ({ pending, filesize, url }: Attachment) =>
    (pending === false && url === undefined) || filesize === 0;;

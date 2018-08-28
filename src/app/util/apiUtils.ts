import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';

import { Attachment } from 'common/storage/attachment/types/Attachment';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';

const isArrayOfAttachments = (object: object) => {
    return Array.isArray(object) && object.some((element) => element.filename);
};

const removeAttachmentsWithUploadError = (attachments: Attachment[]) =>
    attachments.filter((a: Attachment) => !isAttachmentWithError(a));

const fetchAndCleanUpAttachments = (object: object): Attachment[] => {
    const foundAttachments = [] as Attachment[];
    Object.keys(object).forEach((key: string) => {
        if (typeof object[key] === 'object') {
            if (isArrayOfAttachments(object[key])) {
                foundAttachments.push(
                    ...removeAttachmentsWithUploadError(object[key])
                );
                object[key] = (object[key] as Attachment[]).map(
                    (attachment: Attachment) => attachment.id
                );
            } else {
                foundAttachments.push(
                    ...fetchAndCleanUpAttachments(object[key])
                );
            }
        }
    });
    return foundAttachments;
};

export default {
    cleanupSøknad: (søknad: EngangsstonadSoknad) => {
        const { informasjonOmUtenlandsopphold } = søknad;
        const { iNorgeSiste12Mnd, tidligereOpphold } = informasjonOmUtenlandsopphold;
        const { iNorgeNeste12Mnd, senereOpphold } = informasjonOmUtenlandsopphold;

        if (iNorgeSiste12Mnd && tidligereOpphold.length > 0) {
            søknad.informasjonOmUtenlandsopphold.tidligereOpphold = [];
        }
        if (iNorgeNeste12Mnd && senereOpphold.length > 0) {
            søknad.informasjonOmUtenlandsopphold.senereOpphold = [];
        }

        søknad.vedlegg = fetchAndCleanUpAttachments(søknad);

        return søknad;
    }
};
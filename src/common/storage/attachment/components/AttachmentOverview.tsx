import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import VedleggInput from './AttachmentInput';
import AttachmentList from './AttachmentList';
import LabelText from '../../../components/labeltekst/Labeltekst';
import { bytesString, getTotalFileSize } from 'common/util/filesize';
import { isAttachmentWithError, mapFileToAttachment } from './util';
import { CSSTransition } from 'react-transition-group';
import { guid } from 'nav-frontend-js-utils';
import { Attachment, AttachmentType, Skjemanummer } from 'common/storage/attachment/types/Attachment';
import AlertstripeWithCloseButton from 'common/components/alertstripe-content/AlertstripeWithCloseButton';
import FormBlock from 'components/form-block/FormBlock';

interface Props {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    inputId?: string;
    showFileSize?: boolean;
    onFilesSelect: (files: Attachment[]) => void;
    onFileDelete: (file: Attachment[]) => void;
}

const AttachmentOverview: React.FunctionComponent<Props> = ({
    inputId = guid(),
    attachments,
    attachmentType,
    skjemanummer,
    showFileSize,
    onFileDelete,
    onFilesSelect,
}) => {
    const showErrorMessage: boolean = attachments.some(isAttachmentWithError);
    const attachmentsToRender = attachments.filter((a: Attachment) => !isAttachmentWithError(a));
    const showAttachments = attachmentsToRender.length > 0;

    const createErrorMessagesForFailedAttachments = (attachments: Attachment[]) => {
        const errorMessages: React.ReactNode[] = [];
        const attachmentsWithError = attachments.filter(isAttachmentWithError);
        const multipleErrors = attachmentsWithError.length > 1;

        attachmentsWithError.forEach((a: Attachment) => {
            const error = a.error;
            if (a.filesize === 0) {
                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? 'vedlegg.tomFil.flereFeil' : 'vedlegg.tomFil'}
                        values={{ filename: a.filename }}
                    />
                );
            } else if (error && error.response !== undefined && error.response.status === 413) {
                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? 'vedlegg.forStort.flereFeil' : 'vedlegg.forStort'}
                        values={{ filename: a.filename }}
                    />
                );
            } else if (error && error.response !== undefined && error.response.status === 422) {
                const intlId =
                    error.response.data &&
                    error.response.data.messages &&
                    error.response.data.messages.includes('AttachmentPasswordProtectedException')
                        ? 'vedlegg.passordbeskyttet'
                        : 'vedlegg.virus';

                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? `${intlId}.flereFeil` : intlId}
                        values={{ filename: a.filename }}
                    />
                );
            } else {
                errorMessages.push(
                    <FormattedMessage
                        id={multipleErrors ? 'vedlegg.feilmelding.flereFeil' : 'vedlegg.feilmelding'}
                        values={{ filename: a.filename }}
                    />
                );
            }
        });
        return errorMessages;
    };

    const deleteFailedAttachments = (): void => {
        onFileDelete(attachments.filter(isAttachmentWithError));
    };

    return (
        <React.Fragment>
            <FormBlock margin={showAttachments || showErrorMessage ? 'xs' : undefined}>
                <VedleggInput
                    id={inputId}
                    onFilesSelect={(files: File[]) => {
                        onFilesSelect(files.map((f) => mapFileToAttachment(f, attachmentType, skjemanummer)));
                    }}
                    onClick={deleteFailedAttachments}
                />
            </FormBlock>
            <CSSTransition
                classNames="transitionFade"
                timeout={150}
                in={showAttachments || showErrorMessage}
                unmountOnExit={true}
            >
                <>
                    {(showAttachments || showErrorMessage) && (
                        <>
                            <FormBlock margin="xs" visible={showErrorMessage} animated={true}>
                                <AlertstripeWithCloseButton
                                    lukknappProps={{
                                        hvit: false,
                                        type: 'button',
                                    }}
                                    errorMessages={createErrorMessagesForFailedAttachments(
                                        attachments.filter(isAttachmentWithError)
                                    )}
                                    onClose={deleteFailedAttachments}
                                />
                            </FormBlock>
                            <FormBlock margin="xs">
                                <LabelText>
                                    <FormattedMessage
                                        id="vedlegg.liste.tittel"
                                        values={{
                                            størrelse: bytesString(
                                                getTotalFileSize(attachmentsToRender.map((a: Attachment) => a.file))
                                            ),
                                        }}
                                    />
                                </LabelText>
                            </FormBlock>
                            <AttachmentList
                                attachments={attachmentsToRender}
                                showFileSize={showFileSize}
                                onDelete={(file: Attachment) => onFileDelete([file])}
                            />
                        </>
                    )}
                </>
            </CSSTransition>
        </React.Fragment>
    );
};
export default AttachmentOverview;

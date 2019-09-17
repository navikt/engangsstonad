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

export interface AttachmentOverviewProps {
    attachments: Attachment[];
    attachmentType: AttachmentType;
    skjemanummer: Skjemanummer;
    inputId?: string;
    showFileSize?: boolean;
    onFilesSelect: (files: Attachment[]) => void;
    onFileDelete: (file: Attachment) => void;
}

interface State {
    showErrorMessage: boolean;
    failedAttachments: Attachment[];
    errorMessage?: string;
}

type Props = AttachmentOverviewProps;
class AttachmentOverview extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showErrorMessage: false,
            failedAttachments: props.attachments.filter(isAttachmentWithError)
        };
        this.hideErrorMessage = this.hideErrorMessage.bind(this);
    }

    componentDidUpdate() {
        const attachmentsWithoutOldFailedAttachments = this.props.attachments.filter(
            (a: Attachment) => !this.state.failedAttachments.includes(a)
        );

        if (this.hasFailedAttachments(attachmentsWithoutOldFailedAttachments)) {
            this.setState(
                {
                    failedAttachments: this.state.failedAttachments.concat(
                        attachmentsWithoutOldFailedAttachments.filter(isAttachmentWithError)
                    )
                },
                () => {
                    this.showErrorMessage(this.createErrorMessage(attachmentsWithoutOldFailedAttachments[0].error));
                }
            );
        }
    }

    createErrorMessage(error: any): string {
        if (error && error.response && error.response.status === 413) {
            return 'vedlegg.forStort';
        }
        return 'vedlegg.feilmelding';
    }

    hasFailedAttachments(attachments: Attachment[]) {
        return attachments.some(isAttachmentWithError);
    }

    showErrorMessage(errorMessage: string) {
        this.setState({
            showErrorMessage: true,
            errorMessage
        });
    }

    hideErrorMessage() {
        this.setState({
            showErrorMessage: false,
            errorMessage: undefined
        });
    }

    render() {
        const {
            inputId = guid(),
            attachments,
            attachmentType,
            skjemanummer,
            showFileSize,
            onFileDelete,
            onFilesSelect
        } = this.props;

        const { showErrorMessage, errorMessage } = this.state;

        const attachmentsToRender = attachments.filter(
            (a: Attachment) => !isAttachmentWithError(a)
        );
        const showAttachments = attachmentsToRender.length > 0;

        return (
            <React.Fragment>
                <FormBlock
                    margin={
                        showAttachments || showErrorMessage
                            ? 'xs'
                            : undefined
                    }
                >
                    <VedleggInput
                        id={inputId}
                        onFilesSelect={(files: File[]) => {
                            onFilesSelect(
                                files.map((f) =>
                                    mapFileToAttachment(
                                        f,
                                        attachmentType,
                                        skjemanummer
                                    )
                                )
                            );
                        }}
                        onClick={this.hideErrorMessage}
                    />
                </FormBlock>
                <CSSTransition
                    classNames="transitionFade"
                    timeout={150}
                    in={showAttachments || showErrorMessage}
                    unmountOnExit={true}
                >
                    <React.Fragment>
                        {(showAttachments || showErrorMessage) && (
                            <React.Fragment>
                                <FormBlock
                                    margin="xs"
                                    visible={showErrorMessage}
                                    animated={true}
                                >
                                    <AlertstripeWithCloseButton
                                        alertStripeProps={{
                                            type: 'advarsel',
                                            children: (
                                                <FormattedMessage
                                                    id={errorMessage ? errorMessage : 'vedlegg.feilmelding'}
                                                />
                                            )
                                        }}
                                        lukknappProps={{
                                            hvit: true,
                                            type: 'button'
                                        }}
                                        onClose={this.hideErrorMessage}
                                    />
                                </FormBlock>
                                <FormBlock margin="xs">
                                    <LabelText>
                                        <FormattedMessage
                                            id="vedlegg.liste.tittel"
                                            values={{
                                                størrelse: bytesString(
                                                    getTotalFileSize(
                                                        attachmentsToRender.map(
                                                            (a: Attachment) =>
                                                                a.file
                                                        )
                                                    )
                                                )
                                            }}
                                        />
                                    </LabelText>
                                </FormBlock>
                                <AttachmentList
                                    attachments={attachmentsToRender}
                                    showFileSize={showFileSize}
                                    onDelete={(file: Attachment) =>
                                        onFileDelete(file)
                                    }
                                />
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </CSSTransition>
            </React.Fragment>
        );
    }
}
export default AttachmentOverview;

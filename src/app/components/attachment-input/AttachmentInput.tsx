import * as React from 'react';
import AttachmentButton from 'components/attachment/AttachmentButton';
import AttachmentList from 'components/attachment/AttachmentList';
import LabelText from 'components/labeltext/LabelText';
import { bytesString, getTotalFileSize } from 'components/attachment/utils';
import { ValidGroup } from '../../lib';
import { Validator } from '../../lib/types';
import { FormattedMessage } from 'react-intl';

export interface Props {
    vedlegg: File[];
    visFilstørrelse?: boolean;
    onFilesSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
    validators?: Validator[];
    listValidators?: Validator[];
}

class AttachmentInput extends React.Component<Props> {
    render() {
        const {
            vedlegg,
            visFilstørrelse,
            onFileDelete,
            onFilesSelect,
            validators,
            listValidators
        } = this.props;

        const totalSize = getTotalFileSize(vedlegg);

        return (
            <div className="attachments">
                <div className="blokk-m">
                    <ValidGroup validators={validators} name="vedleggKnapp">
                        <AttachmentButton
                            id="vedlegg"
                            onFileSelected={(files: File[]) => {
                                onFilesSelect(files);
                            }}
                        />
                    </ValidGroup>
                </div>
                {vedlegg.length > 0 && (
                    <ValidGroup validators={listValidators} name="vedlegg">
                        <div className="blokk-xs">
                            <LabelText>
                                <FormattedMessage
                                    id="vedlegg.liste.tittel"
                                    values={{
                                        størrelse: bytesString(totalSize)
                                    }}
                                />
                            </LabelText>
                        </div>
                        <AttachmentList
                            vedlegg={vedlegg}
                            visFilstørrelse={visFilstørrelse}
                            onDelete={(file: File) => onFileDelete(file)}
                        />
                    </ValidGroup>
                )}
            </div>
        );
    }
}

export default AttachmentInput;

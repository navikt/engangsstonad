import * as React from 'react';
import AttachmentButton from 'components/attachment/AttachmentButton';
import AttachmentList from 'components/attachment/AttachmentList';
import LabelText from 'components/labeltext/LabelText';
import { bytesString, getTotalFileSize } from 'components/attachment/utils';
import { ValidGroup } from '../../lib';
import { Validator } from '../../lib/types';

export interface Props {
    vedlegg: File[];
    visFilstørrelse?: boolean;
    onFilesSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
    validators: Validator[];
}

class AttachmentInput extends React.Component<Props> {
    render() {
        const {
            vedlegg,
            visFilstørrelse,
            onFileDelete,
            onFilesSelect,
            validators
        } = this.props;

        const totalSize = getTotalFileSize(vedlegg);

        return (
            <div className="attachments">
                <div className="blokk-m">
                    <AttachmentButton
                        id="vedlegg"
                        onFileSelected={(files: File[]) => {
                            onFilesSelect(files);
                        }}
                    />
                </div>
                {vedlegg.length > 0 && (
                    <ValidGroup validators={validators} name="vedlegg">
                        <div className="blokk-xs">
                            <LabelText>Valgte vedlegg</LabelText> ({bytesString(
                                totalSize
                            )})
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

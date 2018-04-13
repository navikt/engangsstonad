import React from 'react';
import AttachmentInput, {
    Props as AttachmentInputProps
} from './AttachmentInput';
import { ValidComponentProps } from '../../lib/types';

const ValidBase = require('../../lib').default;

type Props = AttachmentInputProps & ValidComponentProps;

class ValidAttachementInput extends React.Component<Props> {
    render() {
        const { ...other } = this.props;
        return <ValidBase component={AttachmentInput} {...other} />;
    }
}

export default ValidAttachementInput;

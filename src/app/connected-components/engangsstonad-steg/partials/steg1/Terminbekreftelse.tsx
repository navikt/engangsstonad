import * as React from 'react';
import Veilederinfo from 'components/veileder-info/Veilederinfo';
import { FormattedMessage } from 'react-intl';
import Attachments from 'components/attachment/Attachments';

export interface OwnProps {
    vedlegg: File[];
    onFileSelect: (files: File[]) => void;
    onFileDelete: (file: File) => void;
}

const Terminbekreftelse: React.StatelessComponent<OwnProps> = props => (
    <div className="terminbekreftelse">
        <div className="blokk-m">
            <Veilederinfo>
                <FormattedMessage id="terminbekreftelsen.text.terminbekreftelsen" />
            </Veilederinfo>
        </div>
        <Attachments {...props} />
    </div>
);

export default Terminbekreftelse;

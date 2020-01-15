import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Undertittel, Normaltekst } from 'nav-frontend-typografi';
const Modal = require('nav-frontend-modal').default;

import './modalContent.less';

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
}

const OmTerminbekreftelsen: React.StatelessComponent<Props> = ({ isOpen, onRequestClose }) => (
    <Modal isOpen={isOpen} closeButton={true} onRequestClose={onRequestClose} contentLabel="Om terminbekreftelsen">
        <div className="modalContent">
            <Undertittel className="modalContent__header">
                <FormattedMessage id="terminbekreftelsen.sectionheading" />
            </Undertittel>
            <Normaltekst className="modalContent__paragraph">
                <FormattedMessage id="terminbekreftelsen.text.terminbekreftelsen" />
            </Normaltekst>
        </div>
    </Modal>
);

export default OmTerminbekreftelsen;

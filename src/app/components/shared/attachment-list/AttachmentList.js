import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Icon from 'nav-frontend-ikoner-assets';

import './attachmentList.less';

const testData = [
    {
        label: 'terminbekreftelse.pdf'
    }
];

const AttachmentList = () => (
    testData.map((attachmentData) => (
        <div className="attchmentContainer" key={attachmentData.label}>
            <Normaltekst className="attachmentText">
                {attachmentData.label}
            </Normaltekst>
            <Icon kind="trashcan" size={20} />
        </div>
    ))
);
export default AttachmentList;

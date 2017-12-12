import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Icon from 'nav-frontend-ikoner-assets';

import './attachmentList.less';

const testData = [
    {
        label: 'vedlegg1.pdf'
    },
    {
        label: 'vedlegg2.pdf'
    }
];

const AttachmentList = () => (
    testData.map((attachmentData) => (
        <div key={attachmentData.label}>
            <Normaltekst className="attachmentText">
                {attachmentData.label}
            </Normaltekst>
            <Icon kind="trashcan" size={24} />
        </div>
    ))
);
export default AttachmentList;

import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import trashLogo from '../../../assets/svg/trash.svg';

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
        <div>
            <Normaltekst className="attachmentText">
                {attachmentData.label}
            </Normaltekst>
            {trashLogo}
        </div>
    ))
);
export default AttachmentList;

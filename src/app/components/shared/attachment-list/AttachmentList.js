import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import trashLogo from '../../../assets/svg/trash.svg';

import styles from './attachmentList.less';

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
            <Normaltekst className={styles.attachmentText} >
                {attachmentData.label}
            </Normaltekst>
            {trashLogo}
        </div>
    ))
);
export default AttachmentList;

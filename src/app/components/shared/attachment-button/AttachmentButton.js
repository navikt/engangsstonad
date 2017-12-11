import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import uploadLogo from '../../../assets/svg/upload.svg';
import styles from './attachmentButton.less';

const AttachmentButton = () => (
    <Knapp htmlType="button">
        <label htmlFor="files">
            <input id="files" className="hidden" type="file" />
            Last opp vedlegg
        </label>
        <img className={styles.uploadIcon} src={uploadLogo} alt="vedleggs ikon" />
    </Knapp>
);
export default AttachmentButton;


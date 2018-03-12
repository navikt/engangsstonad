import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
const Icon = require('nav-frontend-ikoner-assets').default;

import './attachment.less';

interface Props {
    vedlegg: File[];
    onDeleteClick?: (file: File) => void;
}

const AttachmentList: React.StatelessComponent<Props> = (props) => {
    const { vedlegg, onDeleteClick } = props;

    return (
            <ul className="attachmentList">
                {
                    vedlegg.map((vedleggFile, index) => (
                        <li className="attachmentList__Element" key={index}>
                            <Icon className="attachmentList__attachmentIcon" kind="vedlegg" size={20}/>
                            <Normaltekst className="attachmentList__fileName">{vedleggFile.name}</Normaltekst>
                            {onDeleteClick &&
                                <button
                                    type="button"
                                    className="js-toggle attachmentList__trashIcon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteClick(vedleggFile);
                                    }}
                                >
                                    <Icon kind="trashcan" size={20}/>
                                </button>
                            }
                        </li>
                    ))
                }
            </ul>
    );
};
export default AttachmentList;
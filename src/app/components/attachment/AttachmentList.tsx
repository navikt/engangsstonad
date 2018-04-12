import * as React from 'react';
const Icon = require('nav-frontend-ikoner-assets').default;

import './attachment.less';

interface Props {
    vedlegg: File[];
    onDelete?: (file: File) => void;
}

interface AttachmentProps {
    vedlegg: File;
    onDelete?: (file: File) => void;
}

const Attachment: React.StatelessComponent<AttachmentProps> = ({ vedlegg, onDelete }) => (
    <div className="attachment">
        <Icon className="attachment__icon" kind="vedlegg" size={20} />
        <span className="attachment__fileName">{vedlegg.name}</span>
        {onDelete && (
            <button
                type="button"
                className="js-toggle attachment__trashcan"
                aria-label={`Slett vedlegg (${vedlegg.name})`}
                onClick={e => {
                    e.stopPropagation();
                    onDelete(vedlegg);
                }}
            >
                <Icon kind="trashcan" size={20} />
            </button>
        )}
    </div>
);

const AttachmentList: React.StatelessComponent<Props> = props => {
    const { vedlegg, onDelete } = props;
    return (
        <ul className="attachmentList">
            {vedlegg.map((vedleggFile, index) => (
                <li key={index}>
                    <Attachment vedlegg={vedleggFile} onDelete={onDelete} />
                </li>
            ))}
        </ul>
    );
};
export default AttachmentList;

import * as React from 'react';
const Icon = require('nav-frontend-ikoner-assets').default;

import './attachment.less';
import { bytesString } from 'components/attachment/utils';

interface Props {
    vedlegg: File[];
    visFilstørrelse?: boolean;
    onDelete?: (file: File) => void;
}

interface AttachmentProps {
    vedlegg: File;
    visFilstørrelse?: Boolean;
    onDelete?: (file: File) => void;
}

const Attachment: React.StatelessComponent<AttachmentProps> = ({
    vedlegg,
    visFilstørrelse,
    onDelete
}) => (
    <div className="attachment">
        <Icon className="attachment__icon" kind="vedlegg" size={20} />
        <div className="attachment__fileName">
            {vedlegg.name}
            {visFilstørrelse && <div>{bytesString(vedlegg.size)}</div>}
        </div>
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
    const { vedlegg, visFilstørrelse, onDelete } = props;
    return (
        <ul className="attachmentList">
            {vedlegg.map((vedleggFile, index) => (
                <li key={index}>
                    <Attachment
                        vedlegg={vedleggFile}
                        onDelete={onDelete}
                        visFilstørrelse={visFilstørrelse}
                    />
                </li>
            ))}
        </ul>
    );
};
export default AttachmentList;

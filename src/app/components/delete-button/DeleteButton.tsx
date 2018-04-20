import * as React from 'react';
const Icon = require('nav-frontend-ikoner-assets').default;

import './deleteButton.less';

export interface Props {
    ariaLabel: string;
    onDelete: () => void;
}

const DeleteButton: React.StatelessComponent<Props> = ({
    onDelete,
    ariaLabel
}) => (
    <button
        type="button"
        className="deleteButton"
        aria-label={ariaLabel}
        onClick={e => {
            e.stopPropagation();
            onDelete();
        }}
    >
        <Icon kind="trashcan" size={20} />
    </button>
);

export default DeleteButton;

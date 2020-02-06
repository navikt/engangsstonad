import * as React from 'react';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import BEMHelper from 'common/util/bem';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import CustomSVG from 'common/components/custom-svg/CustomSVG';

import getMessage from 'common/util/i18nUtils';

const pencil = require('./pencil.svg').default;
import './interactiveListElement.less';

export interface InteractiveListElementProps {
    onEdit: () => void;
    onDelete: () => void;
    editButtonAriaText?: string;
    deleteButtonAriaText?: string;
}

interface AllListElementProps extends InteractiveListElementProps {
    title: string;
    text: string;
    deleteLinkText: string;
}

const bem = BEMHelper('interactiveListElement');

const InteractiveListElement: React.StatelessComponent<AllListElementProps & WrappedComponentProps> = ({
    title,
    text,
    deleteLinkText,
    deleteButtonAriaText,
    editButtonAriaText,
    onDelete,
    onEdit,
    intl
}) => {
    return (
        <li className={bem.className}>
            <div className={bem.element('top')}>
                <Normaltekst className="title">{title}</Normaltekst>
                <button
                    type="button"
                    className={bem.element('editButton')}
                    onClick={onEdit}
                    aria-label={editButtonAriaText || getMessage(intl, 'rediger')}
                >
                    <CustomSVG className={bem.element('editButton__icon')} iconRef={pencil} size={24} />
                </button>
            </div>
            <Normaltekst className={bem.element('text')}>{text}</Normaltekst>
            <div className={bem.element('bottom')}>
                <button
                    className={bem.element('deleteButton')}
                    onClick={onDelete}
                    type="button"
                    aria-label={deleteButtonAriaText}
                >
                    {deleteLinkText}
                </button>
            </div>
        </li>
    );
};

export default injectIntl(InteractiveListElement);

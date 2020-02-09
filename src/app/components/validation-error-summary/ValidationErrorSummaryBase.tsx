import * as  React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import BEMHelper from 'common/util/bem';
import { FormattedMessage } from 'react-intl';

import './validationErrorSummaryBase.less';

export interface ValidationSummaryError {
    name: string;
    message: string;
}

export interface ValidationErrorSummaryBaseProps {
    errors: ValidationSummaryError[];
    title: string;
    className?: string;
}

const bem = BEMHelper('validationErrorSummary');
const ValidationErrorSummaryBase: React.StatelessComponent<ValidationErrorSummaryBaseProps> = ({
    errors,
    title,
    className
}) => {
    return (
        <article tabIndex={-1} className={`${bem.className} ${className}`}>
            <Undertittel>{title}</Undertittel>
            <ul className={bem.element('list')}>
                {errors.map((error) => (
                    <li key={error.name}>
                        <a
                            className={bem.element('link')}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                const elementById = document.getElementById(error.name);
                                const elementByName = document.getElementsByName(error.name)[0];
                                if (elementById) {
                                    elementById.focus();
                                } else if (elementByName) {
                                    elementByName.focus();
                                }
                            }}
                        >
                            <FormattedMessage id={error.message} />
                        </a>
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default ValidationErrorSummaryBase;

import * as React from 'react';
import * as classNames from 'classnames';

const { Normaltekst } = require('nav-frontend-typografi');
const { Checkbox } = require('nav-frontend-skjema');

import './bekreftCheckbox.less';

interface Props {
    name?: string;
    checked: boolean;
    text?: string | JSX.Element;
    label: string;
    onChange: () => void;
}

export const BekreftCheckbox: React.StatelessComponent<Props> = ({ checked, text, ...other }) => {
    return (
        <div
            className={classNames('bekreftCheckbox', {
                'bekreftCheckbox--checked': checked,
                'bekreftCheckbox--unchecked': !checked
            })}
        >
            {text && (
                <Normaltekst className="bekreftCheckbox__text">
                    {text}
                </Normaltekst>
            )}
            <Checkbox checked={checked} {...other} />
        </div>
    );
};

export default BekreftCheckbox;

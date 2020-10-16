import React, { useEffect } from 'react';
import classNames from 'classnames';
import './validering-style.less';
import { SummaryError } from './types';

interface Props {
    title: string;
    show: boolean;
    className?: string;
    errors: SummaryError[];
}

const cls = (show: boolean, className?: string) =>
    classNames('feil-oppsummering-boks', className, {
        'feil-oppsummering-boks--visible': show,
    });

const FeilOppsummeringBoks: React.FunctionComponent<Props> = ({ className, show, errors, title, ...other }) => {
    let element: HTMLElement | null;

    useEffect(() => {
        if (element) {
            element.focus();
        }
    }, []);

    const listItems = errors.map((error) => {
        const link = '#' + error.name;
        return (
            <li key={error.name}>
                <a className="feil-oppsummering-boks__lenke" href={link}>
                    {error.text}
                </a>
            </li>
        );
    });

    return (
        <article
            ref={(node) => {
                element = node;
            }}
            tabIndex={-1}
            className={cls(show, className)}
            {...other}
        >
            <h1 className="typo-undertittel">{title}</h1>
            <ul className="feil-oppsummering-boks__liste">{listItems}</ul>
        </article>
    );
};

export default FeilOppsummeringBoks;

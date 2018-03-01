/* eslint-disable */
import React, { Component } from 'react';
import PT from 'prop-types';
import classNames from 'classnames';
import { Systemtittel } from 'nav-frontend-typografi';
import './validering-style.less';// eslint-disable-line import/extensions

const cls = (show, className) => classNames('feil-oppsummering-boks', className, {
    'feil-oppsummering-boks--visible': show
});

class FeilOppsummeringBoks extends Component {

    componentDidMount() {
        this.element.focus();
    }

    render() {
        const { className, show, errors, title, ...other } = this.props;
        const listItems = errors.map((error) => {
            const link = '#' + error.name; // eslint-disable-line prefer-template
            return (
                <li key={error.name}>
                    <a className="feil-oppsummering-boks__lenke" href={link}>
                        {error.text}
                    </a>
                </li>
            );
        });

        return (
            <article ref={(node) => { this.element = node; }} tabIndex="-1" className={cls(show, className)} {...other}>
                <Systemtittel>{title}</Systemtittel>
                <ul className="feil-oppsummering-boks__liste">
                    {listItems}
                </ul>
            </article>
        );
    }
}

FeilOppsummeringBoks.propTypes = {
    className: PT.string,
    title: PT.string.isRequired,
    show: PT.bool.isRequired,
    errors: PT.arrayOf(PT.shape({
        name: PT.string.isRequired,
        text: PT.string.isRequired
    })).isRequired
};

FeilOppsummeringBoks.defaultProps = {
    className: undefined
};

export default FeilOppsummeringBoks;
/* eslint-enable */

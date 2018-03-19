import * as React from 'react';
import * as classnames from 'classnames';

import AriaText from './../../components/aria/AriaText';

import './sirkelknapp.less';
import preventDoubleTapZoom from './../../util/preventDoubleTapZoom';
const { guid } = require('nav-frontend-js-utils');

export type Stil = 'hvit' | 'bla' | 'info';

export interface Props {
    /** Tekst som blir lest opp og satt som tittel på knappen */
    label: string;
    /** Ikon som brukes inne i knappen */
    ikon: React.ReactNode;
    /** Funksjon som kalles knappen klikkes på */
    onClick: () => void;
    /** Om knappen er disabled eller ikke. Default false. */
    disabled?: boolean;
    /** Om knappen skal ha tilstanded pressed/valgt. Default false. */
    toggle?: {
        pressed: boolean;
    };
    /** Layout varianter */
    stil?: Stil;
    /** Størrelse - default normal */
    size?: 'normal' | 'stor';
    buttonProps?: React.InputHTMLAttributes<HTMLButtonElement>;
}

const Sirkelknapp: React.StatelessComponent<Props> = ({
  onClick,
  label,
  ikon,
  toggle,
  disabled,
  buttonProps,
  stil = 'info',
  size = 'normal'
}) => {
    const labelId = guid();
    return (
        <button
            type="button"
            onClick={() => onClick()}
            onTouchStart={preventDoubleTapZoom}
            aria-labelledby={labelId}
            className={classnames(
                `sirkelknapp`,
                `sirkelknapp--${stil}`,
                `sirkelknapp--${size}`,
                {
                    'sirkelknapp--pressed': toggle && toggle.pressed
                }
            )}
            disabled={disabled}
            aria-pressed={toggle ? toggle.pressed : undefined}
            {...buttonProps}
        >
            <span className="sirkelknapp__ikon" role="presentation">
                {ikon}
            </span>
            <AriaText id={labelId}>{label}</AriaText>
        </button>
    );
};

export default Sirkelknapp;

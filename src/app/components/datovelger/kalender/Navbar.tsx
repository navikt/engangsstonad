import * as React from 'react';
import * as moment from 'moment';
import * as classnames from 'classnames';
import Chevron from '../elementer/ChevronSvg';

export interface Props {
    måned: Date;
    byttMåned: (month: Date) => void;
    byttÅr?: (month: Date) => void;
    min?: Date;
    maks?: Date;
}

export interface NavbarKnappProps {
    måned: Date;
    retning: 'forrige' | 'neste';
    disabled: boolean;
    onClick: (evt: React.MouseEvent<HTMLButtonElement>, måned: Date) => void;
}

const NavbarKnapp: React.StatelessComponent<NavbarKnappProps> = ({ måned, retning, disabled, onClick }) => {
    const label = retning === 'forrige' ? 'Forrige måned' : 'Neste måned';

    return (
        <button
            className={classnames('nav-datovelger__navbar__knapp', `nav-datovelger__navbar__knapp--${retning}`, {
                'nav-datovelger__navbar__knapp--disabled': disabled
            })}
            type="button"
            onClick={e => (disabled ? null : onClick(e, måned))}
            aria-label={label}
            aria-disabled={disabled}
            role="button"
        >
            <Chevron retning={retning === 'forrige' ? 'venstre' : 'høyre'} />
        </button>
    );
};

const Navbar: React.StatelessComponent<Props> = ({ måned, byttMåned, min, maks }) => {
    const forrigeMåned = moment(måned).add(-1, 'months');
    const nesteMåned = moment(måned).add(1, 'months');

    const forrigeErDisabled = min ? moment(min).isAfter(forrigeMåned.endOf('month')) : false;

    const nesteErDisabled = maks ? moment(maks).isBefore(nesteMåned.startOf('month')) : false;

    const onClick = (evt: React.MouseEvent<HTMLButtonElement>, mnd: Date) => {
        evt.preventDefault();
        evt.stopPropagation();
        byttMåned(mnd);
    };

    return (
        <div className="nav-datovelger__navbar" role="nav">
            <NavbarKnapp måned={forrigeMåned.toDate()} retning="forrige" disabled={forrigeErDisabled} onClick={onClick} />
            <NavbarKnapp måned={nesteMåned.toDate()} retning="neste" disabled={nesteErDisabled} onClick={onClick} />
        </div>
    );
};

export default Navbar;

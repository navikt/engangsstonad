import * as React from 'react';

const { Normaltekst } = require('nav-frontend-typografi');
const Icon = require('nav-frontend-ikoner-assets').default;
import { ISODateToMaskedInput } from '../../../util/date/dateUtils';
import './countryPicker.less';
import { Periode } from '../../../types/domain/Utenlandsopphold';

interface Props {
    utenlandsopphold: Periode;
    onDeleteClick: (periode: Periode) => void;
    onEditClick: (periode: Periode) => void;
}

const CountryListElement: React.StatelessComponent<Props> = (props) => {
    const { fom, tom, land } = props.utenlandsopphold;

    return (
        <li id="helediv" className="countryElement" onClick={() => props.onEditClick(props.utenlandsopphold)}>
            <span className={`flag-icon flag-icon-${land.toLowerCase()}`} />
            <Normaltekst className="countryElement__date">
                {ISODateToMaskedInput(fom)} - {ISODateToMaskedInput(tom)}
            </Normaltekst>
            <button
                type="button"
                className="js-toggle countryElement__deleteButton"
                onClick={(e) => {
                    e.stopPropagation();
                    props.onDeleteClick(props.utenlandsopphold);
                }}
            >
                <Icon kind="trashcan" size={20} />
            </button>
        </li>
    );
};
export default CountryListElement;

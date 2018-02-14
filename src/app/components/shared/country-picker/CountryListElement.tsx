import * as React from 'react';

const { Normaltekst } = require('nav-frontend-typografi');
const Icon = require('nav-frontend-ikoner-assets').default;
import { ISODateToMaskedInput } from '../../../util/date/dateUtils';
import { utlandsopphold } from './types';
import './countryPicker.less';

interface Props {
    visit: utlandsopphold;
    onDeleteClick: (utl: utlandsopphold) => void;
    onEditClick: (utl: utlandsopphold) => void;
}

const CountryListElement: React.StatelessComponent<Props> = (props) => {
    const { land, startDato, sluttDato } = props.visit;
    return (
        <div id="helediv" className="countryElement" onClick={() => props.onEditClick(props.visit)}>
            <span className={`flag-icon flag-icon-${land.toLowerCase()}`} />
            <Normaltekst className="countryElement__date">
                {ISODateToMaskedInput(startDato)} - {ISODateToMaskedInput(sluttDato)}
            </Normaltekst>
            <button
                type="button"
                className="js-toggle countryElement__deleteButton"
                onClick={(e) => {
                    e.stopPropagation();
                    props.onDeleteClick(props.visit);
                }}
            >
                <Icon kind="trashcan" size={20} />
            </button>
        </div>
    );
};
export default CountryListElement;

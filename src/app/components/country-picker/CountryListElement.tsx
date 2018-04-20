import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import classnames from 'classnames';
import { injectIntl, InjectedIntlProps } from 'react-intl';

const { Normaltekst } = require('nav-frontend-typografi');

import { ISODateToMaskedInput } from 'util/date/dateUtils';
import getMessage from 'util/i18n/i18nUtils';
import { Periode } from '../../types/domain/Utenlandsopphold';

import './countryPicker.less';
import DeleteButton from 'components/delete-button/DeleteButton';
import LinkButton from 'components/link-button/LinkButton';

interface OwnProps {
    utenlandsopphold: Periode;
    onDeleteClick?: (periode: Periode) => void;
    onEditClick?: (periode: Periode) => void;
}

type Props = OwnProps & InjectedIntlProps;

const CountryListSummaryElement: React.StatelessComponent<Props> = props => {
    const { varighet, land } = props.utenlandsopphold;
    const { onDeleteClick, onEditClick } = props;
    const onEditClickHandler = () => {
        if (onEditClick !== undefined) {
            onEditClick(props.utenlandsopphold);
        }
    };

    return (
        <li
            className={classnames('countryListElement', {
                countryListElement__editable: onEditClick !== undefined
            })}
        >
            <div className="countryListElement__textWrapper">
                <LinkButton onClick={onEditClickHandler}>
                    <Normaltekst className="countryListElement__country">
                        {countries.getName(land, 'nb')}
                    </Normaltekst>
                    <Normaltekst className="countryListElement__date">
                        {getMessage(props.intl, 'standard.text.fromTo', {
                            from: ISODateToMaskedInput(varighet.fom),
                            to: ISODateToMaskedInput(varighet.tom)
                        })}
                    </Normaltekst>
                </LinkButton>
            </div>
            {onDeleteClick && (
                <span className="countryListElement__delete">
                    <DeleteButton
                        ariaLabel="Slett utenlandsopphold"
                        onDelete={() => onDeleteClick(props.utenlandsopphold)}
                    />
                </span>
            )}
        </li>
    );
};
export default injectIntl(CountryListSummaryElement);

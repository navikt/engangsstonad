import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as countries from 'i18n-iso-countries';
import classnames from 'classnames';

import { ISODateToMaskedInput } from '../../util/date/dateUtils';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import SlettKnapp from '../../../common/components/slett-knapp/SlettKnapp';
import LinkButton from '../../components/link-button/LinkButton';
import { Language } from '../../intl/IntlProvider';

import './utenlandsopphold.less';

interface Props {
    utenlandsopphold: Utenlandsopphold;
    onDeleteClick?: (periode: Utenlandsopphold) => void;
    onEditClick?: (periode: Utenlandsopphold) => void;
}

const CountryListSummaryElement: React.StatelessComponent<Props> = ({
    utenlandsopphold,
    onDeleteClick,
    onEditClick
}) => {
    const { tidsperiode, land } = utenlandsopphold;
    const onEditClickHandler = () => {
        if (onEditClick !== undefined) {
            onEditClick(utenlandsopphold);
        }
    };

    return (
        <li
            className={classnames('countryListElement', {
                countryListElement__editable: onEditClick !== undefined
            })}
        >
            <div className="countryListElement__stay">
                <LinkButton onClick={onEditClickHandler}>
                    <div className="countryListElement__nameAndDate">
                        <div className="countryListElement__country">{countries.getName(land, Language.BOKMÅL)}</div>
                        <div className="countryListElement__date">
                            <FormattedMessage
                                id="standard.text.fromTo"
                                values={{
                                    from: ISODateToMaskedInput(tidsperiode.fom),
                                    to: ISODateToMaskedInput(tidsperiode.tom)
                                }}
                            />
                        </div>
                    </div>
                </LinkButton>
            </div>
            {onDeleteClick && (
                <span className="countryListElement__delete">
                    <SlettKnapp ariaLabel="Slett utenlandsopphold" onClick={() => onDeleteClick(utenlandsopphold)} />
                </span>
            )}
        </li>
    );
};
export default CountryListSummaryElement;

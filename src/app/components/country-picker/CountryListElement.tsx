import React from 'react';
import * as countries from 'i18n-iso-countries';
import classnames from 'classnames';
import { useIntl } from 'react-intl';
import { ISODateToMaskedInput } from 'util/date/dateUtils';
import getMessage from 'common/util/i18nUtils';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import SlettKnapp from 'common/components/slett-knapp/SlettKnapp';
import LinkButton from 'components/link-button/LinkButton';
import './countryPicker.less';

interface Props {
    utenlandsopphold: Utenlandsopphold;
    onDeleteClick?: (periode: Utenlandsopphold) => void;
    onEditClick?: (periode: Utenlandsopphold) => void;
}

const CountryListSummaryElement: React.FunctionComponent<Props> = ({
    utenlandsopphold,
    onDeleteClick,
    onEditClick,
}) => {
    const intl = useIntl();
    const { tidsperiode, land } = utenlandsopphold;
    const onEditClickHandler = () => {
        if (onEditClick !== undefined) {
            onEditClick(utenlandsopphold);
        }
    };

    return (
        <li
            className={classnames('countryListElement', {
                countryListElement__editable: onEditClick !== undefined,
            })}
        >
            <div className="countryListElement__stay">
                <LinkButton onClick={onEditClickHandler}>
                    <div className="countryListElement__nameAndDate">
                        <div className="countryListElement__country">{countries.getName(land, 'nb')}</div>
                        <div className="countryListElement__date">
                            {getMessage(intl, 'standard.text.fromTo', {
                                from: ISODateToMaskedInput(tidsperiode.fom),
                                to: ISODateToMaskedInput(tidsperiode.tom),
                            })}
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

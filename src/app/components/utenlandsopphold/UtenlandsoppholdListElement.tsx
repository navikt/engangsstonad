import * as React from 'react';
import * as countries from 'i18n-iso-countries';
import classnames from 'classnames';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { ISODateToMaskedInput } from '../../util/date/dateUtils';
import getMessage from '../../../common/util/i18nUtils';
import { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';

import SlettKnapp from '../../../common/components/slett-knapp/SlettKnapp';
import LinkButton from '../../components/link-button/LinkButton';
import { Language } from '../../intl/IntlProvider';

import './utenlandsopphold.less';

interface OwnProps {
    utenlandsopphold: Utenlandsopphold;
    onDeleteClick?: (periode: Utenlandsopphold) => void;
    onEditClick?: (periode: Utenlandsopphold) => void;
}

type Props = OwnProps & InjectedIntlProps;

const CountryListSummaryElement: React.StatelessComponent<Props> = props => {
    const { tidsperiode, land } = props.utenlandsopphold;
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
            <div className="countryListElement__stay">
                <LinkButton onClick={onEditClickHandler}>
                    <div className="countryListElement__nameAndDate">
                        <div className="countryListElement__country">{countries.getName(land, Language.BOKMÅL)}</div>
                        <div className="countryListElement__date">
                            {getMessage(props.intl, 'standard.text.fromTo', {
                                from: ISODateToMaskedInput(tidsperiode.fom),
                                to: ISODateToMaskedInput(tidsperiode.tom)
                            })}
                        </div>
                    </div>
                </LinkButton>
            </div>
            {onDeleteClick && (
                <span className="countryListElement__delete">
                    <SlettKnapp ariaLabel="Slett utenlandsopphold" onClick={() => onDeleteClick(props.utenlandsopphold)} />
                </span>
            )}
        </li>
    );
};
export default injectIntl(CountryListSummaryElement);

import * as React from 'react';
import { Utenlandsopphold } from '../../../types/domain/InformasjonOmUtenlandsopphold';
import InteractiveListElement from 'components/interactive-list-element/InteractiveListElement';

import './utenlandsoppholdList.less';

interface CountryListProps {
    utenlandsoppholdListe: Utenlandsopphold[];
    onEditClick: (periode: Utenlandsopphold) => void;
    onDeleteClick: (periode: Utenlandsopphold) => void;
}

export const CountryList: React.StatelessComponent<CountryListProps> = ({
    onDeleteClick,
    onEditClick,
    utenlandsoppholdListe
}) => {
    return (
        <ul className="utenlandsopphold-list">
            {utenlandsoppholdListe.map((utenlandsopphold) => (
                <InteractiveListElement
                    title={utenlandsopphold.land}
                    text={utenlandsopphold.tidsperiode.fom}
                    deleteLinkText={'Slett'}
                    onDelete={() => onDeleteClick(utenlandsopphold)}
                    onEdit={() => onEditClick(utenlandsopphold)}
                />
            ))}
        </ul>
    );
};

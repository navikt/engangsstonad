import React from 'react';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import Icon from 'nav-frontend-ikoner-assets';

type Props = {
    title: string
};

const NumberSelector = (props: Props) => (
    <SkjemaGruppe title={props.title}>
        <Icon kind="minus" />
        <input className="counterBox" disabled />
        <Icon kind="tilsette" />
    </SkjemaGruppe>
);
export default NumberSelector;

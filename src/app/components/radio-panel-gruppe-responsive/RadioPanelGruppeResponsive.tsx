import * as React from 'react';
import * as classnames from 'classnames';
import { SkjemaGruppe, RadioPanel, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import { guid } from 'nav-frontend-js-utils';

import './radioPanelGruppeResponsive.less';

interface Props extends RadioPanelGruppeProps {
    twoColumns?: boolean;
}

export const RadioPanelGruppeResponsive: React.StatelessComponent<Props> = ({
    checked,
    name,
    legend,
    radios,
    onChange,
    twoColumns = false
}) => {
    return (
        <SkjemaGruppe className={'radioPanelGruppe'}>
            <legend className="radioPanelGruppe__legend">{legend}</legend>
            <div className={classnames('radioPanelGruppe--responsive', { 'radioPanelGruppe--twoColumns': twoColumns })}>
                {radios.map(({ value, ...rest }) => (
                    <div
                        className={classnames('radioPanelWrapper', { 'radioPanelWrapper--twoColumns': twoColumns })}
                        key={guid()}
                    >
                        <RadioPanel
                            checked={checked === value}
                            name={name}
                            onChange={(event: any) => onChange(event, value)}
                            value={value}
                            {...rest}
                        />
                    </div>
                ))}
            </div>
        </SkjemaGruppe>
    );
};

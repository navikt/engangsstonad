import * as React from 'react';
import * as classnames from 'classnames';
import { SkjemaGruppe, RadioPanel, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import { guid } from 'nav-frontend-js-utils';

import './radioPanelGruppeResponsive.less';

export const RadioPanelGruppeResponsive: React.StatelessComponent<RadioPanelGruppeProps> = ({
    className,
    checked,
    name,
    legend,
    radios,
    onChange
}) => {
    return (
        <SkjemaGruppe className={classnames('radioPanelGruppe', className)}>
            <legend className="radioPanelGruppe__legend">{legend}</legend>
            <div className="radioPanelGruppe--responsive">
                {radios.map(({ value, ...rest }) => (
                    <div className={'radioPanelWrapper'} key={guid()}>
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

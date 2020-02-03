import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import * as classnames from 'classnames';
import { SkjemaGruppe, RadioPanel, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import { guid } from 'nav-frontend-js-utils';

import './radioPanelGruppeResponsive.less';

interface Props extends RadioPanelGruppeProps {
    twoColumns?: boolean;
}

export const RadioPanelGruppeResponsive: React.StatelessComponent<Props> = ({
    twoColumns = false,
    checked,
    name,
    radios,
    onChange
}) => {
    return (
        <div className="radioPanelGruppe">
            <SkjemaGruppe>
                <legend className="radioPanelGruppe__legend">
                    <FormattedMessage id={name} />
                </legend>
                <div className="radioPanelGruppe--responsive">
                    {radios.map(({ value, ...rest }) => {
                        const cls = classnames('radioPanelWrapper', {
                            'radioPanelWrapper--twoColumns': twoColumns === true
                        });
                        return (
                            <div className={cls} key={guid()}>
                                <RadioPanel
                                    checked={checked === value}
                                    name={name}
                                    onChange={(event: any) => onChange(event, value)}
                                    value={value}
                                    {...rest}
                                />
                            </div>
                        );
                    })}
                </div>
            </SkjemaGruppe>
        </div>
    );
};

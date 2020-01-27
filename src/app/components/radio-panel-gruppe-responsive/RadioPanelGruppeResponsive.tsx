import * as React from 'react';
import * as classnames from 'classnames';
import { SkjemaGruppe, Fieldset, RadioPanel, RadioPanelGruppeProps } from 'nav-frontend-skjema';
import { guid } from 'nav-frontend-js-utils';

import './radioPanelGruppeResponsive.less';

interface Props extends RadioPanelGruppeProps {
    twoColumns?: boolean;
}

export default class RadioPanelGruppeResponsive extends React.Component<Props> {
    render() {
        const { feil, twoColumns = false, legend, checked, name, radios, onChange } = this.props;
        const cls = classnames('radioPanelWrapper', {
            'radioPanelWrapper--twoColumns': twoColumns === true
        });
        return (
            <div className="radioPanelGruppe">
                <Fieldset legend={legend}>
                    <SkjemaGruppe className="radioPanelGruppe--responsive" feil={feil}>
                        {radios.map(({ value, inputProps, ...rest }) => {
                            return (
                                <div className={cls} key={guid()}>
                                    <RadioPanel
                                        id={inputProps?.id}
                                        checked={checked === value}
                                        name={name}
                                        onChange={(event: any) => onChange(event, value)}
                                        value={value}
                                        {...rest}
                                    />
                                </div>
                            );
                        })}
                    </SkjemaGruppe>
                </Fieldset>
            </div>
        );
    }
}

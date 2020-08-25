import React from 'react';
import classnames from 'classnames';
import { RadioPanelGruppeProps, SkjemaGruppe, RadioPanel } from 'nav-frontend-skjema';

import './radioPanelGruppeResponsive.less';
import Fieldset from 'components/fieldset/Fieldset';

interface Props extends RadioPanelGruppeProps {
    twoColumns?: boolean;
}

export default class RadioPanelGruppeResponsive extends React.Component<Props> {
    render() {
        const { feil, twoColumns = false, legend, checked, name, radios, onChange } = this.props;

        const cls = classnames('radioPanelWrapper', {
            'radioPanelWrapper--twoColumns': twoColumns === true,
        });
        return (
            <div className="radioPanelGruppe">
                <Fieldset legend={legend}>
                    <SkjemaGruppe className="radioPanelGruppe--responsive" feil={feil}>
                        {radios.map((radio) => {
                            return (
                                <div className={cls} key={radio.value as string}>
                                    <RadioPanel
                                        checked={checked === radio.value}
                                        name={name}
                                        onChange={(event: any) => onChange(event, radio.value)}
                                        {...radio}
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

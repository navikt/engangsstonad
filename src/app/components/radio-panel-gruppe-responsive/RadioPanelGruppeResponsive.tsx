import * as React from 'react';
const { SkjemaGruppe, Fieldset, RadioPanel } = require('nav-frontend-skjema');
import { RadioPanelGruppeProps } from 'nav-frontend-skjema';
import './radioPanelGruppeResponsive.less';
import 'nav-frontend-skjema-style';

export default class RadioPanelGruppeResponsive extends React.Component<
    RadioPanelGruppeProps
> {
    render() {
        const { feil, legend, checked, name, radios, onChange } = this.props;
        return (
            <div className="radioPanelGruppe">
                <Fieldset legend={legend}>
                    <SkjemaGruppe className="radioPanelGruppe--responsive" feil={feil}>
                            {
                                radios.map((radio) => (
                                    <div className="radioPanelWrapper" key={radio.value}>
                                        <RadioPanel
                                            checked={checked === radio.value}
                                            name={name}
                                            onChange={(event: any) => onChange(event, radio.value)}
                                            {...radio}
                                        />
                                    </div>
                                ))
                            }
                    </SkjemaGruppe>
                </Fieldset>
            </div>
        );
    }
}

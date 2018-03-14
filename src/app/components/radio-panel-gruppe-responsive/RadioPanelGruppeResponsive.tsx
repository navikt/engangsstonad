import * as React from 'react';
const { RadioPanelGruppe } = require('nav-frontend-skjema');
import { RadioPanelGruppeProps } from 'nav-frontend-skjema';
import './radioPanelGruppeResponsive.less';

export default class RadioPanelGruppeResponsive extends React.Component<RadioPanelGruppeProps> {
    render() {
        return (
            <div className="radioPanelGruppeResponsive">
                <RadioPanelGruppe {...this.props} />
            </div>
        );
    }
}

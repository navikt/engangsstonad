import React, { Component } from 'react';

import { Normaltekst, Element } from 'nav-frontend-typografi';
import { ToggleGruppe, ToggleKnapp } from 'nav-frontend-skjema';

import DialogBox from '../../shared/dialog-box/DialogBox';
import CountryPicker from '../../shared/country-picker/CountryPicker';
import NumberSelector from '../../shared/number-selector/NumberSelector';

class Step3 extends Component {
    constructor(props) {
        super(props);
        this.toggleSisteTolv = this.toggleSisteTolv.bind(this);
        this.toggleOppholdNaa = this.toggleOppholdNaa.bind(this);
        this.toggleNesteTolv = this.toggleNesteTolv.bind(this);

        this.state = {
            oppholdSisteTolv: undefined,
            oppholdNaa: undefined,
            oppholdNesteTolv: undefined
        };
    }

    toggleSisteTolv(e) {
        this.setState({
            oppholdSisteTolv: e.target.value === 'ja'
        });
    }

    toggleOppholdNaa(e) {
        this.setState({
            oppholdNaa: e.target.value === 'ja'
        });
    }

    toggleNesteTolv(e) {
        this.setState({
            oppholdNesteTolv: e.target.value === 'ja'
        });
    }

    render() {
        return (
            <div>
                <DialogBox type="info">
                    <Normaltekst>
                        Vi fant denne informasjonen om din adresse og trenger
                        at du svarer på tre spørsmål om ditt opphold i Norge.
                    </Normaltekst>
                    <Normaltekst>
                        Korte ferier i utlandet regnes ikke som opphold i utlandet.
                    </Normaltekst>
                </DialogBox>
                <Element>De siste 12 månedene så har jeg sammenhengende...</Element>
                <ToggleGruppe onChange={this.toggleSisteTolv} name="oppholdSisteTolv">
                    <ToggleKnapp value="ja">oppholdt meg i Norge</ToggleKnapp>
                    <ToggleKnapp value="nei">ikke oppholdt meg i Norge</ToggleKnapp>
                </ToggleGruppe>
                {this.state.oppholdSisteTolv === false &&
                    <div>
                        <Element>ettersom jeg var i utlandet...</Element>
                        <NumberSelector />
                        <Element>gang. Jeg oppholdte meg i...</Element>
                        <CountryPicker />
                    </div>
                }
                <Element>Jeg oppholder meg...</Element>
                <ToggleGruppe onChange={this.toggleOppholdNaa} name="toggleOppholdNaa">
                    <ToggleKnapp value="ja">i Norge nå</ToggleKnapp>
                    <ToggleKnapp value="nei">ikke i Norge nå</ToggleKnapp>
                </ToggleGruppe>
                {this.state.oppholdNaa === false &&
                <div>
                    <Element>ettersom jeg var i utlandet...</Element>
                    <NumberSelector />
                    <Element>gang. Jeg oppholdte meg i...</Element>
                    <CountryPicker />
                </div>
                }
                <Element>Og de neste 12 månedene så kommer jeg sammenhengende til å...</Element>
                <ToggleGruppe onChange={this.toggleNesteTolv} name="oppholdNesteTolv">
                    <ToggleKnapp value="ja">oppholde meg i Norge</ToggleKnapp>
                    <ToggleKnapp value="nei">ikke oppholde meg i Norge</ToggleKnapp>
                </ToggleGruppe>
                {this.state.oppholdNesteTolv === false &&
                <div>
                    <Element>ettersom jeg var i utlandet...</Element>
                    <NumberSelector />
                    <Element>gang. Jeg oppholdte meg i...</Element>
                    <CountryPicker />
                </div>
                }
            </div>
        );
    }
}

export default Step3;

import React, { Component } from 'react';

import { Normaltekst, Element } from 'nav-frontend-typografi';
import { ToggleGruppe, ToggleKnapp } from 'nav-frontend-skjema';

import DialogBox from '../../shared/dialog-box/DialogBox';
import DateInput from '../../shared/date-input/DateInput';
import AttchmentList from '../../shared/attachment-list/AttachmentList';
import AttchmentButton from '../../shared/attachment-button/AttachmentButton';

class Step2 extends Component {
    constructor(props) {
        super(props);
        this.toggleBirth = this.toggleBirth.bind(this);

        this.state = {
            childBorn: undefined
        };
    }

    toggleBirth(e) {
        this.setState({ childBorn: e.target.value === 'childBorn' });
    }

    render() {
        return (
            <div className="engangsstonadStep2">
                <DialogBox type="info">
                    <Normaltekst>
                        Vi trenger mer informasjon fra deg om barnet eller barna søknaden gjelder
                    </Normaltekst>
                </DialogBox>
                <Element>Søknaden gjelder en fødsel som er...</Element>
                <ToggleGruppe onChange={this.toggleBirth} name="isChildBorn">
                    <ToggleKnapp value="childBorn">tilbake i tid</ToggleKnapp>
                    <ToggleKnapp value="childNotBorn">frem i tid</ToggleKnapp>
                </ToggleGruppe>
                {this.state.childBorn === false &&
                    <div>
                        <Element>og jeg venter...</Element>
                        <ToggleGruppe onChange={() => undefined} name="noOfChildren">
                            <ToggleKnapp value="1">et barn</ToggleKnapp>
                            <ToggleKnapp value="2">tvillinger</ToggleKnapp>
                            <ToggleKnapp value="3">trillinger</ToggleKnapp>
                        </ToggleGruppe>
                        <Element>med termindato den...</Element>
                        <DateInput label="" />
                        <DialogBox type="warning">
                            <Normaltekst>
                                Siden barnet ikke er født må du legge ved terminbekreftelse fra jordmor eller lege
                            </Normaltekst>
                        </DialogBox>
                        <AttchmentList label="" />
                        <AttchmentButton />
                    </div>
                }
            </div>
        );
    }
}

export default Step2;

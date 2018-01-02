import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Normaltekst, Element } from 'nav-frontend-typografi';
import { ToggleGruppe, ToggleKnapp } from 'nav-frontend-skjema';

import {
    toggleChildBorn,
    enableNextButton,
    disableNextButton,
    toggleNoOfChildren,
    setTerminDato,
    setBekreftetTermindato
} from 'ducks/Engangsstonad.duck';

import DialogBox from 'shared/dialog-box/DialogBox';
import DateInput from 'shared/date-input/DateInput';
import AttachmentList from 'shared/attachment-list/AttachmentList';
import AttachmentButton from 'shared/attachment-button/AttachmentButton';

export class Step2 extends Component {
    constructor(props) {
        super(props);
        this.shouldNextButtonBeEnabled = this.shouldNextButtonBeEnabled.bind(this);

        if (this.shouldNextButtonBeEnabled(props)) {
            this.props.enableNextButton();
        } else {
            this.props.disableNextButton();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.shouldNextButtonBeEnabled(nextProps)) {
            return this.props.enableNextButton();
        }

        return this.props.disableNextButton();
    }

    shouldNextButtonBeEnabled(props) {
        if (props.childBorn ||
            (!props.childBorn
                && props.noOfChildren
                && props.terminDato
                && props.bekreftetTermindato)
        ) {
            return true;
        }
        return false;
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
                <ToggleGruppe onChange={this.props.toggleChildBorn} name="isChildBorn">
                    <ToggleKnapp
                        defaultChecked={this.props.childBorn}
                        value="ja"
                    >
                        tilbake i tid
                    </ToggleKnapp>
                    <ToggleKnapp
                        defaultChecked={this.props.childBorn === false}
                        value="nei"
                    >
                        frem i tid
                    </ToggleKnapp>
                </ToggleGruppe>
                {this.props.childBorn === false &&
                    <div>
                        <Element>og jeg venter...</Element>
                        <ToggleGruppe onChange={this.props.toggleNoOfChildren} name="noOfChildren">
                            <ToggleKnapp
                                defaultChecked={this.props.noOfChildren === '1'}
                                value="1"
                            >
                                et barn
                            </ToggleKnapp>
                            <ToggleKnapp
                                defaultChecked={this.props.noOfChildren === '2'}
                                value="2"
                            >
                                tvillinger
                            </ToggleKnapp>
                            <ToggleKnapp
                                defaultChecked={this.props.noOfChildren === '3'}
                                value="3"
                            >
                                trillinger
                            </ToggleKnapp>
                        </ToggleGruppe>
                        {this.props.noOfChildren &&
                            <div>
                                <DateInput
                                    input={{ value: this.props.terminDato }}
                                    label="med termindato den..."
                                    onChange={(e) => this.props.setTerminDato(e)}
                                />
                                {this.props.terminDato &&
                                    <div>
                                        <DialogBox type="warning">
                                            <Normaltekst>
                                                Siden barnet ikke er født må du legge ved
                                                terminbekreftelse fra jordmor eller lege
                                            </Normaltekst>
                                        </DialogBox>
                                        <AttachmentList label="" />
                                        <AttachmentButton />

                                        <DateInput
                                            input={{ value: this.props.bekreftetTermindato }}
                                            label="Terminbekreftelsen er datert den..."
                                            onChange={(e) => this.props.setBekreftetTermindato(e)}
                                        />
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}

Step2.propTypes = {
    toggleChildBorn: PropTypes.func.isRequired,
    enableNextButton: PropTypes.func.isRequired,
    disableNextButton: PropTypes.func.isRequired,
    toggleNoOfChildren: PropTypes.func.isRequired,
    setBekreftetTermindato: PropTypes.func.isRequired,
    setTerminDato: PropTypes.func.isRequired,
    noOfChildren: PropTypes.string,
    childBorn: PropTypes.bool,
    terminDato: PropTypes.string,
    bekreftetTermindato: PropTypes.string
};

Step2.defaultProps = {
    childBorn: undefined,
    noOfChildren: undefined,
    terminDato: undefined,
    bekreftetTermindato: undefined
};

const mapStateToProps = (state) => ({
    childBorn: state.engangsstonadReducer.childBorn,
    noOfChildren: state.engangsstonadReducer.noOfChildren,
    terminDato: state.engangsstonadReducer.terminDato,
    bekreftetTermindato: state.engangsstonadReducer.bekreftetTermindato
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    toggleChildBorn,
    enableNextButton,
    disableNextButton,
    toggleNoOfChildren,
    setTerminDato,
    setBekreftetTermindato
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Step2);

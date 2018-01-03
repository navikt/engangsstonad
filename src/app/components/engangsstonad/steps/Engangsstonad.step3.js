import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { Normaltekst, Element } from 'nav-frontend-typografi';
import { ToggleGruppe, ToggleKnapp } from 'nav-frontend-skjema';

import {
    toggleSisteTolv,
    toggleNesteTolv,
    toggleOppholdNaa,
    enableNextButton,
    disableNextButton
} from 'ducks/Engangsstonad.duck';

import DialogBox from 'shared/dialog-box/DialogBox';
import CountryPicker from 'shared/country-picker/CountryPicker';
import NumberSelector from 'shared/number-selector/NumberSelector';

export class Step3 extends Component {
    constructor(props) {
        super(props);

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

    // eslint-disable-next-line class-methods-use-this
    shouldNextButtonBeEnabled(props) {
        return (props.oppholdSisteTolv && props.oppholdNaa && props.oppholdNesteTolv);
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
                <ToggleGruppe onChange={this.props.toggleSisteTolv} name="oppholdSisteTolv">
                    <ToggleKnapp
                        defaultChecked={this.props.oppholdSisteTolv === 'ja'}
                        value="ja"
                    >
                        oppholdt meg i Norge
                    </ToggleKnapp>
                    <ToggleKnapp
                        defaultChecked={this.props.oppholdSisteTolv === 'nei'}
                        value="nei"
                    >
                        ikke oppholdt meg i Norge
                    </ToggleKnapp>
                </ToggleGruppe>
                {this.props.oppholdSisteTolv === 'nei' &&
                    <div>
                        <Element>ettersom jeg var i utlandet...</Element>
                        <NumberSelector />
                        <Element>gang. Jeg oppholdte meg i...</Element>
                        <CountryPicker />
                    </div>
                }
                {this.props.oppholdSisteTolv &&
                    <div>
                        <Element>Jeg oppholder meg...</Element>
                        <ToggleGruppe onChange={this.props.toggleOppholdNaa} name="toggleOppholdNaa">
                            <ToggleKnapp
                                defaultChecked={this.props.oppholdNaa === 'ja'}
                                value="ja"
                            >
                                i Norge nå
                            </ToggleKnapp>
                            <ToggleKnapp
                                defaultChecked={this.props.oppholdNaa === 'nei'}
                                value="nei"
                            >
                                ikke i Norge nå
                            </ToggleKnapp>
                        </ToggleGruppe>
                        {this.props.oppholdNaa === 'nei' &&
                            <div>
                                <Element>ettersom jeg var i utlandet...</Element>
                                <NumberSelector />
                                <Element>gang. Jeg oppholdte meg i...</Element>
                                <CountryPicker />
                            </div>
                        }
                        {this.props.oppholdNaa &&
                            <div>
                                <Element>Og de neste 12 månedene så kommer jeg sammenhengende til å...</Element>
                                <ToggleGruppe onChange={this.props.toggleNesteTolv} name="oppholdNesteTolv">
                                    <ToggleKnapp
                                        defaultChecked={this.props.oppholdNesteTolv === 'ja'}
                                        value="ja"
                                    >
                                        oppholde meg i Norge
                                    </ToggleKnapp>
                                    <ToggleKnapp
                                        defaultChecked={this.props.oppholdNesteTolv === 'nei'}
                                        value="nei"
                                    >
                                        ikke oppholde meg i Norge
                                    </ToggleKnapp>
                                </ToggleGruppe>
                                {this.props.oppholdNesteTolv === 'nei' &&
                                    <div>
                                        <Element>ettersom jeg var i utlandet...</Element>
                                        <NumberSelector />
                                        <Element>gang. Jeg oppholdte meg i...</Element>
                                        <CountryPicker />
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

Step3.propTypes = {
    toggleSisteTolv: PropTypes.func.isRequired,
    toggleNesteTolv: PropTypes.func.isRequired,
    toggleOppholdNaa: PropTypes.func.isRequired,
    enableNextButton: PropTypes.func.isRequired,
    disableNextButton: PropTypes.func.isRequired,
    oppholdSisteTolv: PropTypes.string,
    oppholdNesteTolv: PropTypes.string,
    oppholdNaa: PropTypes.string
};

Step3.defaultProps = {
    oppholdSisteTolv: undefined,
    oppholdNesteTolv: undefined,
    oppholdNaa: undefined
};

const mapStateToProps = (state) => ({
    oppholdSisteTolv: state.engangsstonadReducer.oppholdSisteTolv,
    oppholdNesteTolv: state.engangsstonadReducer.oppholdNesteTolv,
    oppholdNaa: state.engangsstonadReducer.oppholdNaa
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    toggleSisteTolv,
    toggleNesteTolv,
    toggleOppholdNaa,
    enableNextButton,
    disableNextButton
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Step3);

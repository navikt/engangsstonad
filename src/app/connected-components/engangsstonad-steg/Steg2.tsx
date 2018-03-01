import * as React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
const { RadioPanelGruppe } = require('nav-frontend-skjema');
import getMessage from 'util/i18n/i18nUtils';
import { soknadActionCreators as soknad } from '../../redux/actions';
import Utenlandsopphold, { Periode } from '../../types/domain/Utenlandsopphold';
import { connect } from 'react-redux';
import { DispatchProps } from '../../redux/types/index';
import CountryPicker from '../../components/country-picker/CountryPicker';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

interface StateProps {
    utenlandsopphold: Utenlandsopphold;
    language: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

export class Steg2 extends React.Component<Props> {
    getINorgeSiste12SelectedValue() {
        const { iNorgeSiste12Mnd } = this.props.utenlandsopphold;
        if (iNorgeSiste12Mnd === true) {
            return 'norway';
        } else if (iNorgeSiste12Mnd === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    }
    
    getINorgeNeste12SelectedValue() {
        const { iNorgeNeste12Mnd } = this.props.utenlandsopphold;
        if (iNorgeNeste12Mnd === true) {
            return 'norway';
        } else if (iNorgeNeste12Mnd === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    }

    getFødselINorgeSelectedValue() {
        const { fødselINorge } = this.props.utenlandsopphold;
        if (fødselINorge === true) {
            return 'norway';
        } else if (fødselINorge === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    }

    render() {
        const { dispatch, intl, utenlandsopphold, language } = this.props;
        const { iNorgeSiste12Mnd, iNorgeNeste12Mnd, perioder } = utenlandsopphold;

        return (
            <div className="engangsstonad__step">
                <DocumentTitle title="NAV Engangsstønad - Tilknytning til Norge" />
                <RadioPanelGruppe
                    legend={getMessage(intl, 'medlemmskap.text.siste12mnd')}
                    name="iNorgeSiste12"
                    onChange={(event: any, value: string) => dispatch(soknad.setINorgeSiste12Mnd(value))}
                    checked={this.getINorgeSiste12SelectedValue()}
                    radios={[
                        {label: getMessage(intl, 'medlemmskap.radiobutton.boddNorge'), value: 'norway'},
                        {label: getMessage(intl, 'medlemmskap.radiobutton.utlandet'), value: 'abroad'}
                    ]}
                />
                {utenlandsopphold.iNorgeSiste12Mnd === false && (
                    <CountryPicker
                        label={getMessage(intl, 'medlemmskap.text.jegBodde')}
                        language={language}
                        utenlandsoppholdListe={perioder}
                        addVisit={(periode: Periode) => dispatch(soknad.addPeriode(periode))}
                        editVisit={(periode: Periode, i: number) => dispatch(soknad.editPeriode(periode, i))}
                        deleteVisit={(periode: Periode) => dispatch(soknad.deletePeriode(periode))}
                    />
                )}
                {(iNorgeSiste12Mnd || perioder.length > 0) && (
                    <RadioPanelGruppe
                        legend={getMessage(intl, 'medlemmskap.text.neste12mnd')}
                        name="iNorgeNeste12"
                        onChange={(event: any, value: string) => dispatch(soknad.setINorgeNeste12Mnd(value))}
                        checked={this.getINorgeNeste12SelectedValue()}
                        radios={[
                            {label: getMessage(intl, 'medlemmskap.radiobutton.boNorge'), value: 'norway'},
                            {label: getMessage(intl, 'medlemmskap.radiobutton.boUtlandet'), value: 'abroad'}
                        ]}
                    />
                )}
                {iNorgeNeste12Mnd !== undefined && (
                    <RadioPanelGruppe
                        legend={getMessage(intl, 'medlemmskap.text.bostedFodsel')}
                        name="fødselINorge"
                        onChange={(event: any, value: string) => dispatch(soknad.setFødselINorge(value))}
                        checked={this.getFødselINorgeSelectedValue()}
                        radios={[
                            {label: getMessage(intl, 'medlemmskap.radiobutton.vareNorge'), value: 'norway'},
                            {label: getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet'), value: 'abroad'}
                        ]}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    utenlandsopphold: state.soknadReducer.utenlandsopphold,
    language: state.commonReducer.language
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(Steg2));
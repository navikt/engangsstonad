import * as React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
const { RadioPanelGruppe } = require('nav-frontend-skjema');
import getMessage from 'util/i18n/i18nUtils';
import { soknadActionCreators as soknad } from '../../../redux/actions';
import { default as Medlemsskap, Utenlandsopphold } from '../../../types/domain/Medlemsskap';
import { connect } from 'react-redux';
import { DispatchProps } from '../../../redux/types/index';
import CountryPicker from './../../shared/country-picker/CountryPicker';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;

interface StateProps {
    medlemsskap: Medlemsskap;
    language: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

export class EngangsstonadStep2 extends React.Component<Props> {
    getINorgeSiste12SelectedValue() {
        const { iNorgeSiste12 } = this.props.medlemsskap;
        if (iNorgeSiste12 === true) {
            return 'norway';
        } else if (iNorgeSiste12 === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    }
    
    getINorgeNeste12SelectedValue() {
        const { iNorgeNeste12 } = this.props.medlemsskap;
        if (iNorgeNeste12 === true) {
            return 'norway';
        } else if (iNorgeNeste12 === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    }

    getFodselINorgeSelectedValue() {
        const { fodselINorge } = this.props.medlemsskap;
        if (fodselINorge === true) {
            return 'norway';
        } else if (fodselINorge === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    }

    render() {
        const { dispatch, intl, medlemsskap, language } = this.props;
        const { iNorgeSiste12, iNorgeNeste12, utenlandsopphold } = medlemsskap;

        return (
            <div className="engangsstonad__step">
                <DocumentTitle title="NAV Engangsstønad - Tilknytning til Norge" />
                <RadioPanelGruppe
                    legend={getMessage(intl, 'medlemmskap.text.siste12mnd')}
                    name="iNorgeSiste12"
                    onChange={(event: any, value: string) => dispatch(soknad.setINorgeSiste12(value))}
                    checked={this.getINorgeSiste12SelectedValue()}
                    radios={[
                        {label: getMessage(intl, 'medlemmskap.radiobutton.boddNorge'), value: 'norway'},
                        {label: getMessage(intl, 'medlemmskap.radiobutton.utlandet'), value: 'abroad'}
                    ]}
                />
                {medlemsskap.iNorgeSiste12 === false && (
                    <CountryPicker
                        label={getMessage(intl, 'medlemmskap.text.jegBodde')}
                        language={language}
                        utenlandsoppholdListe={medlemsskap.utenlandsopphold}
                        addVisit={(u: Utenlandsopphold) => dispatch(soknad.addUtenlandsopphold(u))}
                        editVisit={(u: Utenlandsopphold, i: number) => dispatch(soknad.editUtenlandsopphold(u, i))}
                        deleteVisit={(u: Utenlandsopphold) => dispatch(soknad.deleteUtenlandsopphold(u))}
                    />
                )}
                {(iNorgeSiste12 || utenlandsopphold.length > 0) && (
                    <RadioPanelGruppe
                        legend={getMessage(intl, 'medlemmskap.text.neste12mnd')}
                        name="iNorgeNeste12"
                        onChange={(event: any, value: string) => dispatch(soknad.setINorgeNeste12(value))}
                        checked={this.getINorgeNeste12SelectedValue()}
                        radios={[
                            {label: getMessage(intl, 'medlemmskap.radiobutton.boNorge'), value: 'norway'},
                            {label: getMessage(intl, 'medlemmskap.radiobutton.boUtlandet'), value: 'abroad'}
                        ]}
                    />
                )}
                {iNorgeNeste12 !== undefined && (
                    <RadioPanelGruppe
                        legend={getMessage(intl, 'medlemmskap.text.bostedFodsel')}
                        name="fodselINorge"
                        onChange={(event: any, value: string) => dispatch(soknad.setFodselINorge(value))}
                        checked={this.getFodselINorgeSelectedValue()}
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
    medlemsskap: state.soknadReducer.medlemsskap,
    language: state.commonReducer.language
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(EngangsstonadStep2));
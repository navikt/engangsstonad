import * as React from 'react';
import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import getMessage from 'util/i18n/i18nUtils';
import { soknadActionCreators as soknad } from '../../redux/actions';
import Utenlandsopphold, { Periode } from '../../types/domain/Utenlandsopphold';
import { connect } from 'react-redux';
import { DispatchProps } from '../../redux/types/index';
import CountryPicker from '../../components/country-picker/CountryPicker';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import Barn from '../../types/domain/Barn';
import RadioPanelGruppeResponsive from 'components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { fødselsdatoIsSet } from 'util/date/dateUtils';
import Skjemaspørsmål from 'components/skjemasp\u00F8rsma\u030Al/Skjemasp\u00F8rsma\u030Al';

interface StateProps {
    barn: Barn;
    utenlandsopphold: Utenlandsopphold;
    vedlegg: File[];
    language: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

export class Steg3 extends React.Component<Props> {
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
        const { dispatch, intl, utenlandsopphold, barn, language } = this.props;
        const { iNorgeSiste12Mnd, iNorgeNeste12Mnd, tidligerePerioder, senerePerioder } = utenlandsopphold;

        return (
            <div className="engangsstonad__step">
                <DocumentTitle title="NAV Engangsstønad - Tilknytning til Norge" />
                <Skjemaspørsmål>
                    <RadioPanelGruppeResponsive
                        legend={getMessage(intl, 'medlemmskap.text.siste12mnd')}
                        name="iNorgeSiste12"
                        onChange={(event: any, value: string) => dispatch(soknad.setINorgeSiste12Mnd(value))}
                        checked={this.getINorgeSiste12SelectedValue()}
                        radios={[
                            { inputProps: { id: 'js-iNorgeSiste12' }, label: getMessage(intl, 'medlemmskap.radiobutton.boddNorge'), value: 'norway' },
                            { inputProps: { id: 'js-iUtlandetSiste12' }, label: getMessage(intl, 'medlemmskap.radiobutton.utlandet'), value: 'abroad' }
                        ]}
                        twoColumns={true}
                    />
                </Skjemaspørsmål>

                <Skjemaspørsmål synlig={iNorgeSiste12Mnd === false}>
                    <CountryPicker
                        label={getMessage(intl, 'medlemmskap.text.jegBodde')}
                        language={language}
                        utenlandsoppholdListe={tidligerePerioder}
                        addVisit={(periode: Periode) => dispatch(soknad.addTidligereUtenlandsoppholdPeriode(periode))}
                        editVisit={(periode: Periode, i: number) => dispatch(soknad.editTidligereUtenlandsoppholdPeriode(periode, i))}
                        deleteVisit={(periode: Periode) => dispatch(soknad.deleteTidligereUtenlandsoppholdPeriode(periode))}
                    />
                </Skjemaspørsmål>
                <Skjemaspørsmål synlig={iNorgeSiste12Mnd || tidligerePerioder.length > 0}>
                    <RadioPanelGruppeResponsive
                        legend={getMessage(intl, 'medlemmskap.text.neste12mnd')}
                        name="iNorgeNeste12"
                        onChange={(event: any, value: string) => dispatch(soknad.setINorgeNeste12Mnd(value))}
                        checked={this.getINorgeNeste12SelectedValue()}
                        radios={[
                            { inputProps: { id: 'js-iNorgeNeste12' }, label: getMessage(intl, 'medlemmskap.radiobutton.boNorge'), value: 'norway' },
                            { inputProps: { id: 'js-iUtlandetNeste12' }, label: getMessage(intl, 'medlemmskap.radiobutton.boUtlandet'), value: 'abroad' }
                        ]}
                        twoColumns={true}
                    />
                </Skjemaspørsmål>
                <Skjemaspørsmål synlig={iNorgeNeste12Mnd === false}>
                    <CountryPicker
                        label={getMessage(intl, 'medlemmskap.text.jegSkalBo')}
                        language={language}
                        utenlandsoppholdListe={senerePerioder}
                        addVisit={(periode: Periode) => dispatch(soknad.addSenereUtenlandsoppholdPeriode(periode))}
                        editVisit={(periode: Periode, i: number) => dispatch(soknad.editSenereUtenlandsoppholdPeriode(periode, i))}
                        deleteVisit={(periode: Periode) => dispatch(soknad.deleteSenereUtenlandsoppholdPeriode(periode))}
                    />
                </Skjemaspørsmål>
                <Skjemaspørsmål synlig={(senerePerioder.length > 0 || iNorgeNeste12Mnd === true) && !fødselsdatoIsSet(barn)}>
                    <RadioPanelGruppeResponsive
                        legend={getMessage(intl, 'medlemmskap.text.bostedFodsel')}
                        name="fødselINorge"
                        onChange={(event: any, value: string) => dispatch(soknad.setFødselINorge(value))}
                        checked={this.getFødselINorgeSelectedValue()}
                        radios={[
                            { inputProps: { id: 'js-fodselINorge' }, label: getMessage(intl, 'medlemmskap.radiobutton.vareNorge'), value: 'norway' },
                            {
                                inputProps: { id: 'js-fodselIUtlandet' },
                                label: getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet'),
                                value: 'abroad'
                            }
                        ]}
                        twoColumns={true}
                    />
                </Skjemaspørsmål>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    utenlandsopphold: state.soknadReducer.utenlandsopphold,
    barn: state.soknadReducer.barn,
    vedlegg: state.soknadReducer.vedlegg,
    language: state.commonReducer.language
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(Steg3));

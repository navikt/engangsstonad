import * as React from 'react';
import { injectIntl } from 'react-intl';
import * as moment from 'moment';
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
import FormBlock from 'components/form-block/FormBlock';
import { Tidsperiode } from 'nav-datovelger';
import { Feil } from 'components/skjema-input-element/types';

interface StateProps {
    barn: Barn;
    utenlandsopphold: Utenlandsopphold;
    vedlegg: File[];
    language: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

export class Steg3 extends React.Component<Props> {

    componentWillMount() {
        this.overlapsWithOtherUtenlandsopphold = this.overlapsWithOtherUtenlandsopphold.bind(this);
        this.validateFomDatoSiste12Mnd = this.validateFomDatoSiste12Mnd.bind(this);
        this.validateTomDatoSiste12Mnd = this.validateTomDatoSiste12Mnd.bind(this);
        this.validateFomDatoNeste12Mnd = this.validateFomDatoNeste12Mnd.bind(this);
        this.validateTomDatoNeste12Mnd = this.validateTomDatoNeste12Mnd.bind(this);
    }

    validateLand({ land }: any): Feil | undefined {
        if (land) {
            return;
        }
        return { feilmelding: 'Du må oppgi et land' };
    }

    overlapsWithOtherUtenlandsopphold(momentFom: any, momentTom: any, utenlandsoppholdInEditMode: any) {
        const { tidligerePerioder, senerePerioder } = this.props.utenlandsopphold;
        const perioder = [...tidligerePerioder, ...senerePerioder];
        const overlappendePeriode = perioder.find((periode) => {
            if (periode !== utenlandsoppholdInEditMode) {
                const { varighet } = periode;
                const varighetFom = moment(varighet.fom),
                      varighetTom = moment(varighet.tom);
                return (
                    momentFom.isBetween(
                        varighetFom.subtract(1, 'seconds'),
                        varighetTom.add(1, 'seconds')
                    ) ||
                    momentTom.isBetween(
                        varighetFom.subtract(1, 'seconds'),
                        varighetTom.add(1, 'seconds'))
                    ) ||
                    (varighetFom.isBetween(
                        momentFom.subtract(1, 'seconds'),
                        momentTom.add(1, 'seconds')
                    ) ||
                    varighetTom.isBetween(
                        momentFom.subtract(1, 'seconds'),
                        momentTom.add(1, 'seconds')
                    ));
            }
        });
        return overlappendePeriode;
    }

    validateFomDatoSiste12Mnd({ fom, tom, utenlandsoppholdInEditMode }: any): Feil | undefined {
        if (fom) {
            const momentFom = moment(fom), momentTom = moment(tom);
            if (momentFom.isAfter(momentTom)) {
                return { feilmelding: 'Fra-dato kan ikke være etter til-dato' };
            } else if (momentFom.isBefore(moment().subtract(1, 'years'))) {
                return { feilmelding: 'Fra-dato er satt til en dato som er mer enn ett år tilbake i tid, men må være satt innenfor de siste 12 månedene.' };
            } else if (this.overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return { feilmelding: 'Du kan ikke legge til en periode som overlapper med andre utenlandsopphold' };
            }
            return;
        }
        return { feilmelding: 'Du må oppgi en fra-dato' };
    }

    validateTomDatoSiste12Mnd({ tom, fom, utenlandsoppholdInEditMode }: any): Feil | undefined {
        if (tom) {
            const momentFom = moment(fom), momentTom = moment(tom);
            if (momentTom.isBefore(momentFom)) {
                return { feilmelding: 'Til-dato kan ikke være tidligere enn fra-dato' };
            } else if (momentTom.isBefore(moment().subtract(1, 'years'))) {
                return { feilmelding: 'Til-dato er satt til en dato som er mer enn ett år tilbake i tid, men må være satt innenfor de siste 12 månedene.' };
            } else if (momentTom.isSameOrAfter(moment().add(1, 'days'))) {
                return { feilmelding: 'Til-datoen er satt til en dato frem i tid, men kan tidligst være satt til dagens dato' };
            } else if (this.overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return { feilmelding: 'Du kan ikke legge til en periode som overlapper med andre utenlandsopphold' };
            }
            return;
        }
        return { feilmelding: 'Du må oppgi en til-dato' };
    }

    validateFomDatoNeste12Mnd({ fom, tom, utenlandsoppholdInEditMode }: any): Feil | undefined {
        if (fom) {
            const momentFom = moment(fom), momentTom = moment(tom);
            if (momentFom.isAfter(momentTom)) {
                return { feilmelding: 'Fra-dato kan ikke være etter til-dato' };
            } else if (momentFom.isBefore(moment().startOf('day'))) {
                return { feilmelding: 'Fra-datoen er satt til en dato tilbake i tid, men må være satt til dagens dato eller senere' };
            }  else if (momentFom.isAfter(moment().add(1, 'years'))) {
                return { feilmelding: 'Fra-dato er satt til en dato som er mer enn ett år frem i tid, men må være satt innenfor de neste 12 månedene.' };
            } else if (this.overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return { feilmelding: 'Du kan ikke legge til en periode som overlapper med andre utenlandsopphold' };
            }
            return;
        }
        return { feilmelding: 'Du må oppgi en fra-dato' };
    }

    validateTomDatoNeste12Mnd({ tom, fom, utenlandsoppholdInEditMode }: any): Feil | undefined {
        if (tom) {
            const momentFom = moment(fom), momentTom = moment(tom);
            if (momentTom.isBefore(momentFom)) {
                return { feilmelding: 'Til-dato kan ikke være tidligere enn fra-dato' };
            } else if (momentTom.isAfter(moment().add(1, 'years'))) {
                return { feilmelding: 'Til-dato er satt til en dato som er mer enn ett år frem i tid, men må være satt innenfor de neste 12 månedene.' };
            } else if (momentTom.isBefore(moment().startOf('day'))) {
                return { feilmelding: 'Til-datoen er satt til en dato tilbake i tid, men må være satt til dagens dato eller senere' };
            } else if (this.overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return { feilmelding: 'Du kan ikke legge til en periode som overlapper med andre utenlandsopphold' };
            }
            return;
        }
        return { feilmelding: 'Du må oppgi en til-dato' };
    }

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

        const tidsperiodeForegående: Tidsperiode = {
            startdato: moment()
                .add(-1, 'years')
                .startOf('day')
                .toDate(),
            sluttdato: moment()
                .endOf('day')
                .toDate()
        };

        const tidsperiodeKommende: Tidsperiode = {
            startdato: moment()
                .startOf('day')
                .toDate(),
            sluttdato: moment()
                .add(1, 'years')
                .endOf('day')
                .toDate()
        };

        return (
            <div className="engangsstonad__step">
                <DocumentTitle title="NAV Engangsstønad - Tilknytning til Norge" />
                <FormBlock>
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
                </FormBlock>

                <FormBlock visible={iNorgeSiste12Mnd === false}>
                    <CountryPicker
                        label={getMessage(intl, 'medlemmskap.text.jegBodde')}
                        language={language}
                        utenlandsoppholdListe={tidligerePerioder}
                        addVisit={(periode: Periode) => dispatch(soknad.addTidligereUtenlandsoppholdPeriode(periode))}
                        editVisit={(periode: Periode, i: number) => dispatch(soknad.editTidligereUtenlandsoppholdPeriode(periode, i))}
                        deleteVisit={(periode: Periode) => dispatch(soknad.deleteTidligereUtenlandsoppholdPeriode(periode))}
                        tidsperiode={tidsperiodeForegående}
                        validators={{validateLand: this.validateLand, validateFom: this.validateFomDatoSiste12Mnd, validateTom: this.validateTomDatoSiste12Mnd}}
                    />
                </FormBlock>
                <FormBlock visible={iNorgeSiste12Mnd || tidligerePerioder.length > 0}>
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
                </FormBlock>
                <FormBlock visible={iNorgeNeste12Mnd === false}>
                    <CountryPicker
                        label={getMessage(intl, 'medlemmskap.text.jegSkalBo')}
                        language={language}
                        utenlandsoppholdListe={senerePerioder}
                        addVisit={(periode: Periode) => dispatch(soknad.addSenereUtenlandsoppholdPeriode(periode))}
                        editVisit={(periode: Periode, i: number) => dispatch(soknad.editSenereUtenlandsoppholdPeriode(periode, i))}
                        deleteVisit={(periode: Periode) => dispatch(soknad.deleteSenereUtenlandsoppholdPeriode(periode))}
                        tidsperiode={tidsperiodeKommende}
                        validators={{validateLand: this.validateLand, validateFom: this.validateFomDatoNeste12Mnd, validateTom: this.validateTomDatoNeste12Mnd}}
                    />
                </FormBlock>
                <FormBlock visible={(senerePerioder.length > 0 || iNorgeNeste12Mnd === true) && !fødselsdatoIsSet(barn)}>
                    <RadioPanelGruppeResponsive
                        legend={getMessage(intl, 'medlemmskap.text.bostedFodsel', {
                            antallBarn: barn.antallBarn && barn.antallBarn > 1 ? 
                                getMessage(intl, 'medlemmskap.text.barnFlertall') : 
                                getMessage(intl, 'medlemmskap.text.barnEntall')
                        })}
                        name="fødselINorge"
                        onChange={(event: any, value: string) => dispatch(soknad.setFødselINorge(value))}
                        checked={this.getFødselINorgeSelectedValue()}
                        radios={[
                            { 
                                inputProps: { id: 'js-fodselINorge' }, 
                                label: getMessage(intl, 'medlemmskap.radiobutton.vareNorge'), 
                                value: 'norway' 
                            },
                            {
                                inputProps: { id: 'js-fodselIUtlandet' },
                                label: getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet'),
                                value: 'abroad'
                            }
                        ]}
                        twoColumns={true}
                    />
                </FormBlock>
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

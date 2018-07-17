import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as moment from 'moment';
import getMessage from 'util/i18n/i18nUtils';
import { soknadActionCreators as soknad } from '../../redux/actions';
import InformasjonOmUtenlandsopphold, { Utenlandsopphold } from '../../types/domain/InformasjonOmUtenlandsopphold';
import { DispatchProps } from 'common/redux/types';
import CountryPicker from '../../components/country-picker/CountryPicker';
import Barn from '../../types/domain/Barn';
import RadioPanelGruppeResponsive from 'components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import FormBlock from 'components/form-block/FormBlock';
import { Tidsperiode } from 'nav-datovelger';
import { Feil } from 'components/skjema-input-element/types';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';
import { connect } from 'react-redux';

interface StateProps {
    barn: Barn;
    informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold;
    vedlegg: File[];
    language: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class Steg3 extends React.Component<Props> {
    componentDidMount() {
        setTimeout(() => (window as any).hj('vpv', '/engangsstonad/soknad/step-3'), 5000);
    }

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
        const { tidligerePerioder, senerePerioder } = this.props.informasjonOmUtenlandsopphold;
        const perioder = [...tidligerePerioder, ...senerePerioder];
        const overlappendePeriode = perioder.find(periode => {
            if (periode !== utenlandsoppholdInEditMode) {
                const { varighet } = periode;
                const varighetFom = moment(varighet.fom),
                    varighetTom = moment(varighet.tom);
                return (
                    momentFom.isBetween(varighetFom.subtract(1, 'seconds'), varighetTom.add(1, 'seconds')) ||
                    momentTom.isBetween(varighetFom.subtract(1, 'seconds'), varighetTom.add(1, 'seconds')) ||
                    (varighetFom.isBetween(momentFom.subtract(1, 'seconds'), momentTom.add(1, 'seconds')) ||
                        varighetTom.isBetween(momentFom.subtract(1, 'seconds'), momentTom.add(1, 'seconds')))
                );
            }
        });
        return overlappendePeriode;
    }

    validateFomDatoSiste12Mnd({ fom, tom, utenlandsoppholdInEditMode }: any): Feil | undefined {
        const { intl } = this.props;
        if (fom) {
            const momentFom = moment(fom),
                momentTom = moment(tom);
            if (momentFom.isAfter(momentTom)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.førTilDato')
                };
            } else if (momentFom.isBefore(moment().subtract(1, 'years'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforSiste12')
                };
            } else if (this.overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.overlapper')
                };
            }
            return;
        }
        return {
            feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforSiste12')
        };
    }

    validateTomDatoSiste12Mnd({ tom, fom, utenlandsoppholdInEditMode }: any): Feil | undefined {
        const { intl } = this.props;
        if (tom) {
            const momentFom = moment(fom),
                momentTom = moment(tom);
            if (momentTom.isBefore(momentFom)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.etterFraDato')
                };
            } else if (momentTom.isBefore(moment().subtract(1, 'years'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforSiste12')
                };
            } else if (momentTom.isSameOrAfter(moment().add(1, 'days'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforSiste12')
                };
            } else if (this.overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.overlapper')
                };
            }
            return;
        }
        return {
            feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforSiste12')
        };
    }

    validateFomDatoNeste12Mnd({ fom, tom, utenlandsoppholdInEditMode }: any): Feil | undefined {
        const { intl } = this.props;
        if (fom) {
            const momentFom = moment(fom),
                momentTom = moment(tom);
            if (momentFom.isAfter(momentTom)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.førTilDato')
                };
            } else if (momentFom.isBefore(moment().startOf('day'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforNeste12')
                };
            } else if (momentFom.startOf('day').isAfter(moment().add(1, 'years'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforNeste12')
                };
            } else if (this.overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.overlapper')
                };
            }
            return;
        }
        return {
            feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforNeste12')
        };
    }

    validateTomDatoNeste12Mnd({ tom, fom, utenlandsoppholdInEditMode }: any): Feil | undefined {
        const { intl } = this.props;
        if (tom) {
            const momentFom = moment(fom),
                momentTom = moment(tom);
            if (momentTom.isBefore(momentFom)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.etterFraDato')
                };
            } else if (momentTom.startOf('day').isAfter(moment().add(1, 'years'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforNeste12')
                };
            } else if (momentTom.isBefore(moment().startOf('day'))) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.dagensEllerSenere')
                };
            } else if (this.overlapsWithOtherUtenlandsopphold(momentFom, momentTom, utenlandsoppholdInEditMode)) {
                return {
                    feilmelding: getMessage(intl, 'medlemsskap.modal.feil.overlapper')
                };
            }
            return;
        }
        return {
            feilmelding: getMessage(intl, 'medlemsskap.modal.feil.innenforNeste12')
        };
    }

    getINorgeSiste12SelectedValue() {
        const { iNorgeSiste12Mnd } = this.props.informasjonOmUtenlandsopphold;
        if (iNorgeSiste12Mnd === true) {
            return 'norway';
        } else if (iNorgeSiste12Mnd === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    }

    getINorgeNeste12SelectedValue() {
        const { iNorgeNeste12Mnd } = this.props.informasjonOmUtenlandsopphold;
        if (iNorgeNeste12Mnd === true) {
            return 'norway';
        } else if (iNorgeNeste12Mnd === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    }

    getFødselINorgeSelectedValue() {
        const { fødselINorge } = this.props.informasjonOmUtenlandsopphold;
        if (fødselINorge === true) {
            return 'norway';
        } else if (fødselINorge === false) {
            return 'abroad';
        } else {
            return undefined;
        }
    }

    render() {
        const { dispatch, intl, informasjonOmUtenlandsopphold, barn, language } = this.props;
        const { iNorgeSiste12Mnd, iNorgeNeste12Mnd, tidligerePerioder, senerePerioder } = informasjonOmUtenlandsopphold;

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
            <Skjemasteg tittel={getMessage(intl, 'medlemmskap.sectionheading')}>
                <FormBlock>
                    <RadioPanelGruppeResponsive
                        legend={getMessage(intl, 'medlemmskap.text.siste12mnd')}
                        name="iNorgeSiste12"
                        onChange={(event: any, value: string) => dispatch(soknad.setINorgeSiste12Mnd(value))}
                        checked={this.getINorgeSiste12SelectedValue()}
                        radios={[
                            {
                                inputProps: { id: 'js-iNorgeSiste12' },
                                label: getMessage(intl, 'medlemmskap.radiobutton.boddNorge'),
                                value: 'norway'
                            },
                            {
                                inputProps: { id: 'js-iUtlandetSiste12' },
                                label: getMessage(intl, 'medlemmskap.radiobutton.utlandet'),
                                value: 'abroad'
                            }
                        ]}
                        twoColumns={true}
                    />
                </FormBlock>

                <FormBlock visible={iNorgeSiste12Mnd === false}>
                    <CountryPicker
                        label={getMessage(intl, 'medlemmskap.text.jegBodde')}
                        language={language}
                        utenlandsoppholdListe={tidligerePerioder}
                        addVisit={(periode: Utenlandsopphold) => dispatch(soknad.addTidligereUtenlandsoppholdPeriode(periode))}
                        editVisit={(periode: Utenlandsopphold, i: number) => dispatch(soknad.editTidligereUtenlandsoppholdPeriode(periode, i))}
                        deleteVisit={(periode: Utenlandsopphold) => dispatch(soknad.deleteTidligereUtenlandsoppholdPeriode(periode))}
                        tidsperiode={tidsperiodeForegående}
                        validators={{
                            validateLand: this.validateLand,
                            validateFom: this.validateFomDatoSiste12Mnd,
                            validateTom: this.validateTomDatoSiste12Mnd
                        }}
                    />
                </FormBlock>
                <FormBlock visible={iNorgeSiste12Mnd || tidligerePerioder.length > 0}>
                    <RadioPanelGruppeResponsive
                        legend={getMessage(intl, 'medlemmskap.text.neste12mnd')}
                        name="iNorgeNeste12"
                        onChange={(event: any, value: string) => dispatch(soknad.setINorgeNeste12Mnd(value))}
                        checked={this.getINorgeNeste12SelectedValue()}
                        radios={[
                            {
                                inputProps: { id: 'js-iNorgeNeste12' },
                                label: getMessage(intl, 'medlemmskap.radiobutton.boNorge'),
                                value: 'norway'
                            },
                            {
                                inputProps: { id: 'js-iUtlandetNeste12' },
                                label: getMessage(intl, 'medlemmskap.radiobutton.boUtlandet'),
                                value: 'abroad'
                            }
                        ]}
                        twoColumns={true}
                    />
                </FormBlock>
                <FormBlock
                    visible={
                        iNorgeNeste12Mnd === false && (iNorgeSiste12Mnd === true || (iNorgeSiste12Mnd === false && tidligerePerioder.length > 0))
                    }
                >
                    <CountryPicker
                        label={getMessage(intl, 'medlemmskap.text.jegSkalBo')}
                        language={language}
                        utenlandsoppholdListe={senerePerioder}
                        addVisit={(periode: Utenlandsopphold) => dispatch(soknad.addSenereUtenlandsoppholdPeriode(periode))}
                        editVisit={(periode: Utenlandsopphold, i: number) => dispatch(soknad.editSenereUtenlandsoppholdPeriode(periode, i))}
                        deleteVisit={(periode: Utenlandsopphold) => dispatch(soknad.deleteSenereUtenlandsoppholdPeriode(periode))}
                        tidsperiode={tidsperiodeKommende}
                        validators={{
                            validateLand: this.validateLand,
                            validateFom: this.validateFomDatoNeste12Mnd,
                            validateTom: this.validateTomDatoNeste12Mnd
                        }}
                    />
                </FormBlock>
                <FormBlock
                    visible={
                        (iNorgeSiste12Mnd || tidligerePerioder.length > 0) && (
                            (iNorgeNeste12Mnd || senerePerioder.length > 0))
                    }
                >
                    <RadioPanelGruppeResponsive
                        legend={getMessage(intl, 'medlemmskap.text.bostedFodsel', {
                            tempus:
                                barn.erBarnetFødt
                                    ? getMessage(intl, 'medlemmskap.text.bostedFodselFortid')
                                    : getMessage(intl, 'medlemmskap.text.bostedFodselFremtid'),
                            antallBarn:
                                barn.antallBarn && barn.antallBarn > 1
                                    ? getMessage(intl, 'medlemmskap.text.barnFlertall')
                                    : getMessage(intl, 'medlemmskap.text.barnEntall')
                        })}
                        name="fødselINorge"
                        onChange={(event: any, value: string) => dispatch(soknad.setFødselINorge(value))}
                        checked={this.getFødselINorgeSelectedValue()}
                        radios={[
                            {
                                inputProps: { id: 'js-fodselINorge' },
                                label:
                                    barn.erBarnetFødt
                                        ? getMessage(intl, 'medlemmskap.radiobutton.iNorge')
                                        : getMessage(intl, 'medlemmskap.radiobutton.vareNorge'),
                                value: 'norway'
                            },
                            {
                                inputProps: { id: 'js-fodselIUtlandet' },
                                label:
                                    barn.erBarnetFødt
                                        ? getMessage(intl, 'medlemmskap.radiobutton.iUtlandet')
                                        : getMessage(intl, 'medlemmskap.radiobutton.vareUtlandet'),
                                value: 'abroad'
                            }
                        ]}
                        twoColumns={true}
                    />
                </FormBlock>
            </Skjemasteg>
        );
    }
}

const mapStateToProps = (state: any) => ({
    informasjonOmUtenlandsopphold: state.soknadReducer.utenlandsopphold,
    barn: state.soknadReducer.barn,
    vedlegg: state.soknadReducer.vedlegg,
    language: state.commonReducer.language
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(Steg3));

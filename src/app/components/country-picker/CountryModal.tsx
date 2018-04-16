import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';

import { Periode } from '../../types/domain/Utenlandsopphold';
import CountrySelect from 'components/country-select/CountrySelect';
import { DateInput } from 'components/date-input/DateInput';
import { Tidsperiode } from 'nav-datovelger';
import LabelText from 'components/labeltext/LabelText';
import FormBlock from 'components/form-block/FormBlock';
import { Feil } from 'components/skjema-input-element/types';

const Modal = require('nav-frontend-modal').default;

interface OwnProps {
    language: string;
    utenlandsopphold?: Periode;
    label: string;
    tidsperiode?: Tidsperiode;
    onSubmit: (periode: Periode) => void;
    closeModal: () => void;
}
type Props = OwnProps & InjectedIntlProps;

type Field = {
    value: any;
    feil?: Feil;
    visFeil?: boolean;
};

interface PeriodeForm {
    fom?: Field;
    tom?: Field;
    land?: Field;
}

interface State {
    erEndring?: boolean;
    hasSubmitted?: boolean;
    formData: PeriodeForm;
}

const getValidPeriode = (formData: PeriodeForm): Periode | undefined => {
    const { land, fom, tom } = formData;
    if (land && fom && tom) {
        return {
            land: land.value,
            varighet: {
                fom: fom.value,
                tom: tom.value
            }
        };
    }
    return undefined;
};

const getDateFromString = (dato?: string) => {
    if (dato) {
        return new Date(dato);
    }
    return undefined;
};

class CountryModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { utenlandsopphold } = this.props;
        this.onSubmit = this.onSubmit.bind(this);
        this.updateFormState = this.updateFormState.bind(this);
        this.state = {
            erEndring: utenlandsopphold !== undefined,
            formData: utenlandsopphold ? {
                land: {
                    value: utenlandsopphold.land
                },
                fom: {
                    value: utenlandsopphold.varighet.fom
                },
                tom: {
                    value: utenlandsopphold.varighet.tom
                }
            } : {}
        };
    }

    formStateHasErrors() {
        const { formData } = this.state;
        const landFeil = formData.land && formData.land.feil;
        const fomFeil = formData.fom && formData.fom.feil;
        const tomFeil = formData.tom && formData.tom.feil;
        return landFeil || fomFeil || tomFeil;
    }

    onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        event.stopPropagation();

        if (this.state.formData && !this.formStateHasErrors()) {
            const validPeriode = getValidPeriode(this.state.formData);
            if (validPeriode) {
                this.props.onSubmit(validPeriode);
            }
        }

        this.updateFormState({
            formData: this.state.formData,
            hasSubmitted: true
        });
    }

    validateLand(land: string): Feil | undefined {
        if (land) {
            return;
        }
        return { feilmelding: 'Du må oppgi et land' };
    }

    validateFomDato(fom: string, tom: string) {
        if (fom) {
            return;
        }
        return { feilmelding: 'Du må oppgi en fra-dato' };
    }

    validateTomDato(tom: string, fom: string) {
        if (tom) {
            return;
        }
        return { feilmelding: 'Du må oppgi en til-dato' };
    }

    updateFormState({ formData, hasSubmitted }: State) {
        const land = formData.land && formData.land.value;
        const fom = formData.fom && formData.fom.value;
        const tom = formData.tom && formData.tom.value;

        const landFeil = this.validateLand(formData.land && formData.land.value);
        const fomFeil = this.validateFomDato(fom, tom);
        const tomFeil = this.validateTomDato(tom, fom);

        this.setState({
            formData: {
                land: {
                    value: land,
                    feil: landFeil,
                    visFeil: landFeil && (hasSubmitted || this.state.hasSubmitted)
                },
                fom: {
                    value: fom,
                    feil: fomFeil,
                    visFeil: fomFeil && (hasSubmitted || this.state.hasSubmitted)
                },
                tom: {
                    value: tom,
                    feil: tomFeil,
                    visFeil: tomFeil && (hasSubmitted || this.state.hasSubmitted)
                }
            },
            hasSubmitted:  (hasSubmitted || this.state.hasSubmitted)
        });
    }

    render() {
        const { language, tidsperiode } = this.props;
        const { formData, erEndring } = this.state;

        const fomDato = getDateFromString(formData && formData.fom && formData.fom.value);
        const tomDato = getDateFromString(formData && formData.tom && formData.tom.value);

        const lagreKnappTekstId = erEndring ? 'medlemmskap.modal.lagreEndringer' : 'medlemmskap.knapp.leggTilLand';

        const fomMinDato = tidsperiode ? tidsperiode.startdato : undefined;
        const fomMaksDato = tomDato || (tidsperiode ? tidsperiode.sluttdato : undefined);
        const tomMinDato = fomDato || (tidsperiode ? tidsperiode.startdato : undefined);
        const tomMaksDato = tidsperiode ? tidsperiode.sluttdato : undefined;

        let fomAvgrensning, tomAvgrensning;
        if (fomMinDato || fomMaksDato) {
            fomAvgrensning = {
                minDato: fomMinDato,
                maksDato: fomMaksDato
            };
        }
        if (tomMinDato || tomMaksDato) {
            tomAvgrensning = {
                minDato: tomMinDato,
                maksDato: tomMaksDato
            };
        }

        let landFeil;
        let fomFeil;
        let tomFeil;
        
        if (formData && formData.land && formData.land.visFeil === true) {
            landFeil = formData.land.feil;
        }
        if (formData && formData.fom && formData.fom.visFeil === true) {
            fomFeil = formData.fom.feil;
        }
        if (formData && formData.tom && formData.tom.visFeil === true) {
            tomFeil = formData.tom.feil;
        }

        return (
            <Modal className="countryModal" isOpen={true} contentLabel="landvelger" closeButton={true} onRequestClose={() => { this.props.closeModal(); }}>
                <form onSubmit={this.onSubmit}>
                    <Undertittel className="countryModal__title">
                        <FormattedMessage id="medlemmskap.modal.overskrift" />
                    </Undertittel>
                    <FormBlock margin="xs">
                        <CountrySelect
                            label={<LabelText>{this.props.label}</LabelText>}
                            feil={landFeil}
                            onChange={land => this.updateFormState({ formData: { ...formData, land: { value: land } } })}
                            language={language}
                            defaultValue={formData && formData.land && formData.land.value}
                        />
                    </FormBlock>
                    <FormBlock margin="xs">
                        <DateInput
                            id="boddFraDato"
                            label={<LabelText intlId="standard.text.fra" />}
                            dato={fomDato}
                            feil={fomFeil}
                            onChange={dato => this.updateFormState({ formData: { ...formData, fom: { value: dato ? dato.toISOString() : undefined } } })}
                            avgrensninger={fomAvgrensning}
                            kalenderplassering="fullskjerm"
                        />
                    </FormBlock>
                    <FormBlock margin="m">
                        <DateInput
                            id="boddTilDato"
                            label={<LabelText intlId="standard.text.til" />}
                            dato={tomDato}
                            feil={tomFeil}
                            onChange={dato => this.updateFormState({ formData: { ...formData,  tom: { value: dato ? dato.toISOString() : undefined } } })}
                            avgrensninger={tomAvgrensning}
                            kalenderplassering="fullskjerm"
                        />
                    </FormBlock>
                    <FormBlock margin="xxs">
                        <div className="countryModal__buttonBar">
                            <Knapp type="standard" onClick={() => this.props.closeModal()} htmlType="button">
                                <FormattedMessage id="medlemmskap.modal.avbryt" />
                            </Knapp>
                            <Hovedknapp>
                                <FormattedMessage id={lagreKnappTekstId} />
                            </Hovedknapp>
                        </div>
                    </FormBlock>
                </form>
            </Modal>
        );
    }
}
export default injectIntl(CountryModal);

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
};

interface PeriodeForm {
    fom?: Field;
    tom?: Field;
    land?: Field;
}

interface State {
    erEndring: boolean;
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
        if (fom) {
            return;
        }
        return { feilmelding: 'Du må oppgi en til-dato' };
    }

    updateFormState(data: PeriodeForm) {
        const land = data.land && data.land.value;
        const fom = data.fom && data.fom.value;
        const tom = data.tom && data.tom.value;

        this.setState({
            formData: {
                land: {
                    value: land,
                    feil: this.validateLand(data.land && data.land.value)
                },
                fom: {
                    value: fom,
                    feil: this.validateFomDato(fom, tom)
                },
                tom: {
                    value: tom,
                    feil: this.validateTomDato(tom, fom)
                }
            }
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

        const landFeil = formData && formData.land && formData.land.feil;
        const fomFeil = formData && formData.fom && formData.fom.feil;
        const tomFeil = formData && formData.tom && formData.tom.feil;

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
                            onChange={land => this.updateFormState({ land: { value: land } })}
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
                            onChange={dato => this.updateFormState({ fom: { value: dato.toISOString() } })}
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
                            onChange={dato => this.updateFormState({ tom: { value: dato.toISOString() } })}
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

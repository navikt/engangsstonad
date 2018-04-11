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

interface PeriodeForm {
    fom?: string;
    tom?: string;
    land?: string;
}

interface State {
    erEndring: boolean;
    formData: PeriodeForm;
}

const getValidPeriode = (formData: PeriodeForm): Periode | undefined => {
    const { land, fom, tom } = formData;
    if (land && fom && tom) {
        return {
            land,
            varighet: {
                fom,
                tom
            }
        };
    }
    return undefined;
};

const getDateFromString = (dato?: string): Date => {
    return dato ? new Date(dato) : new Date();
};

class CountryModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { utenlandsopphold } = this.props;
        this.onSubmit = this.onSubmit.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.state = {
            erEndring: utenlandsopphold !== undefined,
            formData: utenlandsopphold ? { land: utenlandsopphold.land, fom: utenlandsopphold.varighet.fom, tom: utenlandsopphold.varighet.tom } : {}
        };
    }

    onSubmit() {
        const validPeriode = getValidPeriode(this.state.formData);
        if (validPeriode) {
            this.props.onSubmit(validPeriode);
        }
    }

    updateFormData(data: PeriodeForm) {
        this.setState({
            formData: {
                ...this.state.formData,
                ...data
            }
        });
    }
    render() {
        const { language, tidsperiode } = this.props;
        const { formData, erEndring } = this.state;
        const fomDato = getDateFromString(formData.fom);
        const tomDato = getDateFromString(formData.fom);

        const lagreKnappTekstId = erEndring ? 'medlemmskap.modal.lagreEndringer' : 'medlemmskap.knapp.leggTilLand';

        const fomMinDato = tidsperiode ? tidsperiode.startdato : undefined;
        const fomMaksDato = tidsperiode ? tidsperiode.sluttdato : undefined;

        const tomMinDato = fomDato || (tidsperiode ? tidsperiode.startdato : undefined);
        const tomMaksDato = tidsperiode ? tidsperiode.sluttdato : undefined;

        return (
            <Modal
                className="countryModal"
                isOpen={true}
                contentLabel="landvelger"
                closeButton={true}
                onRequestClose={() => {
                    this.props.closeModal();
                }}
            >
                <div>
                    <Undertittel className="countryModal__title">
                        <FormattedMessage id="medlemmskap.modal.overskrift" />
                    </Undertittel>
                    <FormBlock margin="xs">
                        <CountrySelect
                            label={<LabelText>{this.props.label}</LabelText>}
                            onChange={land =>
                                this.updateFormData({
                                    land
                                })
                            }
                            language={language}
                            defaultValue={formData.land}
                        />
                    </FormBlock>
                    <FormBlock margin="xs">
                        <DateInput
                            id="boddFraDato"
                            label={<LabelText intlId="standard.text.fra" />}
                            dato={fomDato}
                            onChange={dato =>
                                this.updateFormData({
                                    fom: dato.toISOString()
                                })
                            }
                            avgrensninger={{
                                minDato: fomMinDato,
                                maksDato: fomMaksDato
                            }}
                            kalenderplassering="fullskjerm"
                        />
                    </FormBlock>
                    <FormBlock margin="m">
                        <DateInput
                            id="boddTilDato"
                            label={<LabelText intlId="standard.text.til" />}
                            dato={tomDato}
                            onChange={dato =>
                                this.updateFormData({
                                    tom: dato.toISOString()
                                })
                            }
                            avgrensninger={{
                                minDato: tomMinDato,
                                maksDato: tomMaksDato
                            }}
                            kalenderplassering="fullskjerm"
                        />
                    </FormBlock>
                    <FormBlock margin="xxs">
                        <div className="countryModal__buttonBar">
                            <Knapp type="standard" onClick={() => this.props.closeModal()} htmlType="button">
                                <FormattedMessage id="medlemmskap.modal.avbryt" />
                            </Knapp>
                            <Hovedknapp onClick={() => formData && this.onSubmit()}>
                                <FormattedMessage id={lagreKnappTekstId} />
                            </Hovedknapp>
                        </div>
                    </FormBlock>
                </div>
            </Modal>
        );
    }
}
export default injectIntl(CountryModal);

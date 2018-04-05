import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import * as moment from 'moment';
import { Undertittel } from 'nav-frontend-typografi';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';

import { Periode } from '../../types/domain/Utenlandsopphold';
import CountrySelect from 'components/country-select/CountrySelect';
import getMessage from 'util/i18n/i18nUtils';
import { DateInput } from 'components/dateInput/DateInput';

const Modal = require('nav-frontend-modal').default;

interface OwnProps {
    language: string;
    utenlandsopphold?: Periode;
    label: string;
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
            fom,
            tom
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
        this.oppdaterFormData = this.oppdaterFormData.bind(this);
        this.state = {
            erEndring: utenlandsopphold !== undefined,
            formData: { ...utenlandsopphold }
        };
    }

    onSubmit() {
        const validPeriode = getValidPeriode(this.state.formData);
        if (validPeriode) {
            this.props.onSubmit(validPeriode);
        }
    }

    oppdaterFormData(data: PeriodeForm) {
        this.setState({
            formData: {
                ...this.state.formData,
                ...data
            }
        });
    }
    render() {
        const { intl, language } = this.props;
        const { formData, erEndring } = this.state;

        const lagreKnappTekstId = erEndring
            ? 'medlemmskap.modal.lagreEndringer'
            : 'medlemmskap.knapp.leggTilLand';

        const idag = new Date();
        const fomMinDato = moment(idag)
            .add(-1, 'year')
            .toDate();
        const tomMaksDato = moment(idag)
            .add(1, 'year')
            .toDate();

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
                    <CountrySelect
                        label={this.props.label}
                        onChange={land =>
                            this.oppdaterFormData({
                                land
                            })
                        }
                        language={language}
                        defaultValue={formData.land}
                    />
                            <DateInput
                                id="boddFraDato"
                                label={getMessage(intl, 'standard.text.fra')}
                                dato={getDateFromString(formData.fom)}
                                onChange={dato =>
                                    this.oppdaterFormData({
                                        fom: dato.toISOString()
                                    })
                                }
                                avgrensninger={{
                                    minDato: fomMinDato,
                                    maksDato: idag
                                }}
                                kalenderplassering="fullskjerm"
                            />
                            <DateInput
                                id="boddTilDato"
                                label={getMessage(intl, 'standard.text.til')}
                                dato={getDateFromString(formData.tom)}
                                onChange={dato =>
                                    this.oppdaterFormData({
                                        tom: dato.toISOString()
                                    })
                                }
                                avgrensninger={{
                                    minDato: idag,
                                    maksDato: tomMaksDato
                                }}
                                kalenderplassering="fullskjerm"
                            />

                    <div className="countryModal__buttonBar">
                        <Knapp
                            type="standard"
                            onClick={() => this.props.closeModal()}
                            htmlType="button"
                        >
                            <FormattedMessage id="medlemmskap.modal.avbryt" />
                        </Knapp>
                        <Hovedknapp onClick={() => formData && this.onSubmit()}>
                            <FormattedMessage id={lagreKnappTekstId} />
                        </Hovedknapp>
                    </div>
                </div>
            </Modal>
        );
    }
}
export default injectIntl(CountryModal);

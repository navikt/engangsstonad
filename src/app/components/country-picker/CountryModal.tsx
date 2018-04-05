import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';

const { Undertittel, Element } = require('nav-frontend-typografi');
const Modal = require('nav-frontend-modal').default;
const { Knapp, Hovedknapp } = require('nav-frontend-knapper');

import DateInput from 'components/date-input/DateInput';
import getMessage from 'util/i18n/i18nUtils';
import { Periode } from '../../types/domain/Utenlandsopphold';
import CountrySelect from 'components/country-select/CountrySelect';

interface OwnProps {
    language: string;
    utenlandsopphold?: Periode;
    label: string;
    onSubmit: (periode: Periode) => void;
    closeModal: () => void;
}
type Props = OwnProps & InjectedIntlProps;

interface State {
    titleText?: string;
    submitButtonText?: string;
    utenlandsopphold?: Periode;
}

class CountryModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { intl, utenlandsopphold } = props;
        if (utenlandsopphold) {
            this.state = {
                titleText: getMessage(intl, 'medlemmskap.modal.overskrift'),
                submitButtonText: getMessage(intl, 'medlemmskap.modal.lagreEndringer'),
                utenlandsopphold
            };
        } else {
            this.state = {
                titleText: getMessage(intl, 'medlemmskap.modal.overskrift'),
                submitButtonText: getMessage(intl, 'medlemmskap.knapp.leggTilLand')
            };
        }
    }

    onSubmit() {
        const { varighet, land } = (this.state.utenlandsopphold as Periode);
        if (land !== undefined && varighet.fom !== undefined && varighet.tom !== undefined) {
            const visit: Periode = { land, varighet };
            this.props.onSubmit(visit);
        }
    }

    render() {
        const { intl, language } = this.props;
        const { utenlandsopphold } = this.state;
        const landValue = utenlandsopphold ? utenlandsopphold.land : '';
        const fomValue = utenlandsopphold ? utenlandsopphold.varighet.fom : '';
        const tomValue = utenlandsopphold ? utenlandsopphold.varighet.tom : '';

        return (
            <Modal
                isOpen={true}
                contentLabel="landvelger"
                closeButton={false}
                onRequestClose={() => {
                    this.props.closeModal();
                }}
            >
                <div>
                    <Undertittel className="countryModal__title">{this.state.titleText}</Undertittel>
                    <Element>{this.props.label}</Element>
                    <CountrySelect
                        label=""
                        onChange={
                            (e: React.ChangeEvent<HTMLSelectElement>) =>
                                this.setState({
                                    utenlandsopphold: {
                                        land: e.target.value,
                                        varighet: {
                                            fom: fomValue,
                                            tom: tomValue
                                        }
                                    }
                                })
                        }
                        language={language}
                        defaultValue={landValue}
                    />
                    <DateInput
                        id="boddFraDato"
                        inputProps={{ value: fomValue }}
                        selectedDate={fomValue}
                        label={getMessage(intl, 'standard.text.fra')}
                        onChange={(date: string) => {
                            this.setState({
                                utenlandsopphold: {
                                    land: landValue,
                                    varighet: {
                                        fom: date,
                                        tom: tomValue
                                    }
                                }
                            });
                        }}
                    />
                    <DateInput
                        id="boddTilDato"
                        label={getMessage(intl, 'standard.text.til')}
                        inputProps={{ value: tomValue }}
                        selectedDate={tomValue}
                        onChange={(date: string) => {
                            this.setState({
                                utenlandsopphold: {
                                    land: landValue,
                                    varighet: {
                                        fom: fomValue,
                                        tom: date
                                    }
                                }
                            });
                        }}
                    />
                    <div className="countryModal__buttonBar">
                        <Knapp onClick={() => this.props.closeModal()} htmlType="button">
                            {getMessage(intl, 'medlemmskap.modal.avbryt')}
                        </Knapp>
                        <Hovedknapp onClick={() => utenlandsopphold && this.onSubmit()} htmlType="button">
                            {this.state.submitButtonText}
                        </Hovedknapp>
                    </div>
                </div>
            </Modal>
        );
    }
}
export default injectIntl(CountryModal);

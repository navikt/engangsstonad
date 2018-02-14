import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import * as countries from 'i18n-iso-countries';
const bokmalCountryList = require('i18n-iso-countries/langs/nb.json');
const nynorskCountryList = require('i18n-iso-countries/langs/nn.json');

const { Select } = require('nav-frontend-skjema');
const { Undertittel, Element } = require('nav-frontend-typografi');
const Modal = require('nav-frontend-modal').default;
const { Knapp } = require('nav-frontend-knapper');

import DateInput from 'shared/date-input/DateInput';
import getMessage from '../../../util/i18n/i18nUtils';

import { utlandsopphold } from 'shared/country-picker/types';

interface OwnProps {
    language: string;
    visit?: utlandsopphold;
    onSubmit: (utl: utlandsopphold) => void;
    closeModal: () => void;
}
type Props = OwnProps & InjectedIntlProps;

interface State {
    titleText?: string;
    submitButtonText?: string;
    land?: string;
    startDato?: string;
    sluttDato?: string;
}

class CountryModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const countriesLanguage = props.language === 'nb' ? bokmalCountryList : nynorskCountryList;
        countries.registerLocale(countriesLanguage);

        const { intl } = props;
        if (props.visit) {
            this.state = {
                titleText: getMessage(intl, 'medlemmskap.landvelger.endre'),
                submitButtonText: getMessage(intl, 'medlemmskap.landvelger.lagre'),
                ...props.visit
            };
        } else {
            this.state = {
                titleText: getMessage(intl, 'medlemmskap.landvelger.leggTil'),
                submitButtonText: getMessage(intl, 'medlemmskap.landvelger.leggTilLand')
            };
        }
    }

    renderSelectOptions() {
        const { language } = this.props;
        return Object.entries(countries.getNames(language))
            .sort((a: string[], b: string[]) => a[1].localeCompare(b[1], language))
            .map((optionValue: string[]) => (
                <option key={optionValue[0]} value={optionValue[0]}>
                    {optionValue[1]}
                </option>
            ));
    }

    onSubmit() {
        if (this.state.land !== undefined && this.state.startDato !== undefined && this.state.sluttDato !== undefined) {
            const visit = {
                land: this.state.land,
                startDato: this.state.startDato,
                sluttDato: this.state.sluttDato
            };
            this.props.onSubmit(visit);
        }
    }

    render() {
        const { intl } = this.props;
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
                    <Element>{getMessage(intl, 'medlemmskap.text.jegBodde')}</Element>
                    <Select
                        label=""
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ land: e.target.value })}
                        defaultValue={this.state.land}
                    >
                        <option value="" />
                        {this.renderSelectOptions()}
                    </Select>
                    <DateInput
                        id="boddFraDato"
                        inputProps={{ value: this.state.startDato }}
                        label="fra"
                        onChange={(date: string) => this.setState({ startDato: date })}
                        errorMessage=""
                    />
                    <DateInput
                        id="boddTilDato"
                        label="til"
                        inputProps={{ value: this.state.sluttDato }}
                        onChange={(date: string) => this.setState({ sluttDato: date })}
                        errorMessage=""
                    />
                    <Knapp
                        onClick={() => this.props.closeModal()}
                    >
                        {getMessage(intl, 'medlemmskap.landvelger.avbryt')}
                    </Knapp>
                    <Knapp onClick={() => this.onSubmit()}>{this.state.submitButtonText}</Knapp>
                </div>
            </Modal>
        );
    }
}
export default injectIntl(CountryModal);

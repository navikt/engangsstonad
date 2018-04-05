import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import ValidDateInput from '../../../../lib/valid-date-input';
import { soknadActionCreators as soknad } from '../../../../redux/actions';
import { default as Barn, FodtBarn } from '../../../../types/domain/Barn';
import getMessage from 'util/i18n/i18nUtils';
import { DispatchProps } from '../../../../redux/types/index';
const { Checkbox } = require('nav-frontend-skjema');
import { containsUnlikeValues } from 'util/arrayUtil';

interface StateProps {
    barn: Barn;
}

interface OwnProps {
    bornOnSameDate: boolean;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

const getFodselsdatoForBarn = (barn: FodtBarn, index: number): Date | undefined => {
    if (barn && barn.fødselsdatoer.length > 0) {
        const dato = barn.fødselsdatoer[index];
        return dato ? new Date(dato) : undefined;
    }
    return undefined;
};

export default class FødtBarnPartial extends React.Component<Props, OwnProps> {
    constructor(props: Props) {
        super(props);
        this.state = {
            bornOnSameDate: !containsUnlikeValues(props.barn.fødselsdatoer)
        };
        this.diffrentBirthDatesCheckboxHandler = this.diffrentBirthDatesCheckboxHandler.bind(this);
    }

    getFødselsdatoValidators(index: number) {
        const { intl } = this.props;
        const barn = this.props.barn as any;
        return [
            {
                test: () => barn.fødselsdatoer[index],
                failText: getMessage(intl, 'valideringsfeil.fodselsdato.duMåOppgi')
            },
            {
                test: () => barn.fødselsdatoer[index] !== '',
                failText: getMessage(intl, 'valideringsfeil.fodselsdato.duMåOppgi')
            },
            {
                test: () => new Date(barn.fødselsdatoer[index]) <= new Date(),
                failText: getMessage(intl, 'valideringsfeil.fodselsdato.måVæreIdagEllerTidligere')
            }
        ];
    }

    componentDidUpdate(nextProps: Props, prevState: any) {
        const { dispatch, barn } = this.props;
        // tslint:disable-next-line:triple-equals
        if (barn.antallBarn != barn.fødselsdatoer.length) {
            dispatch(soknad.updateFødselsdatoer(this.state.bornOnSameDate));
        }
    }

    getDateInputLabels(): Array<String> {
        const { intl } = this.props;
        const firstDateInputLabel = this.state.bornOnSameDate
            ? getMessage(intl, 'relasjonBarn.text.fodselsdato')
            : getMessage(intl, 'relasjonBarn.text.fodselsdato.flere.1');

        const dateInputLabels = [
            firstDateInputLabel,
            getMessage(intl, 'relasjonBarn.text.fodselsdato.flere.2'),
            getMessage(intl, 'relasjonBarn.text.fodselsdato.flere.3'),
            getMessage(intl, 'relasjonBarn.text.fodselsdato.flere.4'),
            getMessage(intl, 'relasjonBarn.text.fodselsdato.flere.5'),
            getMessage(intl, 'relasjonBarn.text.fodselsdato.flere.6'),
            getMessage(intl, 'relasjonBarn.text.fodselsdato.flere.7'),
            getMessage(intl, 'relasjonBarn.text.fodselsdato.flere.8'),
            getMessage(intl, 'relasjonBarn.text.fodselsdato.flere.9')
        ];
        return dateInputLabels;
    }

    onFødselsdatoInputChange(fødselsdato: Date, index: number) {
        const { dispatch } = this.props;
        dispatch(soknad.editFødselsdato(fødselsdato ? fødselsdato.toISOString() : '', this.state.bornOnSameDate, index));
    }

    diffrentBirthDatesCheckboxHandler() {
        const { dispatch, barn } = this.props;
        this.setState({ bornOnSameDate: !this.state.bornOnSameDate }, () => {
            if (this.state.bornOnSameDate) {
                dispatch(soknad.editFødselsdato(barn.fødselsdatoer[0], this.state.bornOnSameDate));
            }
        });
    }

    render() {
        const { barn, intl } = this.props;
        if (barn.antallBarn === undefined) {
            return null;
        }

        const dateInputLabels = this.getDateInputLabels();
        const idag = new Date();

        return (
            <div>
                <ValidDateInput
                    id="fødselsdato"
                    label={dateInputLabels[0]}
                    dato={getFodselsdatoForBarn(barn, 0)}
                    onChange={(dato: Date) => this.onFødselsdatoInputChange(dato, 0)}
                    name="fødselsdato"
                    avgrensninger={{
                        maksDato: idag
                    }}
                    validators={this.getFødselsdatoValidators(0)}
                />
                {barn.antallBarn > 1 && (
                    <Checkbox
                        className="fødselsdatoCheckbox"
                        label={getMessage(intl, 'relasjonBarn.text.fodselsdato.forskjelligeDager')}
                        onChange={this.diffrentBirthDatesCheckboxHandler}
                        checked={!this.state.bornOnSameDate}
                    />
                )}
                {!this.state.bornOnSameDate &&
                    barn.fødselsdatoer.slice(1).map((element, index) => {
                        const fødselsdatoArrayIndex = index + 1;
                        return (
                            <ValidDateInput
                                id="fødselsdato"
                                label={dateInputLabels[fødselsdatoArrayIndex]}
                                dato={getFodselsdatoForBarn(barn, fødselsdatoArrayIndex)}
                                onChange={(dato: Date) => this.onFødselsdatoInputChange(dato, fødselsdatoArrayIndex)}
                                name="fødselsdato"
                                validators={this.getFødselsdatoValidators(fødselsdatoArrayIndex)}
                                key={`fødselsdato` + fødselsdatoArrayIndex}
                            />
                        );
                    })}
            </div>
        );
    }
}

import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import * as moment from 'moment';
import ValidDateInput from '../../../../lib/valid-date-input';
import { soknadActionCreators as soknad } from '../../../../redux/actions';
import { default as Barn, FodtBarn } from '../../../../types/domain/Barn';
import getMessage from 'util/i18n/i18nUtils';
import { DispatchProps } from '../../../../redux/types/index';
const { Checkbox } = require('nav-frontend-skjema');
import { containsUnlikeValues } from 'util/arrayUtil';
import LabelText from 'components/labeltext/LabelText';
import FormBlock from 'components/form-block/FormBlock';

interface StateProps {
    barn: Barn;
}

interface OwnProps {
    bornOnSameDate: boolean;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

const getFodselsdatoForBarn = (
    barn: FodtBarn,
    index: number
): Date | undefined => {
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
            bornOnSameDate: !containsUnlikeValues((props.barn as FodtBarn).fødselsdatoer)
        };
        this.diffrentBirthDatesCheckboxHandler = this.diffrentBirthDatesCheckboxHandler.bind(
            this
        );
    }

    getFødselsdatoValidators(index: number) {
        const { intl } = this.props;
        const barn = this.props.barn as any;
        return [
            {
                test: () => barn.fødselsdatoer[index],
                failText: getMessage(
                    intl,
                    'valideringsfeil.fodselsdato.duMåOppgi'
                )
            },
            {
                test: () => barn.fødselsdatoer[index] !== '',
                failText: getMessage(
                    intl,
                    'valideringsfeil.fodselsdato.duMåOppgi'
                )
            },
            {
                test: () =>
                    new Date(barn.fødselsdatoer[index]) <=
                    moment(new Date())
                        .endOf('day')
                        .toDate(),
                failText: getMessage(
                    intl,
                    'valideringsfeil.fodselsdato.måVæreIdagEllerTidligere'
                )
            }
        ];
    }

    componentDidUpdate(nextProps: Props, prevState: any) {
        const { dispatch, barn } = this.props;
        // tslint:disable-next-line:triple-equals
        if (barn.antallBarn != (barn as FodtBarn).fødselsdatoer.length) {
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
        dispatch(
            soknad.editFødselsdato(
                fødselsdato ? fødselsdato.toISOString() : '',
                this.state.bornOnSameDate,
                index
            )
        );
    }

    diffrentBirthDatesCheckboxHandler() {
        const { dispatch, barn } = this.props;
        this.setState({ bornOnSameDate: !this.state.bornOnSameDate }, () => {
            if (this.state.bornOnSameDate) {
                dispatch(
                    soknad.editFødselsdato(
                        (barn as FodtBarn).fødselsdatoer[0],
                        this.state.bornOnSameDate
                    )
                );
            }
        });
    }

    render() {
        const { barn, intl } = this.props;
        if (barn.antallBarn === undefined) {
            return null;
        }

        const dateInputLabels = this.getDateInputLabels();
        const sisteGyldigeFødselsdato = moment()
            .endOf('day')
            .toDate();
        const førsteGyldigeFødselsdato = moment()
            .add(-1, 'years')
            .startOf('day')
            .toDate();

        const datoavgrensning = {
            minDato: førsteGyldigeFødselsdato,
            maksDato: sisteGyldigeFødselsdato
        };

        return (
            <FormBlock>
                <FormBlock margin="xxs">
                    <ValidDateInput
                        id="fødselsdato"
                        label={<LabelText>{dateInputLabels[0]}</LabelText>}
                        dato={getFodselsdatoForBarn((barn as FodtBarn), 0)}
                        onChange={(dato: Date) =>
                            this.onFødselsdatoInputChange(dato, 0)
                        }
                        name="fødselsdato"
                        avgrensninger={datoavgrensning}
                        validators={this.getFødselsdatoValidators(0)}
                    />
                </FormBlock>
                <FormBlock visible={barn.antallBarn > 1} margin="s">
                    <Checkbox
                        className="fødselsdatoCheckbox"
                        label={getMessage(
                            intl,
                            'relasjonBarn.text.fodselsdato.forskjelligeDager'
                        )}
                        onChange={this.diffrentBirthDatesCheckboxHandler}
                        checked={!this.state.bornOnSameDate}
                    />
                </FormBlock>
                {!this.state.bornOnSameDate &&
                    (barn as FodtBarn).fødselsdatoer.slice(1).map((element, index) => {
                        const fødselsdatoArrayIndex = index + 1;
                        return (
                            <FormBlock
                                margin="xs"
                                key={`fødselsdato` + fødselsdatoArrayIndex}
                            >
                                <ValidDateInput
                                    id="fødselsdato"
                                    label={
                                        <LabelText>
                                            {
                                                dateInputLabels[
                                                    fødselsdatoArrayIndex
                                                ]
                                            }
                                        </LabelText>
                                    }
                                    dato={getFodselsdatoForBarn(
                                        (barn as FodtBarn),
                                        fødselsdatoArrayIndex
                                    )}
                                    onChange={(dato: Date) =>
                                        this.onFødselsdatoInputChange(
                                            dato,
                                            fødselsdatoArrayIndex
                                        )
                                    }
                                    name="fødselsdato"
                                    validators={this.getFødselsdatoValidators(
                                        fødselsdatoArrayIndex
                                    )}
                                    avgrensninger={datoavgrensning}
                                />
                            </FormBlock>
                        );
                    })}
            </FormBlock>
        );
    }
}

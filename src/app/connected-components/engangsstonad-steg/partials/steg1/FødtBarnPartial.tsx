// import * as React from 'react';
// import { InjectedIntlProps } from 'react-intl';
// import * as moment from 'moment';
// import ValidDateInput from '../../../../lib/valid-date-input';
// import { soknadActionCreators as soknad } from '../../../../redux/actions';
// import { default as Barn, FodtBarn } from '../../../../types/domain/Barn';
// import getMessage from 'common/util/i18nUtils';
// import { DispatchProps } from 'common/redux/types';
// import LabelText from 'common/components/labeltekst/Labeltekst';
// import FormBlock from 'components/form-block/FormBlock';
// import { buildDateObject } from 'util/date/dateUtils';

// interface StateProps {
//     barn: Barn;
// }

// interface OwnProps {
//     bornOnSameDate: boolean;
// }

// type Props = StateProps & InjectedIntlProps & DispatchProps;

// export default class FødtBarnPartial extends React.Component<Props, OwnProps> {
//     constructor(props: Props) {
//         super(props);
//     }

//     getFødselsdatoValidators(index: number) {
//         const { intl } = this.props;
//         const barn = this.props.barn as FodtBarn;
//         return [
//             {
//                 test: () => barn.fødselsdatoer[index],
//                 failText: getMessage(
//                     intl,
//                     'valideringsfeil.fodselsdato.duMåOppgi'
//                 )
//             },
//             {
//                 test: () => barn.fødselsdatoer[index] !== '',
//                 failText: getMessage(
//                     intl,
//                     'valideringsfeil.fodselsdato.duMåOppgi'
//                 )
//             },
//             {
//                 test: () =>
//                     new Date(barn.fødselsdatoer[index]) <=
//                     moment(new Date())
//                         .endOf('day')
//                         .toDate(),
//                 failText: getMessage(
//                     intl,
//                     'valideringsfeil.fodselsdato.måVæreIdagEllerTidligere'
//                 )
//             },
//             {
//                 test: () => moment(barn.fødselsdatoer[index]).isSameOrAfter(moment().subtract(3, 'years').startOf('day')),
//                 failText: getMessage(intl, 'valideringsfeil.fodselsdato.ikkeMerEnn3ÅrTilbake')
//             }
//         ];
//     }

//     onFødselsdatoInputChange(fødselsdato: Date | string, index: number) {
//         if (fødselsdato) {
//             const { dispatch } = this.props;
//             dispatch(
//                 soknad.setFødselsdato(
//                     fødselsdato && fødselsdato instanceof Date ? fødselsdato.toISOString() : fødselsdato
//                 )
//             );
//         }
//     }

//     render() {
//         const { intl } = this.props;
//         const barn = this.props.barn as FodtBarn;
//         if (barn.antallBarn === undefined) {
//             return null;
//         }

//         const sisteGyldigeFødselsdato = moment()
//             .endOf('day')
//             .toDate();
//         const førsteGyldigeFødselsdato = moment()
//             .subtract(3, 'years')
//             .startOf('day')
//             .toDate();

//         const datoavgrensning = {
//             minDato: førsteGyldigeFødselsdato,
//             maksDato: sisteGyldigeFødselsdato
//         };

//         return (
//             <FormBlock>
//                 <FormBlock margin="xxs">
//                     <ValidDateInput
//                         id="fødselsdato"
//                         label={<LabelText>{getMessage(intl, 'relasjonBarn.text.fodselsdato')}</LabelText>}
//                         dato={buildDateObject(barn.fødselsdatoer[0])}
//                         onChange={(dato: Date) => this.onFødselsdatoInputChange(dato, 0)}
//                         onInputChange={(dato: string) => this.onFødselsdatoInputChange(dato, 0)}
//                         name="fødselsdato"
//                         avgrensninger={datoavgrensning}
//                         validators={this.getFødselsdatoValidators(0)}
//                     />
//                 </FormBlock>
//             </FormBlock>
//         );
//     }
// }

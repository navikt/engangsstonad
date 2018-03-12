import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
const { ValidDateInput } = require('./../../../../lib') as any;
import { soknadActionCreators as soknad } from '../../../../redux/actions';
import { default as Barn, FodtBarn } from '../../../../types/domain/Barn';
import getMessage from 'util/i18n/i18nUtils';
import { DispatchProps } from '../../../../redux/types/index';

interface StateProps {
    barn: Barn;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

export default class FødtBarnPartial extends React.Component<Props> {
    getFødselsdatoValidators() {
        const { intl } = this.props;
        const barn = this.props.barn as any;
        return [
            { test: () => (barn.fødselsdatoer[0]), failText: getMessage(intl, 'valideringsfeil.fodselsdato.duMåOppgi') },
            { test: () => (barn.fødselsdatoer[0] !== ''), failText: getMessage(intl, 'valideringsfeil.fodselsdato.duMåOppgi') },
            {
                test: () => (new Date(barn.fødselsdatoer[0]) <= new Date()),
                failText: getMessage(intl, 'valideringsfeil.fodselsdato.måVæreIdagEllerTidligere')
            }
        ];
    }

    render() {
        const { barn, dispatch, intl } = this.props;

        return (
            <ValidDateInput
                id="fødselsdato"
                label={getMessage(intl, 'relasjonBarn.text.fodselsdato')}
                selectedDate={barn && (barn as FodtBarn).fødselsdatoer.length > 0 ? (barn as any).fødselsdatoer[0] : ''}
                onChange={(e: string) => dispatch(soknad.addFødselsdato(e))}
                name="fødselsdato"
                validators={this.getFødselsdatoValidators()}
                key="fødselsdato"
            />
        );
    }
}

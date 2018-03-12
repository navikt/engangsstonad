import * as React from 'react';
import { connect } from 'react-redux';
const { Checkbox, Input } = require('nav-frontend-skjema');
import { DispatchProps } from '../../redux/types';
import { injectIntl } from 'react-intl';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import AnnenForelder from '../../types/domain/AnnenForelder';
import getMessage from 'util/i18n/i18nUtils';
import {
    setAnnenForelderBostedsland,
    setAnnenForelderFnr, setAnnenForelderKanIkkeOppgis,
    setAnnenForelderNavn, setAnnenForelderUtenlandskFnr
} from 'actions/soknad/soknadActionCreators';
import CountrySelect from 'components/country-select/CountrySelect';

interface StateProps {
    annenForelder: AnnenForelder;
    language: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

export class Steg2 extends React.Component<Props> {
    render() {
        const { dispatch, intl, annenForelder, language } = this.props;

        return (
            <div>
                <Input
                    label={getMessage(intl, 'annenForelder.label.navn')}
                    placeholder={getMessage(intl, 'annenForelder.placeholder.navn')}
                    disabled={annenForelder.kanIkkeOppgis || false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setAnnenForelderNavn(e.target.value))}
                    value={annenForelder.navn || ''}
                />
                <Checkbox
                    checked={annenForelder.kanIkkeOppgis || false}
                    label={getMessage(intl, 'annenForelder.label.kanIkkeOppgiNavn')}
                    onChange={() => dispatch(setAnnenForelderKanIkkeOppgis(!annenForelder.kanIkkeOppgis))}
                />
                {annenForelder.navn && [
                    <Input
                        label={getMessage(intl, 'annenForelder.label.fødselsnummer')}
                        placeholder={getMessage(intl, 'annenForelder.placeholder.fødselsnummer')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setAnnenForelderFnr(e.target.value))}
                        key="fnr"
                    />,
                    <Checkbox
                        label={getMessage(intl, 'annenForelder.label.utenlandskFødselsnummer')}
                        onChange={() => dispatch(setAnnenForelderUtenlandskFnr(!annenForelder.utenlandskFnr))}
                        key="utenlandskFnr"
                    />
                ]}
                {annenForelder.utenlandskFnr === true && (
                    <CountrySelect
                        label={getMessage(intl, 'annenForelder.label.bostedsland')}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setAnnenForelderBostedsland(e.target.value))}
                        language={language}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    annenForelder: state.soknadReducer.annenForelder,
    language: state.commonReducer.language
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(Steg2));

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
import LabelMedHjelpetekst from 'components/label-med-hjelpetekst/LabelMedHjelpetekst';

interface StateProps {
    annenForelder: AnnenForelder;
    language: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

export class Steg2 extends React.Component<Props> {
    render() {
        const { dispatch, intl, annenForelder, language } = this.props;

        return (
            <div className="step2">
                <div className="section">
                    <Input
                        label={<b>{getMessage(intl, 'annenForelder.label.navn')}</b>}
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
                </div>
                {annenForelder.navn && (
                    <div className="section">
                        <Input
                            label={
                                <LabelMedHjelpetekst
                                    label={getMessage(intl, 'annenForelder.label.fødselsnummer')}
                                    hjelpetekst={getMessage(intl, 'annenForelder.hjelpetekst.dNummer')}
                                />
                            }
                            placeholder={getMessage(intl, 'annenForelder.placeholder.fødselsnummer')}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setAnnenForelderFnr(e.target.value))}
                        />
                        <Checkbox
                            label={getMessage(intl, 'annenForelder.label.utenlandskFødselsnummer')}
                            onChange={() => dispatch(setAnnenForelderUtenlandskFnr(!annenForelder.utenlandskFnr))}
                        />
                    </div>
                )}
                {annenForelder.utenlandskFnr === true && (
                    <div className="section">
                        <CountrySelect
                            label={<b>{getMessage(intl, 'annenForelder.label.bostedsland')}</b>}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setAnnenForelderBostedsland(e.target.value))}
                            language={language}
                        />
                    </div>
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

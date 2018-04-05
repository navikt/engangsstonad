import * as React from 'react';
import { connect } from 'react-redux';
const { Checkbox, Input } = require('nav-frontend-skjema');
import { DispatchProps } from '../../redux/types';
import { injectIntl } from 'react-intl';
import InjectedIntlProps = ReactIntl.InjectedIntlProps;
import AnnenForelder from '../../types/domain/AnnenForelder';
import getMessage from 'util/i18n/i18nUtils';
const isValidFødselsnummer = require('is-valid-fodselsnummer');
import {
    setAnnenForelderBostedsland,
    setAnnenForelderFnr, setAnnenForelderKanIkkeOppgis,
    setAnnenForelderNavn, setAnnenForelderUtenlandskFnr
} from 'actions/soknad/soknadActionCreators';
import CountrySelect from 'components/country-select/CountrySelect';
import LabelMedHjelpetekst from 'components/label-med-hjelpetekst/LabelMedHjelpetekst';
const { ValidInput } = require('./../../lib') as any;

interface StateProps {
    annenForelder: AnnenForelder;
    language: string;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

export class Steg2 extends React.Component<Props> {
    getFødselsnummerValidators() {
        const { annenForelder, intl } = this.props;
        return [{
            test: () => {
                let result = true;
                if (!annenForelder.utenlandskFnr) {
                    try {
                        result = isValidFødselsnummer(annenForelder.fnr);
                    } catch (e) {
                        result = false;
                    }
                }
                return result;
            },
            failText: getMessage(intl, 'annenForelder.ugyldigFødselsnummer')
        }];
    }

    getNavnValidators() {
        const { annenForelder, intl } = this.props;
        return [{
            test: () => {
                return annenForelder && annenForelder.navn && annenForelder.navn.length > 0;
            },
            failText: getMessage(intl, 'annenForelder.ugyldigNavn')
        }];
    }

    getBostedslandValidators() {
        const { annenForelder, intl } = this.props;
        return [{
            test: () => {
                return annenForelder && annenForelder.bostedsland;
            },
            failText: getMessage(intl, 'annenForelder.ugyldigBostedsland')
        }];
    }

    render() {
        const { dispatch, intl, annenForelder, language } = this.props;
        const NavnComponent = annenForelder.kanIkkeOppgis ? Input : ValidInput;
        const FnrComponent = annenForelder.utenlandskFnr ? Input : ValidInput;

        return (
            <div className="step2">
                <div className="section">
                    <NavnComponent
                        id="js-annenForelder"
                        name="navnfelt"
                        label={<b>{getMessage(intl, 'annenForelder.label.navn')}</b>}
                        placeholder={getMessage(intl, 'annenForelder.placeholder.navn')}
                        disabled={annenForelder.kanIkkeOppgis || false}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setAnnenForelderNavn(e.target.value))}
                        value={annenForelder.navn || ''}
                        validators={this.getNavnValidators()}
                    />
                    <Checkbox
                        checked={annenForelder.kanIkkeOppgis || false}
                        label={getMessage(intl, 'annenForelder.label.kanIkkeOppgiNavn')}
                        onChange={() => dispatch(setAnnenForelderKanIkkeOppgis(!annenForelder.kanIkkeOppgis))}
                    />
                </div>
                {annenForelder.navn !== undefined && (
                    <div className="section">
                        <FnrComponent
                            label={
                                <LabelMedHjelpetekst
                                    label={getMessage(intl, 'annenForelder.label.fødselsnummer')}
                                    hjelpetekst={getMessage(intl, 'annenForelder.hjelpetekst.dNummer')}
                                    buttonProps={{id: 'fnrHjelpetekstBtn'}}
                                />
                            }
                            id="js-fødselsnummer"
                            placeholder={getMessage(intl, 'annenForelder.placeholder.fødselsnummer')}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setAnnenForelderFnr(e.target.value))}
                            name="fodselsnummerfelt"
                            validators={this.getFødselsnummerValidators()}
                            value={annenForelder.fnr || ''}
                        />
                        <Checkbox
                            checked={annenForelder.utenlandskFnr || false}
                            label={getMessage(intl, 'annenForelder.label.utenlandskFødselsnummer')}
                            id="utenlandskFnr"
                            onChange={() => dispatch(setAnnenForelderUtenlandskFnr(!annenForelder.utenlandskFnr))}
                        />
                    </div>
                )}
                {annenForelder.navn !== undefined && annenForelder.utenlandskFnr === true && (
                    <div className="section">
                        <CountrySelect
                            name="bostedsland"
                            defaultValue={annenForelder.bostedsland}
                            label={getMessage(intl, 'annenForelder.label.bostedsland')}
                            onChange={(land) => dispatch(setAnnenForelderBostedsland(land))}
                            language={language}
                            validators={this.getBostedslandValidators()}
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

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
    setAnnenForelderFnr,
    setAnnenForelderKanIkkeOppgis,
    setAnnenForelderNavn,
    setAnnenForelderUtenlandskFnr
} from 'actions/soknad/soknadActionCreators';
import CountrySelect from 'components/country-select/CountrySelect';
import FormBlock from 'components/form-block/FormBlock';
import LabelText from 'components/labeltext/LabelText';
import Person from '../../types/domain/Person';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';

const { ValidInput } = require('./../../lib') as any;

const MAKS_NAVN_LENGTH = 100;
const MAKS_FNR_LENGTH = 30;

interface StateProps {
    annenForelder: AnnenForelder;
    language: string;
    person: Person;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;

class Steg2 extends React.Component<Props> {
    componentDidMount() {
        setTimeout(() => (window as any).hj('vpv', '/engangsstonad/soknad/step-2'), 5000);
    }

    getFødselsnummerValidators() {
        const { annenForelder, intl, person } = this.props;
        return [
            {
                test: () => {
                    let result = true;
                    if (!annenForelder.utenlandskFnr) {
                        try {
                            result = isValidFødselsnummer(annenForelder.fnr);
                        } catch (e) {
                            result = false;
                        }
                    } else {
                        result = annenForelder.fnr !== undefined && annenForelder.fnr !== '' && annenForelder.fnr.length <= MAKS_FNR_LENGTH;
                    }
                    return result;
                },
                failText: getMessage(intl, 'annenForelder.ugyldigFødselsnummer')
            },
            {
                test: () => person.fnr !== annenForelder.fnr,
                failText: getMessage(intl, 'annenForelder.ugyldigEgetFødselsnummer')
            }
        ];
    }

    getNavnValidators() {
        const { annenForelder, intl } = this.props;
        return [
            {
                test: () => {
                    return annenForelder && annenForelder.navn && annenForelder.navn.length > 0 && annenForelder.navn.length <= MAKS_NAVN_LENGTH;
                },
                failText: getMessage(intl, 'annenForelder.ugyldigNavn')
            }
        ];
    }

    getBostedslandValidators() {
        const { annenForelder, intl } = this.props;
        return [
            {
                test: () => {
                    return annenForelder && annenForelder.bostedsland;
                },
                failText: getMessage(intl, 'annenForelder.ugyldigBostedsland')
            }
        ];
    }

    render() {
        const { dispatch, intl, annenForelder, language } = this.props;
        const NavnComponent = annenForelder.kanIkkeOppgis ? Input : ValidInput;
        const FnrComponent = annenForelder.utenlandskFnr ? Input : ValidInput;

        return (
            <Skjemasteg tittel={getMessage(intl, 'annenForelder.sectionheading')}>
                <FormBlock>
                    <FormBlock margin="xxs">
                        <NavnComponent
                            id="js-annenForelder"
                            name="navnfelt"
                            label={<LabelText>{getMessage(intl, 'annenForelder.label.navn')}</LabelText>}
                            placeholder={getMessage(intl, 'annenForelder.placeholder.navn')}
                            disabled={annenForelder.kanIkkeOppgis || false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setAnnenForelderNavn(e.target.value))}
                            value={annenForelder.navn || ''}
                            validators={this.getNavnValidators()}
                            maxLength={MAKS_NAVN_LENGTH}
                        />
                    </FormBlock>
                    <Checkbox
                        checked={annenForelder.kanIkkeOppgis || false}
                        label={getMessage(intl, 'annenForelder.label.kanIkkeOppgiNavn')}
                        onChange={() => dispatch(setAnnenForelderKanIkkeOppgis(!annenForelder.kanIkkeOppgis))}
                    />
                </FormBlock>
                <FormBlock visible={annenForelder.navn !== undefined}>
                    <FormBlock margin="xxs">
                        <FnrComponent
                            label={getMessage(intl, 'annenForelder.label.fødselsnummer')}
                            id="js-fødselsnummer"
                            placeholder={getMessage(intl, 'annenForelder.placeholder.fødselsnummer')}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setAnnenForelderFnr(e.target.value))}
                            name="fodselsnummerfelt"
                            validators={this.getFødselsnummerValidators()}
                            value={annenForelder.fnr || ''}
                            maxLength={MAKS_FNR_LENGTH}
                        />
                    </FormBlock>
                    <Checkbox
                        checked={annenForelder.utenlandskFnr || false}
                        label={getMessage(intl, 'annenForelder.label.utenlandskFødselsnummer')}
                        id="utenlandskFnr"
                        onChange={() => dispatch(setAnnenForelderUtenlandskFnr(!annenForelder.utenlandskFnr))}
                    />
                </FormBlock>
                <FormBlock visible={annenForelder.navn !== undefined && annenForelder.utenlandskFnr === true}>
                    <CountrySelect
                        name="bostedsland"
                        defaultValue={annenForelder.bostedsland}
                        label={<LabelText intlId="annenForelder.label.bostedsland" />}
                        onChange={land => dispatch(setAnnenForelderBostedsland(land))}
                        language={language}
                        validators={this.getBostedslandValidators()}
                    />
                </FormBlock>
            </Skjemasteg>
        );
    }
}

const mapStateToProps = (state: any) => ({
    annenForelder: state.soknadReducer.annenForelder,
    language: state.commonReducer.language,
    person: state.apiReducer.person
});

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(Steg2));

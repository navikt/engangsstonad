import React from 'react';
import { connect } from 'react-redux';
const { Checkbox, Input } = require('nav-frontend-skjema');
import { DispatchProps } from 'common/redux/types';
import { useIntl } from 'react-intl';
import AnnenForelder from '../../types/domain/AnnenForelder';
import getMessage from 'common/util/i18nUtils';

const isValidFødselsnummer = require('is-valid-fodselsnummer');
import {
    setAnnenForelderBostedsland,
    setAnnenForelderFnr,
    setAnnenForelderKanIkkeOppgis,
    setAnnenForelderNavn,
    setAnnenForelderUtenlandskFnr,
} from 'actions/soknad/soknadActionCreators';
import CountrySelect from 'components/country-select/CountrySelect';
import FormBlock from 'components/form-block/FormBlock';
import LabelText from 'common/components/labeltekst/Labeltekst';
import Person from '../../types/domain/Person';
import Skjemasteg from 'components/skjemasteg/Skjemasteg';
import { AppState } from 'reducers/reducers';
import { Språkkode } from 'intl/types';

const { ValidInput } = require('./../../lib') as any;

const MAKS_NAVN_LENGTH = 100;
const MAKS_FNR_LENGTH = 30;

interface StateProps {
    annenForelder: AnnenForelder;
    språkkode: Språkkode;
    person: Person;
}

type Props = StateProps & DispatchProps;

const Steg2: React.FunctionComponent<Props> = ({ annenForelder, person, dispatch, språkkode }) => {
    const intl = useIntl();

    const getFødselsnummerValidators = () => {
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
                        result =
                            annenForelder.fnr !== undefined &&
                            annenForelder.fnr !== '' &&
                            annenForelder.fnr.length <= MAKS_FNR_LENGTH;
                    }
                    return result;
                },
                failText: getMessage(
                    intl,
                    annenForelder.utenlandskFnr
                        ? 'annenForelder.ugyldigFødselsnummer.utenlandsk'
                        : 'annenForelder.ugyldigFødselsnummer'
                ),
            },
            {
                test: () => person.fnr !== annenForelder.fnr,
                failText: getMessage(intl, 'annenForelder.ugyldigEgetFødselsnummer'),
            },
        ];
    };

    const getNavnValidators = () => {
        return [
            {
                test: () => {
                    return (
                        annenForelder &&
                        annenForelder.navn &&
                        annenForelder.navn.length > 0 &&
                        annenForelder.navn.length <= MAKS_NAVN_LENGTH
                    );
                },
                failText: getMessage(intl, 'annenForelder.ugyldigNavn'),
            },
        ];
    };

    const getBostedslandValidators = () => {
        return [
            {
                test: () => {
                    return annenForelder && annenForelder.bostedsland;
                },
                failText: getMessage(intl, 'annenForelder.ugyldigBostedsland'),
            },
        ];
    };

    const NavnComponent = annenForelder.kanIkkeOppgis ? Input : ValidInput;

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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            dispatch(setAnnenForelderNavn(e.target.value))
                        }
                        value={annenForelder.navn || ''}
                        validators={getNavnValidators()}
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
                    <ValidInput
                        label={getMessage(intl, 'annenForelder.label.fødselsnummer')}
                        id="js-fødselsnummer"
                        placeholder={getMessage(intl, 'annenForelder.placeholder.fødselsnummer')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            dispatch(setAnnenForelderFnr(e.target.value))
                        }
                        name="fodselsnummerfelt"
                        validators={getFødselsnummerValidators()}
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
                    onChange={(land) => dispatch(setAnnenForelderBostedsland(land))}
                    språkkode={språkkode}
                    validators={getBostedslandValidators()}
                />
            </FormBlock>
        </Skjemasteg>
    );
};

const mapStateToProps = (state: AppState) => ({
    annenForelder: state.soknadReducer.annenForelder,
    språkkode: state.commonReducer.språkkode,
    person: state.apiReducer.person!,
});

export default connect<StateProps, {}, {}>(mapStateToProps)(Steg2);

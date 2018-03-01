import { SoknadActionKeys, SoknadActionTypes } from '../actions/soknad/soknadActionDefinitions';
import EngangsstonadSoknad from '../../types/domain/EngangsstonadSoknad';

const getDefaultState = () => {
    const engangsstonadSoknad: EngangsstonadSoknad = {
        barn: {
            fødselsdatoer: []
        },
        utenlandsopphold: {
            perioder: []
        }
    };
    return engangsstonadSoknad;
};

const soknadReducer = (state = getDefaultState(), action: SoknadActionTypes) => {
    let { barn, utenlandsopphold } = state;

    switch (action.type) {
        case SoknadActionKeys.ADD_PERIODE:
            const perioder = utenlandsopphold.perioder.concat([action.periode]);
            return { ...state, utenlandsopphold: { ...utenlandsopphold, perioder } };
        case SoknadActionKeys.EDIT_PERIODE:
            utenlandsopphold.perioder[action.index] = action.periode;
            return { ...state, utenlandsopphold };
        case SoknadActionKeys.DELETE_PERIODE:
            return {
                ...state,
                utenlandsopphold: {
                    ...utenlandsopphold,
                    utenlandsopphold: utenlandsopphold.perioder.filter((opphold) => {
                        return opphold.land !== action.periode.land;
                    })
                }
            };
        case SoknadActionKeys.SET_JOBBET_I_NORGE_SISTE_12_MND:
            const { jobbetINorgeSiste12Mnd } = action;
            return { ...state, utenlandsopphold: { ...utenlandsopphold, jobbetINorgeSiste12Mnd } };
        case SoknadActionKeys.SET_FODSEL_I_NORGE:
            const { fødselINorge } = action;
            return { ...state, utenlandsopphold: { ...utenlandsopphold, fødselINorge } };
        case SoknadActionKeys.SET_I_NORGE_SISTE_12_MND:
            const { iNorgeSiste12Mnd } = action;
            return { ...state, utenlandsopphold: { ...getDefaultState().utenlandsopphold, iNorgeSiste12Mnd } };
        case SoknadActionKeys.SET_I_NORGE_NESTE_12_MND:
            const { iNorgeNeste12Mnd } = action;
            return { ...state, utenlandsopphold: { ...utenlandsopphold, iNorgeNeste12Mnd, fødselINorge: undefined } };
        case SoknadActionKeys.SET_ER_BARNET_FODT:
            const { erBarnetFødt } = action;
            return { ...state, barn: { ...barn, erBarnetFødt } };
        case SoknadActionKeys.SET_ANTALL_BARN:
            const { antallBarn } = action;
            return { ...state, barn: { ...barn, antallBarn } };
        case SoknadActionKeys.ADD_FØDSELSDATO:
            const fødselsdatoer = [action.fødselsdato];
            return { ...state, barn: { ...barn, fødselsdatoer }};
        case SoknadActionKeys.SET_TERMINDATO:
            const { termindato } = action;
            return {
                ...state,
                barn: barn ?
                    { ...barn, termindato } : { termindato }
            };
        case SoknadActionKeys.SET_TERMINBEKREFTELSE_DATO:
            const { terminbekreftelseDato } = action;
            return {
                ...state,
                barn: barn ? { ...barn, terminbekreftelseDato } : { terminbekreftelseDato }
            };
    }
    return state;
};

export default soknadReducer;

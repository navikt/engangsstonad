import { SoknadActionKeys, SoknadActionTypes } from '../actions/soknad/soknadActionDefinitions';
import { Utenlandsopphold } from '../../types/domain/Medlemsskap';
import EngangsstonadSoknad from '../../types/domain/EngangsstonadSoknad';

const getDefaultState = () => {
    const engangsstonadSoknad: EngangsstonadSoknad = {
        medlemsskap: {
            utenlandsopphold: [] as Utenlandsopphold[]
        }
    };
    return engangsstonadSoknad;
};

const soknadReducer = (state = getDefaultState(), action: SoknadActionTypes) => {
    let { medlemsskap, relasjonTilBarn } = state;

    switch (action.type) {
        case SoknadActionKeys.SET_BARN_ER_FODT:
            const { barnErFodt } = action;
            return {
                ...state,
                barnErFodt: barnErFodt,
                relasjonTilBarn: undefined
            };
        case SoknadActionKeys.ADD_UTENLANDSOPPHOLD:
            const utenlandsopphold = medlemsskap.utenlandsopphold.concat([action.utenlandsopphold]);
            return { ...state, medlemsskap: { ...medlemsskap, utenlandsopphold } };
        case SoknadActionKeys.EDIT_UTENLANDSOPPHOLD:
            medlemsskap.utenlandsopphold[action.index] = action.utenlandsopphold;
            return { ...state, medlemsskap };
        case SoknadActionKeys.DELETE_UTENLANDSOPPHOLD:
            return {
                ...state,
                medlemsskap: {
                    ...medlemsskap,
                    utenlandsopphold: medlemsskap.utenlandsopphold.filter((opphold) => {
                        return opphold.land !== action.utenlandsopphold.land;
                    })
                }
            };
        case SoknadActionKeys.SET_ARBEID_SISTE_12:
            const { arbeidSiste12 } = action;
            return { ...state, medlemsskap: { ...medlemsskap, arbeidSiste12 } };
        case SoknadActionKeys.SET_FODSEL_I_NORGE:
            const { fodselINorge } = action;
            return { ...state, medlemsskap: { ...medlemsskap, fodselINorge } };
        case SoknadActionKeys.SET_I_NORGE_SISTE_12:
            const { iNorgeSiste12 } = action;
            return { ...state, medlemsskap: { ...getDefaultState().medlemsskap, iNorgeSiste12 } };
        case SoknadActionKeys.SET_I_NORGE_NESTE_12:
            const { iNorgeNeste12 } = action;
            return { ...state, medlemsskap: { ...medlemsskap, iNorgeNeste12, fodselINorge: undefined } };
        case SoknadActionKeys.SET_ANTALL_BARN:
            const { antallBarn } = action;
            return { ...state, relasjonTilBarn: { antallBarn } };
        case SoknadActionKeys.SET_FODSELSDATO:
            const { fodselsdato } = action;
            return {
                ...state,
                relasjonTilBarn: relasjonTilBarn ? { ...relasjonTilBarn, fodselsdato } : { fodselsdato }
            };
        case SoknadActionKeys.SET_TERMIN_DATO:
            const { terminDato } = action;
            return {
                ...state,
                relasjonTilBarn: relasjonTilBarn ?
                    { ...relasjonTilBarn, terminDato } : { terminDato }
            };
        case SoknadActionKeys.SET_UTSTEDT_DATO:
            const { utstedtDato } = action;
            return {
                ...state,
                relasjonTilBarn: relasjonTilBarn ? { ...relasjonTilBarn, utstedtDato } : { utstedtDato }
            };
    }
    return state;
};

export default soknadReducer;

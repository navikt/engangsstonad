import { SoknadActionKeys, SoknadActionTypes } from '../actions/soknad/soknadActionDefinitions';
import { Utenlandsopphold } from '../../types/domain/Medlemsskap';

const getDefaultState = () => ({
    utenlandsopphold: [] as Utenlandsopphold[]
});

const soknadReducer = (state = getDefaultState(), action: SoknadActionTypes) => {
    switch (action.type) {
        case SoknadActionKeys.ADD_UTENLANDSOPPHOLD:
            let utenlandsopphold = state.utenlandsopphold;
            utenlandsopphold = utenlandsopphold.concat([action.utenlandsopphold]);
            return { ...state, utenlandsopphold };
        case SoknadActionKeys.EDIT_UTENLANDSOPPHOLD:
            state.utenlandsopphold[action.index] = action.utenlandsopphold;
            return { ...state };
        case SoknadActionKeys.DELETE_UTENLANDSOPPHOLD:
            const index = state.utenlandsopphold.findIndex((current) =>
                (action.utenlandsopphold.land === current.land)
            );
            state.utenlandsopphold.splice(index, 1);
            return { ...{}, ...state };
        case SoknadActionKeys.SET_ANTALL_BARN:
            return { ...state, antallBarn: action.antallBarn };
        case SoknadActionKeys.SET_FODSELSDATO:
            return { ...state, fodselsdato: action.fodselsdato };
        case SoknadActionKeys.SET_TERMIN_DATO:
            return { ...state, terminDato: action.terminDato };
        case SoknadActionKeys.SET_UTSTEDT_DATO:
            return { ...state, utstedtDato: action.utstedtDato };
        case SoknadActionKeys.SET_ARBEID_SISTE_12:
            return { ...state, arbeidSiste12: action.arbeidSiste12 };
        case SoknadActionKeys.SET_FODSEL_I_NORGE:
            return { ...state, fodselINorge: action.fodselINorge };
        case SoknadActionKeys.SET_I_NORGE_SISTE_12:
            return { ...state, iNorgeSiste12: action.iNorgeSiste12 };
        case SoknadActionKeys.SET_I_NORGE_NESTE_12:
            return { ...state, iNorgeNeste12: action.iNorgeNeste12 };
    }
    return state;
};

export default soknadReducer;

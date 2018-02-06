import { SoknadActionKeys, SoknadActionTypes } from '../actions/soknad/soknadActionDefinitions';

const getDefaultState = () => ({
    visits: []
});

const soknadReducer = (state = getDefaultState(), action: SoknadActionTypes) => {
    switch(action.type) {
        case SoknadActionKeys.SET_ANTALL_BARN:
            return { ...state, antallBarn: action.antallBarn };
        case SoknadActionKeys.SET_FODSELSDATO:
            return { ...state, antallBarn: action.fodselsdato };
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
};

export default soknadReducer;

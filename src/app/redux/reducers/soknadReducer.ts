import { SoknadActionKeys, SoknadActionTypes } from '../actions/soknad/soknadActionDefinitions';
import EngangsstonadSoknad from '../../types/domain/EngangsstonadSoknad';
import { FodtBarn } from '../../types/domain/Barn';

const getDefaultState = () => {
    const engangsstonadSoknad: EngangsstonadSoknad = {
        barn: {
            fødselsdatoer: []  
        },
        utenlandsopphold: {
            tidligerePerioder: [],
            senerePerioder: []
        },
        vedlegg: [] as File[],
        annenForelder: {}
    };
    return engangsstonadSoknad;
};

const soknadReducer = (state = getDefaultState(), action: SoknadActionTypes) => {
    let { barn, utenlandsopphold, vedlegg } = state;
    switch (action.type) {
        case SoknadActionKeys.ADD_VEDLEGG:
            const vedleggMetaData = vedlegg.map((file: File) => (
                JSON.stringify({
                    name: file.name,
                    size: file.size
                })
            ));

            const newVedlegg = action.vedlegg.filter((file: File) => {
                return (!vedleggMetaData.includes(JSON.stringify({
                    name: file.name,
                    size: file.size
                })
                ));
            });

            return {
                ...state,
                vedlegg: vedlegg.concat(newVedlegg)
            };
        case SoknadActionKeys.DELETE_VEDLEGG:
            return {
                ...state,
                vedlegg: vedlegg.filter((file: File) => {
                    return file !== action.vedlegg;
                })
            };
        case SoknadActionKeys.ADD_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE:
            const tidligerePerioder = utenlandsopphold.tidligerePerioder.concat([action.periode]);
            return { ...state, utenlandsopphold: { ...utenlandsopphold, tidligerePerioder } };
        case SoknadActionKeys.EDIT_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE:
            utenlandsopphold.tidligerePerioder[action.index] = action.periode;
            return { ...state, utenlandsopphold };
        case SoknadActionKeys.DELETE_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE:
            return {
                ...state,
                utenlandsopphold: {
                    ...utenlandsopphold,
                    tidligerePerioder: utenlandsopphold.tidligerePerioder.filter((opphold) => {
                        return opphold.land !== action.periode.land;
                    })
                }
            };

        case SoknadActionKeys.ADD_SENERE_UTENLANDSOPPHOLD_PERIODE:
            const senerePerioder = utenlandsopphold.senerePerioder.concat([action.periode]);
            return { ...state, utenlandsopphold: { ...utenlandsopphold, senerePerioder } };
        case SoknadActionKeys.EDIT_SENERE_UTENLANDSOPPHOLD_PERIODE:
            utenlandsopphold.senerePerioder[action.index] = action.periode;
            return { ...state, utenlandsopphold };
        case SoknadActionKeys.DELETE_SENERE_UTENLANDSOPPHOLD_PERIODE:
            return {
                ...state,
                utenlandsopphold: {
                    ...utenlandsopphold,
                    senerePerioder: utenlandsopphold.senerePerioder.filter((opphold) => {
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
            return {
                ...state, utenlandsopphold: {
                    ...getDefaultState().utenlandsopphold,
                    iNorgeSiste12Mnd,
                    iNorgeNeste12Mnd: state.utenlandsopphold.iNorgeNeste12Mnd,
                    fødselINorge: state.utenlandsopphold.fødselINorge,
                    tidligerePerioder: state.utenlandsopphold.tidligerePerioder,
                    senerePerioder: state.utenlandsopphold.senerePerioder
                }
            };
        case SoknadActionKeys.SET_I_NORGE_NESTE_12_MND:
            const { iNorgeNeste12Mnd } = action;
            return {
                ...state,
                utenlandsopphold: {
                    ...utenlandsopphold,
                    iNorgeNeste12Mnd,
                    iNorgeSiste12Mnd: state.utenlandsopphold.iNorgeSiste12Mnd,
                    fødselINorge: state.utenlandsopphold.fødselINorge,
                    tidligerePerioder: state.utenlandsopphold.tidligerePerioder,
                    senerePerioder: state.utenlandsopphold.senerePerioder
                }
            };
        case SoknadActionKeys.SET_ER_BARNET_FODT:
            const { erBarnetFødt } = action;
            return { ...state, barn: { fødselsdatoer: [], erBarnetFødt }, vedlegg: [], utenlandsopphold: { ...utenlandsopphold, fødselINorge: undefined } };
        case SoknadActionKeys.SET_ANTALL_BARN:
            return { ...state, barn: { ...barn, antallBarn: action.antallBarn } };
        case SoknadActionKeys.SET_FØDSELSDATO:
            let fødselsdatoer = (state.barn as FodtBarn).fødselsdatoer.slice(0);
            fødselsdatoer[0] = action.fødselsdato;
            return { ...state, 
                barn: { 
                    ...barn, 
                    fødselsdatoer 
                }
            }; 
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
        case SoknadActionKeys.SET_ANNEN_FORELDER_NAVN:
            const { navn } = action;
            return { ...state, annenForelder: { ...state.annenForelder, navn } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_FNR:
            const fnr = action.fnr.length > 0 ? action.fnr : undefined;
            return { ...state, annenForelder: { ...state.annenForelder, fnr } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_UTENLANDSK_FNR:
            const { utenlandskFnr } = action;
            return { ...state, annenForelder: { ...state.annenForelder, utenlandskFnr, bostedsland: undefined } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_BOSTEDSLAND:
            const { bostedsland } = action;
            return { ...state, annenForelder: { ...state.annenForelder, bostedsland } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_KAN_IKKE_OPPGIS:
            const { kanIkkeOppgis } = action;
            return { ...state, annenForelder: { kanIkkeOppgis } };

        case SoknadActionKeys.RESET_SØKNAD:
            return getDefaultState();
    }
    return state;
};

export default soknadReducer;

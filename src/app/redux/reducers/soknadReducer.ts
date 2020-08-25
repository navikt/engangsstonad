import { SoknadActionKeys, SoknadActionTypes } from '../actions/soknad/soknadActionDefinitions';
import EngangsstonadSoknad from '../../types/domain/EngangsstonadSoknad';
import { FodtBarn } from '../../types/domain/Barn';
import { addAttachmentToState, editAttachmentInState, removeAttachmentFromState } from '../util/attachmentStateUpdates';

const initialState = (): EngangsstonadSoknad => {
    const engangsstonadSoknad = {
        type: 'engangsstønad',
        erEndringssøknad: false,
        barn: {
            fødselsdatoer: [],
        },
        informasjonOmUtenlandsopphold: {
            tidligereOpphold: [],
            senereOpphold: [],
        },
        annenForelder: {},
    };
    return engangsstonadSoknad;
};

const soknadReducer = (state = initialState(), action: SoknadActionTypes) => {
    const { barn, informasjonOmUtenlandsopphold } = state;
    switch (action.type) {
        case SoknadActionKeys.ADD_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE:
            const tidligereOpphold = informasjonOmUtenlandsopphold.tidligereOpphold.concat([action.periode]);
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...informasjonOmUtenlandsopphold,
                    tidligereOpphold,
                },
            };
        case SoknadActionKeys.EDIT_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE:
            informasjonOmUtenlandsopphold.tidligereOpphold[action.index] = action.periode;
            return { ...state, informasjonOmUtenlandsopphold };
        case SoknadActionKeys.DELETE_TIDLIGERE_UTENLANDSOPPHOLD_PERIODE:
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...informasjonOmUtenlandsopphold,
                    tidligereOpphold: informasjonOmUtenlandsopphold.tidligereOpphold.filter((opphold) => {
                        return opphold.land !== action.periode.land;
                    }),
                },
            };

        case SoknadActionKeys.ADD_SENERE_UTENLANDSOPPHOLD_PERIODE:
            const senereOpphold = informasjonOmUtenlandsopphold.senereOpphold.concat([action.periode]);
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...informasjonOmUtenlandsopphold,
                    senereOpphold,
                },
            };
        case SoknadActionKeys.EDIT_SENERE_UTENLANDSOPPHOLD_PERIODE:
            informasjonOmUtenlandsopphold.senereOpphold[action.index] = action.periode;
            return { ...state, informasjonOmUtenlandsopphold };
        case SoknadActionKeys.DELETE_SENERE_UTENLANDSOPPHOLD_PERIODE:
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...informasjonOmUtenlandsopphold,
                    senereOpphold: informasjonOmUtenlandsopphold.senereOpphold.filter((opphold) => {
                        return opphold.land !== action.periode.land;
                    }),
                },
            };

        case SoknadActionKeys.SET_JOBBET_I_NORGE_SISTE_12_MND:
            const { jobbetINorgeSiste12Mnd } = action;
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...informasjonOmUtenlandsopphold,
                    jobbetINorgeSiste12Mnd,
                },
            };
        case SoknadActionKeys.SET_FODSEL_I_NORGE:
            const { fødselINorge } = action;
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...informasjonOmUtenlandsopphold,
                    iNorgePåHendelsestidspunktet: fødselINorge,
                },
            };
        case SoknadActionKeys.SET_I_NORGE_SISTE_12_MND:
            const { iNorgeSiste12Mnd } = action;
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...initialState().informasjonOmUtenlandsopphold,
                    iNorgeSiste12Mnd,
                    iNorgeNeste12Mnd: state.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,
                    tidligereOpphold: state.informasjonOmUtenlandsopphold.tidligereOpphold,
                    senereOpphold: state.informasjonOmUtenlandsopphold.senereOpphold,
                },
            };
        case SoknadActionKeys.SET_I_NORGE_NESTE_12_MND:
            const { iNorgeNeste12Mnd } = action;
            return {
                ...state,
                informasjonOmUtenlandsopphold: {
                    ...informasjonOmUtenlandsopphold,
                    iNorgeNeste12Mnd,
                    iNorgeSiste12Mnd: state.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd,
                    senereOpphold: state.informasjonOmUtenlandsopphold.senereOpphold,
                },
            };
        case SoknadActionKeys.SET_ER_BARNET_FODT:
            const { erBarnetFødt } = action;
            return {
                ...state,
                barn: {
                    fødselsdatoer: [],
                    erBarnetFødt,
                },
                informasjonOmUtenlandsopphold: {
                    ...informasjonOmUtenlandsopphold,
                    iNorgePåHendelsestidspunktet: undefined,
                },
            };
        case SoknadActionKeys.SET_ANTALL_BARN:
            return { ...state, barn: { ...barn, antallBarn: action.antallBarn } };
        case SoknadActionKeys.SET_FØDSELSDATO:
            const fødselsdatoer = (state.barn as FodtBarn).fødselsdatoer.slice(0);
            fødselsdatoer[0] = action.fødselsdato;
            return {
                ...state,
                barn: {
                    ...barn,
                    fødselsdatoer,
                },
            };
        case SoknadActionKeys.SET_TERMINDATO:
            const { termindato } = action;
            return {
                ...state,
                barn: barn ? { ...barn, termindato } : { termindato },
            };
        case SoknadActionKeys.SET_TERMINBEKREFTELSE_DATO:
            const { terminbekreftelseDato } = action;
            return {
                ...state,
                barn: barn ? { ...barn, terminbekreftelseDato } : { terminbekreftelseDato },
            };
        case SoknadActionKeys.SET_ANNEN_FORELDER_NAVN:
            const { navn } = action;
            return { ...state, annenForelder: { ...state.annenForelder, navn } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_FNR:
            const fnr = action.fnr.length > 0 ? action.fnr : undefined;
            return { ...state, annenForelder: { ...state.annenForelder, fnr } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_UTENLANDSK_FNR:
            const { utenlandskFnr } = action;
            return {
                ...state,
                annenForelder: { ...state.annenForelder, utenlandskFnr, bostedsland: undefined },
            };
        case SoknadActionKeys.SET_ANNEN_FORELDER_BOSTEDSLAND:
            const { bostedsland } = action;
            return { ...state, annenForelder: { ...state.annenForelder, bostedsland } };
        case SoknadActionKeys.SET_ANNEN_FORELDER_KAN_IKKE_OPPGIS:
            const { kanIkkeOppgis } = action;
            return { ...state, annenForelder: { kanIkkeOppgis } };
        case SoknadActionKeys.RESET_SØKNAD:
            return initialState();

        case SoknadActionKeys.UPLOAD_ATTACHMENT:
            const pendingAttachment = action.payload;
            pendingAttachment.pending = true;
            return addAttachmentToState(pendingAttachment, state);

        case SoknadActionKeys.UPLOAD_ATTACHMENT_SUCCESS:
            const uploadedAttachment = action.attachment;
            const url = action.url;
            uploadedAttachment.url = url;
            uploadedAttachment.pending = false;
            uploadedAttachment.uploaded = true;
            uploadedAttachment.uuid = action.uuid;
            return editAttachmentInState(uploadedAttachment, state);

        case SoknadActionKeys.UPLOAD_ATTACHMENT_FAILED:
            const failedAttachment = action.attachment;
            failedAttachment.pending = false;
            failedAttachment.uploaded = false;
            failedAttachment.error = action.error;
            return editAttachmentInState(failedAttachment, state);

        case SoknadActionKeys.DELETE_ATTACHMENT:
            return removeAttachmentFromState(action.attachment, state);
        default:
            return state;
    }
};

export default soknadReducer;

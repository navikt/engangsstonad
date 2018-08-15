import axios from 'axios';
import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';
import { AppState } from 'common/redux/types';
import { Attachment } from 'storage/attachment/types/Attachment';

function getPerson() {
    const endpoint = (window as any).REST_API_URL;
    return axios.get(`${endpoint}/personinfo`, {withCredentials: true});
}

function getAppState() {
    const url = `${(<any> window).REST_API_URL}/storage`;
    return axios.get(url, { withCredentials: true });
}

function saveAppState(state: AppState) {
    const url = `${(<any> window).REST_API_URL}/storage`;
    return axios.post(url, state, { withCredentials: true });
}

function sendSoknad(soknad: EngangsstonadSoknad, vedleggListe: Attachment[]) {
    const config  = {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data;',
        }
    };

    const formData = new FormData();
    formData.append('soknad', new Blob([JSON.stringify({...soknad })], { type: 'application/json' }));
    vedleggListe.forEach((vedlegg: Attachment) => formData.append('vedlegg', vedlegg.file));

    const url = `${(<any> window).REST_API_URL}/soknad`;
    return axios.post(url, formData, config);
}

const Api = { getPerson, sendSoknad, getAppState, saveAppState };

export default Api;

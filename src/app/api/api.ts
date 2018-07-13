import axios from 'axios';
import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';
import { Attachment, AttachmentMetadata } from 'storage/attachment/types/Attachment';
import { AppState } from 'common/redux/types';

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

function sendSoknad(soknad: EngangsstonadSoknad, vedleggListe: Attachment[] = []) {
    const config = {
        withCredentials: true,
        headers: {
            'content-type': 'application/json;',
        }

    };

    const vedleggWithoutFiles: AttachmentMetadata[] = vedleggListe.map((vedlegg: Attachment) => {
        delete vedlegg.file;
        return vedlegg;
    });

    const url = `${(window as any).REST_API_URL}/engangsstonad`;
    return axios.post(url, {...soknad, vedlegg: vedleggWithoutFiles}, config);
}

const Api = { getPerson, sendSoknad, getAppState, saveAppState };

export default Api;

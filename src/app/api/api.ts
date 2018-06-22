import axios from 'axios';
import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';
import { AppState } from '../redux/types';

const config  = {
    withCredentials: true,
    headers: {
        'content-type': 'multipart/form-data;',
    }
};

function getPerson() {
    const endpoint = (<any> window).REST_API_URL;
    return axios.get(`${endpoint}/personinfo`, { withCredentials: true } );
}

function getAppState() {
    const url = `${(<any> window).REST_API_URL}/getSoknad`;
    return axios.get(url, { withCredentials: true });
}

function saveAppState(state: AppState) {
    const url = `${(<any> window).REST_API_URL}/storage`;
    return axios.post(url, state, { withCredentials: true });
}

function sendSoknad(soknad: EngangsstonadSoknad) {
    const { vedlegg, ...other } = soknad;

    const formData = new FormData();
    formData.append('soknad', new Blob([JSON.stringify({...other})], {
        type: 'application/json'
    }));

    vedlegg.forEach((vedleggElement) => {
        formData.append('vedlegg', vedleggElement);
    });

    const url = `${(<any> window).REST_API_URL}/engangsstonad`;
    return axios.post(url, formData, config);
}

const Api = { getPerson, sendSoknad, getAppState, saveAppState };

export default Api;

import axios from 'axios';
import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';

function getPerson() {
    const endpoint = (<any> window).REST_API_URL;
    return axios.get(`${endpoint}/personinfo`, { withCredentials: true } );
}

function sendSoknad(soknad: EngangsstonadSoknad) {
    const { vedlegg, ...other } = soknad;
    const config  = {
        withCredentials: true,
        headers: {
            'content-type': 'multipart/form-data;',
        }
    };

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

const Api = { getPerson, sendSoknad };

export default Api;

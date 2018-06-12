import axios from 'axios';
import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';

function getPerson() {
    const endpoint = (window as any).REST_API_URL;
    return axios.get(`${endpoint}/personinfo`, { withCredentials: true });
}

function sendSoknad(soknad: EngangsstonadSoknad) {
    const config = {
        withCredentials: true
    };

    const url = `${(window as any).REST_API_URL}/engangsstonad`;
    return axios.post(url, soknad, config);
}

const Api = { getPerson, sendSoknad };

export default Api;

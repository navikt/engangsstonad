import axios from 'axios';
import PersonRequest from '../types/services/PersonRequest';
import EngangsstonadSoknad from '../types/domain/EngangsstonadSoknad';
const queryStringParser = require('query-string');

const defaultParams: PersonRequest = {
    fnr: '12341234',
    stub: true
};

const stub = () => ({
    data: {
        fornavn: 'Test',
        etternavn: 'Testesen'
    }
});

let useStub = defaultParams.stub;
let fnr: any;

// tslint:disable-next-line no-any
declare const __ENV__: any;

/*
function getPerson(params: PersonRequest = defaultParams) {
    fnr = new URL(window.location.href).searchParams.get('fnr');
    useStub = params.stub;
    if (__ENV__ === 'heroku') {
        return stub();
    }
    // tslint:disable-next-line no-any
    const endpoint = (<any> window).REST_API_URL;
    return axios.get(`${endpoint}/personinfo?${queryStringParser.stringify(params)}`);
}
*/

function getPerson(params: PersonRequest = defaultParams) {
    fnr = new URL(window.location.href).searchParams.get('fnr');
    useStub = params.stub;
    if (__ENV__ === 'heroku') {
        return stub();
    }
    // tslint:disable-next-line no-any
    const endpoint = (<any> window).REST_API_URL;
    return axios.get(`${endpoint}/personinfo/no`);
}

/*
function sendSoknad(soknad: EngangsstonadSoknad) {
    const url = `${(<any> window).REST_API_URL}/engangsstonad${useStub ? '?stub=true' : ''}`;
    return axios.post(url, {fnr: fnr, ...soknad});
} */

function sendSoknad(soknad: EngangsstonadSoknad) {
    const { vedlegg, ...other } = soknad;
    const config  = {
        headers: {
            'content-type': 'multipart/form-data;'
        }
    };

    const formData = new FormData();
    formData.append('soknad', new Blob([JSON.stringify({fnr: fnr, ...other})], {
        type: 'application/json'
    }));
    
    formData.append('vedlegg', vedlegg[0]);

    // tslint:disable-next-line no-any
    const url = `${(<any> window).REST_API_URL}/engangsstonad${useStub ? '?stub=true' : ''}`;
    return axios.post(url, formData, config);

}

const Api = { getPerson, sendSoknad };

export default Api;

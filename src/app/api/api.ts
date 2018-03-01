import axios from 'axios';
import PersonRequest from '../types/services/PersonRequest';
import EngangsstonadSoknadRequest from '../types/services/EngangsstonadSoknadRequest';
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

// tslint:disable-next-line no-any
declare const __ENV__: any;

function getPerson(params: PersonRequest = defaultParams) {
    useStub = params.stub;
    if (__ENV__ === 'heroku') {
        return stub();
    }
    // tslint:disable-next-line no-any
    const endpoint = (<any> window).REST_API_URL;
    return axios.get(`${endpoint}/personinfo?${queryStringParser.stringify(params)}`);
}

function sendSoknad(soknad: EngangsstonadSoknadRequest) {
    // tslint:disable-next-line no-any
    const url = `${(<any> window).REST_API_URL}/engangsstonad${useStub?'?stub=true':''}`;
    return axios.post(url, soknad);
}

const Api = { getPerson, sendSoknad };

export default Api;

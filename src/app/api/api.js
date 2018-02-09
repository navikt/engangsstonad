import axios from 'axios';
import queryStringParser from 'query-string';

const defaultParams = {
	fnr: 12341234,
	stub: true
};

const stub = () => ({
	data: {
		fornavn: 'Test',
		etternavn: 'Testesen'
	}
});

function getPerson(params = defaultParams) {
	if (__ENV__ === 'heroku') {
		return stub();
	}
	return axios.get(
		`${window.REST_API_URL}/personinfo?${queryStringParser.stringify(params)}`
	);
}

function sendSoknad(data) {
	return axios.post(`${window.REST_API_URL}/engangsstonad?stub=true`, data);
}

const Api = { getPerson, sendSoknad, fetchData: () => {}, postData: () => {} };

export default Api;

import axios from 'axios';
import queryStringParser from 'query-string';

const defaultParams = {
	fnr: 12341234,
	stub: true
};

const stub = () => ({
	data: {
		fornavn: 'Brukernavn'
	}
});

function fetchData(params = defaultParams) {
	if (__ENV__ === 'heroku') {
		return stub();
	}

	return axios.get(
		`${window.REST_API_URL}/personinfo?${queryStringParser.stringify(params)}`
	);
}

function postData(data) {
	return axios.post(`${window.REST_API_URL}/rest/engangsstonad`, data);
}

const Api = { fetchData, postData };

export default Api;
